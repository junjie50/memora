const { Builder, By, Key, until } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome');
const jestTimeout = 60000;

describe('View Hotel Details E2E Testing', () => {
  let driver;

  beforeAll(async () => {
    const options = new Options();
    options.addArguments('start-maximized'); // Open browser in maximized mode
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  }, jestTimeout);

  afterAll(async () => {
    await driver.quit();
  }, jestTimeout);

  const navigateToHotelDetails = async (valid = true) => {
    // Navigate to the Home page
    console.log('Navigating to Home page...');
    await driver.get('http://localhost:3000'); // Replace with your application's URL

    // Set check-in date
    console.log('Setting check-in date...');
    const checkinInput = await driver.findElement(By.css('input[aria-label="checkin"]'));
    await checkinInput.sendKeys('10/08/2024'); // Example date, adjust as necessary

    // Set check-out date
    console.log('Setting check-out date...');
    const checkoutInput = await driver.findElement(By.css('input[aria-label="checkout"]'));
    await checkoutInput.sendKeys('15/08/2024'); // Example date, adjust as necessary

    // Select a country
    console.log('Selecting country...');
    const countryInput = await driver.findElement(By.css('.form-container-input input[type="text"]'));
    await countryInput.sendKeys('Singapore', Key.RETURN); // Example, adjust as necessary

    // Allow some time for the country selection dropdown to process
    await driver.sleep(1000);

    // Submit the form
    console.log('Submitting search form...');
    const searchButton = await driver.findElement(By.css('button[type="submit"]'));
    await searchButton.click();

    // Wait for HotelListing page to load
    console.log('Waiting for hotel listings...');
    await driver.wait(until.elementLocated(By.css('.hotel-card')), 40000);

    // Verify hotel listings are displayed
    const hotelCards = await driver.findElements(By.css('.hotel-card'));
    expect(hotelCards.length).toBeGreaterThan(0);

    // Click the first hotel card's "See more details" button
    console.log('Navigating to ViewHotelDetails page...');
    const moreInfoButton = await hotelCards[0].findElement(By.css('.more-info'));
    await moreInfoButton.click();

    // If valid is false, manipulate the URL to navigate to an invalid hotel details page
    if (!valid) {
      const currentUrl = await driver.getCurrentUrl();
      await driver.get(currentUrl.replace(/\/\d+$/, '/invalid-hotel-id'));
    }
  };

  test('should navigate from Home to HotelListing to ViewHotelDetails', async () => {
    try {
      await navigateToHotelDetails(true);

      // Wait for the ViewHotelDetails page to load
      await driver.wait(until.elementLocated(By.css('.detailspg-hotel-info')), 30000);

      // Verify hotel details
      const hotelName = await driver.findElement(By.tagName('h1')).getText();
      expect(hotelName.length).toBeGreaterThan(0);

      const hotelAddress = await driver.findElement(By.css('.detailspg-hotel-info')).getText();
      expect(hotelAddress.length).toBeGreaterThan(0);

    } catch (error) {
      console.error('Test encountered an error:', error);
      throw error; // Re-throw the error to let Jest handle it
    }
  }, jestTimeout);
});