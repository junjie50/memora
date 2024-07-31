// BookingFlow.test.js
import testMember from '../testData/TestMemberData.js';

const { Builder, By, Key, until } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome');
const jestTimeout = 30000;

describe('Booking Flow E2E Testing', () => {
  let driver;

  beforeAll(async () => {
    const options = new Options();
    options.addArguments('start-maximized');
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  }, jestTimeout);

  afterAll(async () => {
    await driver.quit();
  }, jestTimeout);

  test('Book a hotel successfully', async () => {
    // Navigate to the viewHotelDetails/dGh9 page
    await driver.get('http://localhost:3000/ViewHotelDetails/dGh9');



    
    // Fill in the login form and submit
    const usernameInput = await driver.findElement(By.css('input[data-testid="username"]'));
    await usernameInput.sendKeys('testuser');

    const passwordInput = await driver.findElement(By.css('input[data-testid="password"]'));
    await passwordInput.sendKeys('testpassword');

    const loginButton = await driver.findElement(By.css('button[type="submit"]'));
    await loginButton.click();

    // Wait for the login to complete and navigate to the hotel listings page
    await driver.wait(until.urlContains('/hotelListings'), 10000);

    // Select a hotel from the listings and navigate to the hotel details page
    const hotelCard = await driver.findElement(By.css('.hotel-card'));
    await hotelCard.click();

    await driver.wait(until.urlContains('/ViewHotelDetails'), 10000);

    // Click on the "Book Now" button
    const bookNowButton = await driver.wait(until.elementLocated(By.css('.book-now-button')), 10000);
    await bookNowButton.click();

    // Fill in the booking details on the bookingPageLoggedIn
    const checkInDate = await driver.findElement(By.css('input[name="checkInDate"]'));
    await checkInDate.sendKeys('2023-08-01');

    const checkOutDate = await driver.findElement(By.css('input[name="checkOutDate"]'));
    await checkOutDate.sendKeys('2023-08-05');

    const numAdults = await driver.findElement(By.css('select[name="numAdults"]'));
    await numAdults.sendKeys('2');

    const numChildren = await driver.findElement(By.css('select[name="numChildren"]'));
    await numChildren.sendKeys('1');

    const specialRequests = await driver.findElement(By.css('textarea[name="specialRequests"]'));
    await specialRequests.sendKeys('Early check-in if possible');

    // Click on the "Proceed to Booking Summary" button
    const proceedButton = await driver.wait(until.elementLocated(By.css('.proceed-button')), 10000);
    await proceedButton.click();

    // Verify the booking details on the bookingConfirmed page
    const hotelName = await driver.wait(until.elementLocated(By.css('.hotel-name')), 10000);
    expect(await hotelName.getText()).toBe('The Peninsula Beijing');

    const checkInDateConfirmed = await driver.findElement(By.css('.check-in-date')).getText();
    expect(checkInDateConfirmed).toBe('2024-07-31');

    const checkOutDateConfirmed = await driver.findElement(By.css('.check-out-date')).getText();
    expect(checkOutDateConfirmed).toBe('2024-08-01');

    const totalPrice = await driver.findElement(By.css('.total-price')).getText();
    expect(totalPrice).toBe('SGD 1585.54');

    // Click on the "Confirm Booking" button
    const confirmButton = await driver.wait(until.elementLocated(By.css('.confirm-booking')), 10000);
    await confirmButton.click();

    // Verify the booking confirmation on the bookingCompleted page
    const confirmationMessage = await driver.wait(until.elementLocated(By.css('.confirmation-message')), 10000);
    expect(await confirmationMessage.getText()).toBe('Booking Completed!');

    const bookingId = await driver.findElement(By.css('.booking-id')).getText();
    expect(bookingId).toBeTruthy();
  }, jestTimeout);
});