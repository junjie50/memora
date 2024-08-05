// BookingFlow.test.js
import {testMember} from '../testData/TestMemberData.js';
import TestPaymentData from '../testData/TestPaymentData.js';
import BookingPageLoggedIn from '../pageObjects/BookingPageLoggedIn.js';
// import testHomeForm from '../testData/TestHomeFormData.js';
const { Builder, By, Key, until } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome');
const jestTimeout = 200000; //200s



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
    const checkinInput = await driver.wait(until.elementLocated(By.css('input[aria-label="checkin"]')), 10000);
    await checkinInput.sendKeys('002024-09-01');
    const checkoutInput = await driver.wait(until.elementLocated(By.css('input[aria-label="checkout"]')), 10000);
    await checkoutInput.sendKeys('002024-09-05');
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
    // Wait for the "See more details" button to be clickable
    const seeMoreDetailsButton = await driver.wait(until.elementLocated(By.css('.more-info')), 30000);
    await driver.wait(until.elementIsVisible(seeMoreDetailsButton), 30000);
    await driver.wait(until.elementIsEnabled(seeMoreDetailsButton), 30000);
    await seeMoreDetailsButton.click();
    // Wait for the hotel details page to load
    await driver.wait(until.urlContains('/ViewHotelDetails'), 30000);

    

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
    await passwordInput.sendKeys(testMember.password);
    const submitButton = await driver.findElement(By.css('button[type="submit"]'));
    await submitButton.click();



    // Wait for the hotel details page (ViewHotelDetails/) to load after successful login
    await driver.wait(until.urlContains('/ViewHotelDetails/'), 10000);
    // Wait for the room card to be visible
    let roomCard = await driver.wait(until.elementLocated(By.css('[data-testid="room-card"]')), 10000);
    // Find the plus button within the room card
    //wait for member click + or - for (1 King City View) type of room (need to implement code), and then click SUBMIT
    let plusButton = await roomCard.findElement(By.css('[data-testid="plus-button"]'));
    await plusButton.click();
    // !!!Important, Re-find the room card and submit button after the click operation
    roomCard = await driver.wait(until.elementLocated(By.css('[data-testid="room-card"]')), 10000);
    // Find the submit button and wait for it to be clickable
    const submitSelectedRoomButton = await driver.wait(until.elementLocated(By.css('.submit-button')), 10000);
    await driver.wait(until.elementIsEnabled(submitSelectedRoomButton), 10000); //wait for it to be clickable
    await submitSelectedRoomButton.click();



    // Before Integration (can delete)
    // After Wait for the booking page to load
    // await driver.wait(until.urlContains('/bookingPageLoggedIn'), 5000);
    // // Wait Personal Details rendered from db and then input: Payment Information bar and then click Proceed to Booking Summary (need code to implment)
    // const creditCardNumberInput = await driver.findElement(By.css('input[data-testid="creditCardNumber"]'));
    // await creditCardNumberInput.sendKeys('1234567890');
    // const cardHolderNameInput = await driver.findElement(By.css('input[data-testid="cardHolderName"]'));
    // await cardHolderNameInput.sendKeys('John Doe');
    // const billingAddressInput = await driver.findElement(By.css('input[data-testid="billingAddress"]'));
    // await billingAddressInput.sendKeys('Upper Changi');
    // const postalCodeInput = await driver.findElement(By.css('input[data-testid="postalCode"]'));
    // await postalCodeInput.sendKeys('485997');
    // const ccountryNameInput = await driver.findElement(By.css('input[data-testid="countryName"]'));
    // await ccountryNameInput.sendKeys('Singapore');
    // const validUntillInput = await driver.findElement(By.css('input[data-testid="validUntill"]'));
    // await validUntillInput.sendKeys('2024-11-31');
    // const cvcNoInput = await driver.findElement(By.css('input[data-testid="cvcNo"]'));
    // await cvcNoInput.sendKeys('123');
    // // Click on the "Proceed to Booking Summary" button
    // const proceedBookingSummaryButton = await driver.findElement(By.css('.ProceedBookingSummary'));
    // await proceedBookingSummaryButton.click();
    
    // After Integration
    await driver.wait(until.urlContains('/bookingPageLoggedIn'), 5000);
    const bookingPageLoggedIn = new BookingPageLoggedIn(driver);
    await bookingPageLoggedIn.enterPaymentDetails(TestPaymentData);
    await bookingPageLoggedIn.clickProceedToBookingSummary();



    // Wait for the booking confirmation page to load
    await driver.wait(until.urlContains('/bookingConfirmed'), 5000);
    // Check the terms and conditions checkbox
    // const termsCheckbox = await driver.findElement(By.css('input[data-testid="agreementCheckbox"]'));
    // await termsCheckbox.click();
    const termsCheckbox = await driver.findElement(By.css('input[data-testid="agreementCheckbox"]'));
    await driver.executeScript("arguments[0].checked = true;", termsCheckbox);
    // Click on the "Confirm Booking" button
    const confirmButton = await driver.findElement(By.css('.ConfirmBooking'));
    await confirmButton.click();



    // Wait for the booking completed page to load
    await driver.wait(until.urlContains('/bookingCompleted'), 5000);
    // Wait for the confirmation message to be visible
    await driver.wait(until.elementLocated(By.css('.TextBar')), 5000);
    // Verify the booking confirmation message
    const confirmationMessage = await driver.findElement(By.css('.TextBar'));
    expect(await confirmationMessage.getText()).toContain('Booking Completed!');


    
  }, jestTimeout);
});



/*
under memora/memora:
npx jest tests/SystemTests/flows/BookHotel.test.js

*/