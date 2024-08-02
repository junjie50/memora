const { Builder, By, Key, until } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome');
const jestTimeout = 30000;

describe('View Hotel Listings E2E Testing', () => {
  let driver;

  beforeAll(async () => {
    const options = new Options();
    options.addArguments('start-maximized'); // Open browser in maximized mode
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  }, jestTimeout);

  afterAll(async () => {
    await driver.quit();
  }, jestTimeout);

  test('should search for hotels with correct inputs', async () => {
    // home page
    await driver.get('http://localhost:3000'); 

    const countryInput = await driver.findElement(By.id('country-select-demo'));
    await countryInput.sendKeys('Singapore', Key.ENTER);

    const checkinInput = await driver.findElement(By.css('input[aria-label="checkin"]'));
    await checkinInput.sendKeys('01-09-2024');

    const checkoutInput = await driver.findElement(By.css('input[aria-label="checkout"]'));
    await checkoutInput.sendKeys('05-09-2024');

    const personButton = await driver.findElement(By.css('.form-container-button'));
    await personButton.click();

    const plusAdultButton = await driver.findElement(By.css("[data-testid='plus-adult-button']"));
    await plusAdultButton.click();
    
    const adultCount = await driver.findElement(By.css("[data-testid='adult-count']"));
    expect(await adultCount.getText()).toBe('3');

    const addChildButton = await driver.findElement(By.css("[data-testid='plus-children-button']"));
    await addChildButton.click();

    const childCount = await driver.findElement(By.css("[data-testid='children-count']"));
    expect(await childCount.getText()).toBe('2');

    const addRoomButton = await driver.findElement(By.css("[data-testid='plus-room-button']"));
    await addRoomButton.click();

    const roomCount = await driver.findElement(By.css("[data-testid='room-count']"));
    expect(await roomCount.getText()).toBe('2');

    const doneButton = await driver.findElement(By.xpath("//button[contains(text(),'Done')]"));
    await doneButton.click();

    const searchButton = await driver.findElement(By.xpath("//button[contains(text(),'Search')]"));
    await searchButton.click();

    // navigate to hotel listings page
    await driver.wait(until.urlContains('/hotelListings'), 10000);
    expect(await driver.getCurrentUrl()).toContain('/hotelListings');

    // checking if hotel are displayed
    const hotelCards = await driver.wait(until.elementsLocated(By.css('.hotel-card')), 10000);
    expect(hotelCards.length).toBeGreaterThan(0);

    const firstHotelName = await hotelCards[0].findElement(By.css('h3')).getText();
    expect(firstHotelName).toBeTruthy();
  } , jestTimeout);

  test('display message when no hotels are found', async () => {
    // home page
    await driver.get('http://localhost:3000'); 

    const countryInput = await driver.findElement(By.id('country-select-demo'));
    await countryInput.sendKeys('Singapore', Key.ENTER);

    const checkinInput = await driver.findElement(By.css('input[aria-label="checkin"]'));
    await checkinInput.sendKeys('01-09-2024');

    const checkoutInput = await driver.findElement(By.css('input[aria-label="checkout"]'));
    await checkoutInput.sendKeys('31-10-2024');

    const personButton = await driver.findElement(By.css('.form-container-button'));
    await personButton.click();

    const plusAdultButton = await driver.findElement(By.css("[data-testid='plus-adult-button']"));
    await plusAdultButton.click();
    
    const adultCount = await driver.findElement(By.css("[data-testid='adult-count']"));
    expect(await adultCount.getText()).toBe('3');

    const addChildButton = await driver.findElement(By.css("[data-testid='plus-children-button']"));
    await addChildButton.click();

    const childCount = await driver.findElement(By.css("[data-testid='children-count']"));
    expect(await childCount.getText()).toBe('2');

    const addRoomButton = await driver.findElement(By.css("[data-testid='plus-room-button']"));
    await addRoomButton.click();

    const roomCount = await driver.findElement(By.css("[data-testid='room-count']"));
    expect(await roomCount.getText()).toBe('2');

    const doneButton = await driver.findElement(By.xpath("//button[contains(text(),'Done')]"));
    await doneButton.click();

    const searchButton = await driver.findElement(By.xpath("//button[contains(text(),'Search')]"));
    await searchButton.click();

    // navigate to hotel listings page
    await driver.wait(until.urlContains('/hotelListings'), 10000);
    expect(await driver.getCurrentUrl()).toContain('/hotelListings');

    const noHotelsMessage = await driver.wait(
      until.elementLocated(By.css('.no-hotels-message')),
      20000,
      'Expected to find a message indicating no hotels are available, but none was found'
    );

    const messageText = await noHotelsMessage.getText();
    expect(messageText).toBe('No hotels available for the search parameters.');
  }, jestTimeout);
});




/*
under memora:

npx jest src/tests/SystemTests/flows/viewHotelListings.test.js
*/