const { Builder, By, Key, until } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome');
const { FuzzedDataProvider } = require('@jazzer.js/core');

const TEST_COUNT = 2; // Test Count
const TIMEOUT = 60000; // 60 seconds

describe('Home Page Fuzz Testing', () => {

    let driver;

    beforeAll(async () => {
        const options = new Options();
        options.addArguments('start-maximized');
        driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    }, TIMEOUT);

    afterAll(async () => {
        await driver.quit();
    }, TIMEOUT);

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function formatDateForInput(date) { //handle date by adding 00 and make month, day to be 2 digits
        const year = date.getFullYear().toString().padStart(6, '0'); //need 6 digits, fill 00 infront of 4 digit years
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    async function testHomeWithFuzzedData(fuzz) {
        try {
            await driver.get('http://localhost:3000');
            await driver.sleep(2000); // For page to load

            const today = new Date();
            const futureCheckinDate = new Date(today.getTime() + getRandomInt(1, 90) * 24 * 60 * 60 * 1000);
            const futureCheckoutDate = new Date(futureCheckinDate.getTime() + getRandomInt(1, 14) * 24 * 60 * 60 * 1000);
            // const checkinDate = futureCheckinDate.toISOString().split('T')[0];
            // const checkoutDate = futureCheckoutDate.toISOString().split('T')[0];
            const checkinDate = formatDateForInput(futureCheckinDate);
            const checkoutDate = formatDateForInput(futureCheckoutDate);
            console.log('Fuzzing check-in date:', checkinDate);
            console.log('Fuzzing check-out date:', checkoutDate);
            
            // Fuzz destination (use random letters for country names)
            // const destination = fuzz.consumeString(20);
            // const destination = fuzz.consumeString(5).replace(/[^a-zA-Z]/g, '') + 'land'; //more like country name
            const destinations = ['London', 'Bangkok', 'Phuket', 'Chiang Mai', 'Pattaya', 'Patong', 'Singapore', 'New York', 'Paris']; //'land' example
            const randomDestination = destinations[Math.floor(Math.random() * destinations.length)];
            console.log('Fuzzing destination:', randomDestination);
            const countryInput = await driver.findElement(By.id('country-select-demo'));
            await countryInput.sendKeys(randomDestination, Key.ENTER);
            await driver.sleep(1000);
            const checkinInput = await driver.findElement(By.css('input[aria-label="checkin"]'));
            await checkinInput.clear();
            await checkinInput.sendKeys(checkinDate);
            await driver.sleep(1000); // small delay to observe change
            const checkoutInput = await driver.findElement(By.css('input[aria-label="checkout"]'));
            await checkoutInput.clear();
            await checkoutInput.sendKeys(checkoutDate);
            await driver.sleep(1000);

            // Open person selector
            const personButton = await driver.findElement(By.css('.form-container-button'));
            await personButton.click();
            await driver.sleep(1000);
            // Fuzz adults, children, and rooms
            const adults = getRandomInt(1, 5);
            const children = getRandomInt(0, 3);
            const rooms = getRandomInt(1, 3);
            // console.log('Fuzzing adults:', adults);
            // console.log('Fuzzing children:', children);
            // console.log('Fuzzing rooms:', rooms);
            console.log('Initial values - Adults:', adults, 'Children:', children, 'Rooms:', rooms);

            // let currentAdults = 1;
            // let currentChildren = 0;
            // let currentRooms = 1;
            for (let i = 1; i < adults; i++) {
                await driver.findElement(By.css("[data-testid='plus-adult-button']")).click();
                await driver.sleep(500);
                // currentAdults++;
                // console.log('Adults updated:', currentAdults);
                // await driver.sleep(500);
            }
            for (let i = 0; i < children; i++) {
                await driver.findElement(By.css("[data-testid='plus-children-button']")).click();
                await driver.sleep(500);
            }
            for (let i = 1; i < rooms; i++) {
                await driver.findElement(By.css("[data-testid='plus-room-button']")).click();
                await driver.sleep(500);
            }
            await driver.findElement(By.xpath("//button[contains(text(),'Done')]")).click();
            // Click Search
            await driver.findElement(By.xpath("//button[contains(text(),'Search')]")).click();
            // Wait for results or error (until one not work)
            // await driver.wait(until.or( //until not supported
            //     until.urlContains('/hotelListings'),
            //     until.elementLocated(By.css('.error-message'))
            // ), 10000);
            try {
                await driver.wait(until.urlContains('/hotelListings'), 5000);
            } catch (error) {
                console.log('Did not navigate to hotel listings, checking for error message');
                try {
                    await driver.wait(until.elementLocated(By.css('.error-message')), 5000);
                    const errorMessage = await driver.findElement(By.css('.error-message')).getText();
                    console.log('Error message displayed:', errorMessage);
                } catch (innerError) {
                    console.log('No error message found either');
                }
            }
        
            // Check for expected navigate outcome
            const currentUrl = await driver.getCurrentUrl();
            if (currentUrl.includes('/hotelListings')) {
                console.log('Successfully navigated to hotel listings');
            } else {
                const errorMessage = await driver.findElement(By.css('.error-message')).getText();
                console.log('Error message displayed:', errorMessage);
            }
        } catch (error) {
            console.error('Test failed:', error);
        } finally{
            await driver.sleep(2000); // Wait before next iteration
        }
    }



    test('Fuzz test Home page inputs', async () => {
        for (let i = 0; i < TEST_COUNT; i++) {
            console.log(`Running fuzz test iteration ${i + 1}`);
            const data = Buffer.from(Math.random().toString());
            const fuzz = new FuzzedDataProvider(data);
            await testHomeWithFuzzedData(fuzz);
        }
    }, TIMEOUT * TEST_COUNT);
});



/*
under memora/memora:

npx jest tests/fuzzTests/HomeFuzz.test.js

*/