// BookingFlow.test.js
import {testMember} from '../testData/TestMemberData.js';
import TestPaymentData from '../testData/TestPaymentData.js';
import BookingPageLoggedIn from '../pageObjects/BookingPageLoggedIn.js';
// import testHomeForm from '../testData/TestHomeFormData.js';
const { Builder, By, Key, until } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome');
const moment = require('moment');
const jestTimeout = 200000; //200s

describe('Booking Flow E2E Testing', () => {
  let driver;

  beforeEach(async () => {
    const options = new Options();
    options.addArguments('start-maximized');
    driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
  }, jestTimeout);

  afterEach(async () => {
    // important
    await driver.quit();
  });



  test('Complete a booking successfully', async () => {
    // Navigate to the home page
    await driver.get('http://localhost:3000');
    // Fill in search criteria and submit the form
    const countryInput = await driver.findElement(By.id('country-select-demo'));
    await countryInput.sendKeys('Singapore', Key.ENTER);

    // const nextMonth = moment().add(1, 'months').startOf('month');
    // const checkinDate = nextMonth.format('YYYY-MM-DD'); //1st of each month
    // const checkoutDate = nextMonth.add(4, 'days').format('YYYY-MM-DD'); //5th of each month
    // const checkinInput = await driver.wait(until.elementLocated(By.css('input[aria-label="checkin"]')), 10000);
    // // await checkinInput.sendKeys('01-09-2024');
    // await checkinInput.sendKeys('00'+checkinDate);
    // const checkoutInput = await driver.wait(until.elementLocated(By.css('input[aria-label="checkout"]')), 10000);
    // // await checkoutInput.sendKeys('05-09-2024');
    // await checkoutInput.sendKeys('00'+checkoutDate);
    const checkinInput = await driver.findElement(By.css('input[aria-label="checkin"]'));
    const formattedCheckinDate = moment('2024-01-09').format('L');
    await checkinInput.sendKeys(formattedCheckinDate);
    const checkoutInput = await driver.findElement(By.css('input[aria-label="checkout"]'));
    const formattedCheckoutDate = moment('2024-07-09').format('L');
    await checkoutInput.sendKeys(formattedCheckoutDate);
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
    await driver.wait(until.urlContains('/hotelListings'), 50000);
    // Wait for the "See more details" button to be clickable
    const seeMoreDetailsButton = await driver.wait(until.elementLocated(By.css('.more-info')), 50000);
    await driver.wait(until.elementIsVisible(seeMoreDetailsButton), 30000);
    await driver.wait(until.elementIsEnabled(seeMoreDetailsButton), 30000);
    await seeMoreDetailsButton.click();
    // Wait for the hotel details page to load
    await driver.wait(until.urlContains('/ViewHotelDetails'), 50000);

    

    //Login Here
    // Click on the login button in the navbar
    await driver.wait(until.elementLocated(By.css('.login')), 50000);
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




  test('Not logged in', async () => {
    await driver.get('http://localhost:3000');
    const countryInput = await driver.findElement(By.id('country-select-demo'));
    await countryInput.sendKeys('Singapore', Key.ENTER);

    // const nextMonth = moment().add(1, 'months').startOf('month');
    // const checkinDate = nextMonth.format('YYYY-MM-DD'); //1st of each month
    // const checkoutDate = nextMonth.add(4, 'days').format('YYYY-MM-DD'); //5th of each month
    // const checkinInput = await driver.wait(until.elementLocated(By.css('input[aria-label="checkin"]')), 10000);
    // await checkinInput.sendKeys('00'+checkinDate);
    // const checkoutInput = await driver.wait(until.elementLocated(By.css('input[aria-label="checkout"]')), 10000);
    // await checkoutInput.sendKeys('00'+checkoutDate);
    const checkinInput = await driver.findElement(By.css('input[aria-label="checkin"]'));
    const formattedCheckinDate = moment('2024-01-09').format('L');
    await checkinInput.sendKeys(formattedCheckinDate);
    const checkoutInput = await driver.findElement(By.css('input[aria-label="checkout"]'));
    const formattedCheckoutDate = moment('2024-07-09').format('L');
    await checkoutInput.sendKeys(formattedCheckoutDate);

    const personButton = await driver.findElement(By.css('.form-container-button'));
    await personButton.click();
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

    await driver.wait(until.urlContains('/hotelListings'), 30000);
    const seeMoreDetailsButton = await driver.wait(until.elementLocated(By.css('.more-info')), 30000);
    await driver.wait(until.elementIsVisible(seeMoreDetailsButton), 30000);
    await driver.wait(until.elementIsEnabled(seeMoreDetailsButton), 30000);
    await seeMoreDetailsButton.click();
    await driver.wait(until.urlContains('/ViewHotelDetails'), 30000);

    await driver.wait(until.urlContains('/ViewHotelDetails/'), 10000);
    let roomCard = await driver.wait(until.elementLocated(By.css('[data-testid="room-card"]')), 40000); //30000
    let plusButton = await roomCard.findElement(By.css('[data-testid="plus-button"]'));
    await plusButton.click();
    roomCard = await driver.wait(until.elementLocated(By.css('[data-testid="room-card"]')), 10000);
    const submitSelectedRoomButton = await driver.wait(until.elementLocated(By.css('.submit-button')), 10000);
    await driver.wait(until.elementIsEnabled(submitSelectedRoomButton), 10000); //wait for it to be clickable
    await submitSelectedRoomButton.click();

    // Cause have not loggedin, wait to be redirected to login page
    await driver.wait(until.urlContains('/login'), 20000);
    // Add Log to see the URL
    const currentUrl = await driver.getCurrentUrl();
    console.log('Current URL:', currentUrl);
    expect(await driver.getCurrentUrl()).toContain('/login');
    const welcomeMessage = await driver.findElement(By.css('.LIMessageContainer h2'));
    expect(await welcomeMessage.getText()).toContain('Welcome Back!');
    const usernameInput = await driver.findElement(By.css('input[data-testid="username"]'));
    const passwordInput = await driver.findElement(By.css('input[data-testid="password"]'));
    expect(await usernameInput.isDisplayed()).toBe(true);
    expect(await passwordInput.isDisplayed()).toBe(true);
    const loginButton = await driver.findElement(By.css('.LILogIn'));
    expect(await loginButton.isDisplayed()).toBe(true);
      
  }, jestTimeout);
  


  test('Validation of details failed due to various inputs', async () => {
    await driver.get('http://localhost:3000');
    const countryInput = await driver.findElement(By.id('country-select-demo'));
    await countryInput.sendKeys('Singapore', Key.ENTER);

    // const nextMonth = moment().add(1, 'months').startOf('month');
    // const checkinDate = nextMonth.format('YYYY-MM-DD'); //1st of each month
    // const checkoutDate = nextMonth.add(4, 'days').format('YYYY-MM-DD'); //5th of each month
    // const checkinInput = await driver.wait(until.elementLocated(By.css('input[aria-label="checkin"]')), 10000);
    // await checkinInput.sendKeys('00'+checkinDate);
    // const checkoutInput = await driver.wait(until.elementLocated(By.css('input[aria-label="checkout"]')), 10000);
    // await checkoutInput.sendKeys('00'+checkoutDate);
    const checkinInput = await driver.findElement(By.css('input[aria-label="checkin"]'));
    const formattedCheckinDate = moment('2024-01-09').format('L');
    await checkinInput.sendKeys(formattedCheckinDate);
    const checkoutInput = await driver.findElement(By.css('input[aria-label="checkout"]'));
    const formattedCheckoutDate = moment('2024-07-09').format('L');
    await checkoutInput.sendKeys(formattedCheckoutDate);

    const personButton = await driver.findElement(By.css('.form-container-button'));
    await personButton.click();
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

    await driver.wait(until.urlContains('/hotelListings'), 30000);
    const seeMoreDetailsButton = await driver.wait(until.elementLocated(By.css('.more-info')), 30000);
    await driver.wait(until.elementIsVisible(seeMoreDetailsButton), 30000);
    await driver.wait(until.elementIsEnabled(seeMoreDetailsButton), 30000);
    await seeMoreDetailsButton.click();
    await driver.wait(until.urlContains('/ViewHotelDetails'), 30000);
  
    await driver.wait(until.elementLocated(By.css('.login')), 30000);
    const loginButton = await driver.findElement(By.css('.login'));
    await loginButton.click();
    await driver.wait(until.urlContains('/login'), 5000);
    const usernameInput = await driver.findElement(By.css('input[data-testid="username"]'));
    await usernameInput.sendKeys('wrongUserName');
    const passwordInput = await driver.findElement(By.css('input[data-testid="password"]'));
    await passwordInput.sendKeys('wrongPassword');
    const submitButton = await driver.findElement(By.css('button[type="submit"]'));
    await submitButton.click();


    try {
      await driver.wait(until.alertIsPresent(), 5000);
      const alert = await driver.switchTo().alert();
      const alertText = await alert.getText();
      expect(alertText).toContain('Login failed: invalid username or password');
      await alert.accept();
    } catch (error) {
      console.log('No alert present or alert handling failed:', error);
    }

    await driver.sleep(2000); //wait for response
    const currentUrl = await driver.getCurrentUrl();
    expect(currentUrl).toContain('/login');
    expect(await usernameInput.isDisplayed()).toBe(true);
    expect(await passwordInput.isDisplayed()).toBe(true);
    
  }, jestTimeout);
});



/*
under memora/memora:
npx jest tests/SystemTests/flows/BookHotel.test.js

*/