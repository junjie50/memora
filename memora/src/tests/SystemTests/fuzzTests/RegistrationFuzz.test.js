const { Builder, By, Key, until } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome');
const { FuzzedDataProvider } = require('@jazzer.js/core');

const TEST_COUNT = 2;
const TIMEOUT = 60000; // 60 seconds

describe('Register Fuzz Testing', () => {
    let driver;

    beforeEach(async () => {
        const options = new Options();
        options.addArguments('start-maximized', 'incognito');
        driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    }, TIMEOUT);

    afterEach(async () => {
        await driver.quit();
    }, TIMEOUT);

    function generateNonEmptyString(fuzz, maxLength) {
      let str = fuzz.consumeString(maxLength);
      return str || 'default';
    }

    async function testRegisterWithFuzzedData(fuzz) {
        try {
            await driver.get('http://localhost:3000/registerPage');
            await driver.sleep(2000);

            const formData = {
              username: generateNonEmptyString(fuzz, 15),
              title: generateNonEmptyString(fuzz, 5),
              firstName: generateNonEmptyString(fuzz, 20),
              lastName: generateNonEmptyString(fuzz, 20),
              phoneNumber: generateNonEmptyString(fuzz, 15),
              email: `${generateNonEmptyString(fuzz, 10)}@example.com`,
              password: generateNonEmptyString(fuzz, 20),
              address: generateNonEmptyString(fuzz, 50)
            };

            console.log('Fuzzing registration data:', formData);
            for (const [key, value] of Object.entries(formData)) {
                await driver.findElement(By.css(`input[id="${key}"]`)).sendKeys(value);
            }
            await driver.findElement(By.css('input[id="over21"]')).click();
            await driver.findElement(By.css('input[id="agreeToTerms"]')).click();
            await driver.findElement(By.css('button[type="submit"]')).click();
            await driver.sleep(2000);
            try {
                await driver.wait(until.urlContains('/login'), 5000);
                console.log('Registration successful');
            } catch (error) {
              console.log('Registration failed or redirect did not occur');              
            }
        } catch (error) {
            console.error('Test failed:', error);
        }
    }

    test('Fuzz test registration inputs', async () => {
        for (let i = 0; i < TEST_COUNT; i++) {
            console.log(`Running registration fuzz test iteration ${i + 1}`);
            const data = Buffer.from(Math.random().toString());
            const fuzz = new FuzzedDataProvider(data);
            await testRegisterWithFuzzedData(fuzz);
        }
    }, TIMEOUT * TEST_COUNT);
});










//Previous Version
// const axios = require('axios');

// async function testRegisterWithFuzzedData(fuzz) {
//   const formData = {
//     username: fuzz.consumeString(15),
//     title: fuzz.consumeString(5),
//     firstName: fuzz.consumeString(20),
//     lastName: fuzz.consumeString(20),
//     phoneNumber: fuzz.consumeString(15),
//     email: fuzz.consumeString(30),
//     password: fuzz.consumeString(20),
//     address: fuzz.consumeString(50)
//   };

//   try {
//     const response = await axios.post('https://memora-backend-2eebe428f36a.herokuapp.com/api/users', formData, {
//       validateStatus: function (status) {
//         return status >= 200 && status < 500; // dont throw error
//       }
//     });

//     if (response.status === 201) {
//       console.log(`Registration successful: Username "${formData.username}"`);
//     } else if (response.status === 400) {
//       console.log(`Registration failed (expected): Username "${formData.username}"`);
//     } else {
//       console.error(`Unexpected status code: ${response.status} for username "${formData.username}"`);
//     }

//     if (response.data && typeof response.data !== 'object') {
//       console.error(`Invalid response data type for username "${formData.username}"`);
//     }

//     if (response.status === 400 && response.data.message) {
//       if (response.data.message.includes('SQL') || response.data.message.includes('database')) {
//         console.error(`Error message contains sensitive information for username "${formData.username}"`);
//       }
//     }
//   } catch (error) {
//     console.error(`Register error for username "${formData.username}":`, error.response ? error.response.data : error.message);
//   }
// }

// module.exports = { testRegisterWithFuzzedData };