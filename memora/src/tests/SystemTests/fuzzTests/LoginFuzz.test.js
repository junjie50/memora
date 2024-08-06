
import LoginPage from '../pageObjects/LoginPage.js';

const { Builder, By, Key, until } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome');
const { FuzzedDataProvider } = require('@jazzer.js/core');

const TEST_COUNT = 1;
const TIMEOUT = 60000; // 60 seconds

describe('Login Fuzz Testing', () => {

  let driver;

  beforeEach(async () => {
      const options = new Options();
      options.addArguments('start-maximized', 'incognito');
      driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  }, TIMEOUT);

  afterEach(async () => {
      await driver.quit();
  }, TIMEOUT);

  // function generateNonEmptyString(fuzz, maxLength) {
  //   let str = fuzz.consumeString(maxLength);
  //   return str || `defaultPassword${(Math.random() * 1000000000).toString(36)}`;
  // }

  function generateRandomPassword() {
    return Math.floor(Math.random() * 1e15).toString().padStart(15, '0');
  }

  function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  function generateRandomUsername() {
      const prefix = generateRandomString(5);
      const suffix = Math.floor(Math.random() * 1000);
      return `user_${prefix}${suffix}`;
  }

  async function testLoginWithFuzzedData(fuzz) {
      try {
          await driver.get('http://localhost:3000/login');
          await driver.sleep(2000);
          const username = generateRandomUsername(); // random username generation
          // const password = generateNonEmptyString(fuzz, 15); // fuzz.consumeString
          const password = generateRandomPassword(); // random password generation
          console.log('Fuzzing login - username:', username, 'password:', password);

          await driver.findElement(By.css('input[data-testid="username"]')).sendKeys(username);
          const passwordInput = await driver.findElement(By.css('input[data-testid="password"]'));
          await passwordInput.sendKeys(password);

          await driver.sleep(500);
          const enteredPassword = await passwordInput.getAttribute('value');
          console.log('Entered password length:', enteredPassword.length);

          await driver.findElement(By.css('button[type="submit"]')).click();
          await driver.sleep(2000);
          try {
              await driver.wait(until.urlContains('/'), 5000);
              console.log('Login successful');
          } catch (error) {}
      } catch (error) {
          console.error('Test failed:', error);
      }
  }

  test('Fuzz test login inputs', async () => {
      for (let i = 0; i < TEST_COUNT; i++) {
          console.log(`Running login fuzz test iteration ${i + 1}`);
          const data = Buffer.from(Math.random().toString());
          const fuzz = new FuzzedDataProvider(data);
          await testLoginWithFuzzedData(fuzz);
      }
  }, TIMEOUT * TEST_COUNT);
});









// Previous Version
// const axios = require('axios');
// async function testLoginWithFuzzedData(fuzz) {
//   const username = fuzz.consumeString(20);
//   const password = fuzz.consumeString(30);

//   try {
//     const response = await axios.post('https://memora-backend-2eebe428f36a.herokuapp.com/api/users/login', { username, password }, {
//       validateStatus: function (status) {
//         return status >= 200 && status < 500; // dont throw error
//       }
//     });
    
//     if (response.status === 200) {
//       console.log(`Login successful: Username "${username}"`);
//     } else if (response.status === 401) {
//       console.log(`Login failed (expected): Username "${username}"`);
//     } else {
//       console.error(`Unexpected status code: ${response.status} for username "${username}"`);
//     }

//     if (response.data && typeof response.data !== 'object') {
//       console.error(`Invalid response data type for username "${username}"`);
//     }
//   } catch (error) {
//     console.error(`Login error for username "${username}":`, error.response ? error.response.data : error.message);
//   }
// }

// module.exports = { testLoginWithFuzzedData };