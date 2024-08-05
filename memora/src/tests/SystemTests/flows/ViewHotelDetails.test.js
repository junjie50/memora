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

      // Verify RoomList is displayed
      const roomList = await driver.findElement(By.css('.room-list'));
      expect(roomList).toBeDefined();

      // Verify room cards are displayed within RoomList
      const roomCards = await roomList.findElements(By.css('.room-card'));
      expect(roomCards.length).toBeGreaterThan(0);

      // Test interactions with the first RoomCard
      const firstRoomCard = roomCards[0];
      const plusButton = await firstRoomCard.findElement(By.css('#plus'));
      const minusButton = await firstRoomCard.findElement(By.css('#minus'));
      const roomCountInput = await firstRoomCard.findElement(By.css('input[type="text"]'));


      // Increase room count
      await plusButton.click();
      expect(await roomCountInput.getAttribute('value')).toBe('1');

      // Verify Submit button is enabled after room selection
      const submitButton = await driver.findElement(By.css('.submit-button'));
      expect(await submitButton.isEnabled()).toBe(true);

      // Check if Google Map is loaded by verifying the presence of a map container or marker
      console.log('Checking if Google Map is loaded...');
      const mapContainer = await driver.wait(until.elementLocated(By.css('.google-map')), 30000);
      expect(mapContainer).toBeDefined();

      // Add a delay to ensure the map is fully loaded
      await driver.sleep(2000); // Adjust delay as needed

      // Check for Google Map tiles
      const mapTiles = await driver.findElements(By.css('img[src*="google"]'));
      expect(mapTiles.length).toBeGreaterThan(0);

    } catch (error) {
      console.error('Test encountered an error:', error);
      throw error; // Re-throw the error to let Jest handle it
    }
  }, jestTimeout);
  test('should display error when navigating to ViewHotelDetails without hotel ID', async () => {
    try {
      // Navigate directly to the ViewHotelDetails page without an ID
      await driver.get('http://localhost:3000/ViewHotelDetails/'); // Adjust the path as necessary

      // Wait for the error message to be displayed
      const errorMessage = await driver.wait(until.elementLocated(By.css('.error-message')), 200000);

      // Verify the error message is as expected
      const errorText = await errorMessage.getText();
      expect(errorText).toContain('Hotel ID is missing. Please provide a valid hotel ID.');

    } catch (error) {
      console.error('Test encountered an error:', error);
      throw error; // Re-throw the error to let Jest handle it
    }
  }, jestTimeout);
});