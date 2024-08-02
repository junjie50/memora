const { Builder, By, until, Key } = require('selenium-webdriver');
const assert = require('assert');

describe('Hotel Navigation Tests', function() {
    let driver;

    this.timeout(60000); // Increase the timeout to 60 seconds for the entire suite

    before(async function() {
        console.log('Setting up WebDriver...');
        driver = await new Builder().forBrowser('chrome').build();
    });

    after(async function() {
        console.log('Closing WebDriver...');
        await driver.quit();
    });

    it('should navigate from Home to HotelListing to ViewHotelDetails', async function() {
        try {
            // Navigate to the Home page
            console.log('Navigating to Home page...');
            await driver.get('http://localhost:3000'); // Replace with your application's URL

            // Set check-in date
            console.log('Setting check-in date...');
            let checkinInput = await driver.findElement(By.css('input[aria-label="checkin"]'));
            await checkinInput.sendKeys('10/08/2024'); // Example date, adjust as necessary

            // Set check-out date
            console.log('Setting check-out date...');
            let checkoutInput = await driver.findElement(By.css('input[aria-label="checkout"]'));
            await checkoutInput.sendKeys('15/08/2024'); // Example date, adjust as necessary

            // Select a country
            console.log('Selecting country...');
            // Assuming CountrySelect component is rendered with an input for country search
            let countryInput = await driver.findElement(By.css('.form-container-input input[type="text"]'));
            await countryInput.sendKeys('Singapore', Key.RETURN); // Example, adjust as necessary

            // Allow some time for the country selection dropdown to process
            await driver.sleep(1000);

            // Submit the form
            console.log('Submitting search form...');
            let searchButton = await driver.findElement(By.css('button[type="submit"]'));
            await searchButton.click();

            // Wait for HotelListing page to load
            console.log('Waiting for hotel listings...');
            await driver.wait(until.elementLocated(By.css('.hotel-card')), 30000);

            // Verify hotel listings are displayed
            let hotelCards = await driver.findElements(By.css('.hotel-card'));
            assert(hotelCards.length > 0, 'Hotel cards should be displayed');

            // Click the first hotel card's "See more details" button
            console.log('Navigating to ViewHotelDetails page...');
            let moreInfoButton = await hotelCards[0].findElement(By.css('.more-info'));
            await moreInfoButton.click();

            // Wait for the ViewHotelDetails page to load
            await driver.wait(until.elementLocated(By.css('.detailspg-hotel-info')), 30000);

            // Verify hotel details
            let hotelName = await driver.findElement(By.tagName('h1')).getText();
            assert(hotelName.length > 0, 'Hotel Name should not be empty');

            let hotelAddress = await driver.findElement(By.css('.detailspg-hotel-info')).getText();
            assert(hotelAddress.length > 0, 'Hotel Address should not be empty');

        } catch (error) {
            console.error('Test encountered an error:', error);
            throw error; // Re-throw the error to let Mocha handle it
        }
    });
});