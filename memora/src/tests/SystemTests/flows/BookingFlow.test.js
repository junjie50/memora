// BookingFlow.test.js
import testMember from '../testData/TestMemberData.js';
// import testHomeForm from '../testData/TestHomeFormData.js';
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

  test('Complete a booking successfully', async () => {
    // From ViewHotelFlow.test.js (homePage to hotelListing)



    // Navigate to the home page
    await driver.get('http://localhost:3000');
    // Fill in search criteria and submit the form
    const countryInput = await driver.findElement(By.id('country-select-demo'));
    await countryInput.sendKeys('Singapore', Key.ENTER);
    // const checkinInput = await driver.findElement(By.css('input[aria-label="checkin"]'));
    // await checkinInput.sendKeys('2024-09-01');
    // const checkoutInput = await driver.findElement(By.css('input[aria-label="checkout"]'));
    // await checkoutInput.sendKeys('2024-09-05');
    // await driver.executeScript(`document.querySelector('input[aria-label="checkin"]').value = '2024-09-01'`);
    // await driver.executeScript(`document.querySelector('input[aria-label="checkout"]').value = '2024-09-05'`);
    const checkinInput = await driver.wait(until.elementLocated(By.css('input[aria-label="checkin"]')), 10000);
    await checkinInput.clear();
    // await checkinInput.sendKeys('2024-09-01');
    await checkinInput.sendKeys('01-09-2024');
    const checkoutInput = await driver.wait(until.elementLocated(By.css('input[aria-label="checkout"]')), 10000);
    await checkoutInput.clear();
    // await checkoutInput.sendKeys('2024-09-05');
    await checkoutInput.sendKeys('05-09-2024');
    const checkinValue = await driver.executeScript(`return document.querySelector('input[aria-label="checkin"]').value`);
    const checkoutValue = await driver.executeScript(`return document.querySelector('input[aria-label="checkout"]').value`);
    // 添加等待，确保日期被正确设置
    // await driver.wait(async () => {
    //   const checkinValue = await checkinInput.getAttribute('value');
    //   const checkoutValue = await checkoutInput.getAttribute('value');
    //   return checkinValue === '2024-09-01' && checkoutValue === '2024-09-05';
    // }, 5000);

    const personButton = await driver.findElement(By.css('.form-container-button'));
    await personButton.click();
    // Wait for the display container to be visible
    await driver.wait(until.elementLocated(By.css('.display-container')), 5000);
    const plusAdultButton = await driver.findElement(By.css("[data-testid='plus-adult-button']"));
    await plusAdultButton.click();
    const addChildButton = await driver.findElement(By.css("[data-testid='plus-children-button']"));
    await addChildButton.click();
    const addRoomButton = await driver.findElement(By.css("[data-testid='plus-room-button']"));
    await addRoomButton.click();
    const doneButton = await driver.findElement(By.xpath("//button[contains(text(),'Done')]"));
    await doneButton.click();
    const searchButton = await driver.findElement(By.xpath("//button[contains(text(),'Search')]"));
    await searchButton.click();



    // Wait for the hotel listings page to load
    await driver.wait(until.urlContains('/hotelListings'), 30000);
    // Click on the first hotel card to navigate to the hotel details page
    const hotelCards = await driver.wait(until.elementsLocated(By.css('.hotel-card')), 30000);
    await hotelCards[0].click();
    // Wait for the hotel details page to load
    await driver.wait(until.urlContains('/ViewHotelDetails'), 30000);



    // Test Login at ViewHotelDetailsPage
    // !!!! connect with the test from ViewHotelLising.test.js
    // Navigate to the viewHotelDetails/dGh9 page
    // const homeFormData = testHomeForm;
    // await driver.executeScript(`sessionStorage.setItem('homeForm', '${JSON.stringify(homeFormData)}');`);
    // await driver.get('http://localhost:3000/ViewHotelDetails/dGh9');


    //Login Here
    // Click on the login button in the navbar
    await driver.wait(until.elementLocated(By.css('.login')), 5000);
    const loginButton = await driver.findElement(By.css('.login'));
    // or const loginButton = await driver.findElement(By.css('button[type="submit"]'));
    await loginButton.click();
    // Wait for the login page to load
    await driver.wait(until.urlContains('/login'), 5000);
    // Fill in the login form and submit
    const usernameInput = await driver.findElement(By.css('input[data-testid="username"]'));
    await usernameInput.sendKeys(testMember.username);
    const passwordInput = await driver.findElement(By.css('input[data-testid="password"]'));
    await passwordInput.sendKeys('testpassword');
    const submitButton = await driver.findElement(By.css('button[type="submit"]'));
    await submitButton.click();


    // Wait for the hotel details page (ViewHotelDetails/) to load after successful login
    await driver.wait(until.urlContains('/ViewHotelDetails/'), 5000);
    //wait for member click + or - for (1 King City View) type of room (need to implement code), and then click SUBMIT
    const plusButton = await driver.findElement(By.css('.input-container'));
    await plusButton.click();


    // After Wait for the booking page to load
    await driver.wait(until.urlContains('/bookingPageLoggedIn'), 5000);
    // Wait Personal Details rendered from db and then input: Payment Information bar and then click Proceed to Booking Summary (need code to implment)
    const creditCardNumberInput = await driver.findElement(By.css('input[name="creditCardNumber"]'));
    await creditCardNumberInput.sendKeys('1234567890');
    const cardHolderNameInput = await driver.findElement(By.css('input[name="cardHolderName"]'));
    await cardHolderNameInput.sendKeys('John Doe');
    const billingAddressInput = await driver.findElement(By.css('input[name="billingAddress"]'));
    await billingAddressInput.sendKeys('Upper Changi');
    const postalCodeInput = await driver.findElement(By.css('input[name="postalCode"]'));
    await postalCodeInput.sendKeys('485997');
    const ccountryNameInput = await driver.findElement(By.css('input[name="countryName"]'));
    await ccountryNameInput.sendKeys('Singapore');
    const validUntillInput = await driver.findElement(By.css('input[name="validUntill"]'));
    await validUntillInput.sendKeys('2024-11-31');
    const cvcNoInput = await driver.findElement(By.css('input[name="cvcNo"]'));
    await cvcNoInput.sendKeys('123');

    // Click on the "Proceed to Booking Summary" button
    const proceedBookingSummaryButton = await driver.findElement(By.css('.ProceedBookingSummary'));
    await proceedBookingSummaryButton.click();



    // Wait for the booking confirmation page to load
    await driver.wait(until.urlContains('/bookingConfirmed'), 5000);
    // Check the terms and conditions checkbox
    const termsCheckbox = await driver.findElement(By.css('.checkbox'));
    await termsCheckbox.click();
    // Click on the "Confirm Booking" button
    const confirmButton = await driver.findElement(By.css('.ConfirmBooking'));
    await confirmButton.click();



    // Wait for the booking completed page to load
    await driver.wait(until.urlContains('/BookingCompleted'), 5000);
    // Verify the booking confirmation message
    const confirmationMessage = await driver.findElement(By.css('.TextBar'));
    expect(await confirmationMessage.getText()).toBe('Booking Completed!');









  }, jestTimeout);
});



/*
under memora/memora:
npx jest tests/SystemTests/flows/BookingFlow.test.js

*/