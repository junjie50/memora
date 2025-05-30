import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import RegisterPage from '../pageObjects/RegistrationPage.js';
import LoginPage from '../pageObjects/LoginPage.js';
import { v4 as uuidv4 } from 'uuid';
import {testMember} from '../testData/TestMemberData.js';

const PAGE_URL = 'http://localhost:3000';
let driver;

beforeAll(async () => {
    const options = new chrome.Options();
    options.addArguments('start-maximized');
    driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    const uniqueId = uuidv4().substring(0, 8);
    testMember.username = `testuser_${uniqueId}`;
    testMember.email = `testuser_${uniqueId}@example.com`;
    testMember.phoneNumber = Math.floor(10000000 + Math.random() * 90000000).toString();
});

afterAll(async () => {
    if (driver) {
        await driver.quit();
    }
});

describe('Authentication Flow', () => {
    test('Member can register successfully', async () => {
        // Open the registration page
        const registerPage = new RegisterPage(driver);
        await registerPage.open();
        // Fill out the registration form with valid member details
        await registerPage.fillForm(testMember);
        // Submit the registration form
        await registerPage.submitForm();
        // Handle the successful registration alert
        const alertText = await registerPage.handleSuccessAlert();
        // Assert that the alert message contains "Registration successful"
        expect(alertText).toContain('Registration successful');
        // After handling the alert, wait for redirection to the login page
        await driver.wait(until.urlContains('/login'), 5000);
        const currentUrl = await driver.getCurrentUrl();
        // Assert that the current URL contains "/login"
        expect(currentUrl).toContain('/login');
    }, 30000);

    test('Member registration fails due to invalid details', async () => {
        // Open the registration page
        const registerPage = new RegisterPage(driver);
        await registerPage.open();
        // Create an invalid member object with a short username
        const invalidMember = {
            ...testMember,
            username: '', // System requires every block to be filled in
            email:'',
        };
        // Fill out the registration form with invalid member details
        await registerPage.fillForm(invalidMember);
        // Submit the registration form
        await registerPage.submitForm();
        // Check for empty field errors
        const emptyFields = await registerPage.checkForEmptyFieldErrors();
        expect(emptyFields).toContain('username');
        expect(emptyFields).toContain('email');
        // Test whether the information is registered by other members by reenter testMember
        await registerPage.fillForm(testMember); 
        await registerPage.submitForm();
        // Handle the alert for duplicate registration
        const alertText = await registerPage.handleSuccessAlert();
        expect(alertText).toContain('Registration failed: E11000 duplicate key error');
        // Verify that member redirected to the login page after failed registration, wait register again
        await driver.wait(until.urlContains('/login'), 5000);
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toContain('/login');
    }, 30000);

    test('Member can login with registered credentials', async () => {
        // Open the login page
        const loginPage = new LoginPage(driver);
        await loginPage.open();
        // Login with the newly registered username and password
        await loginPage.login(testMember.username, testMember.password);
        // Wait for successful login (redirect to home page)
        await driver.wait(until.urlContains('/'), 10000);
        // Assert that the current URL contains "/" (home page)
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toContain('/'); //home
    }, 30000);

    test('Member login fails with invalid credentials', async () => {
        // Open the login page
        const loginPage = new LoginPage(driver);
        await loginPage.open();
        // Attempt to login with invalid credentials
        const invalidUsername = 'invaliduser';
        const invalidPassword = 'invalidpassword';
        await loginPage.login(invalidUsername, invalidPassword);
        // Handle the login alert
        const alertText = await loginPage.handleLoginAlert();
        // Assert that the alert message indicates a failed login
        expect(alertText).toContain('Login failed: invalid username or password, please reenter your information.');
        // Verify that we're still on the login page
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toContain('/login');
    }, 30000);

    test('Member account maximum attempts exceeded', async () => {
        // Open the login page
        const loginPage = new LoginPage(driver);
        await loginPage.open();
        // Attempt to login with invalid credentials multiple times
        const maxAttempts = 5;
        for (let i = 0; i < maxAttempts; i++) {
            await loginPage.login('invaliduser', 'invalidpassword');
            await loginPage.handleLoginAlert();
        }
        // Simulate the behavior of redirecting to the forget password page
        await loginPage.simulateMaximumAttempts();
        // Verify that the current URL is the forget password page
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toBe(`${loginPage.PAGE_URL}/forgetPasswordPage`);
    }, 60000);
});



/*
under memora: 
npm start

npx jest tests/SystemTests/flows/LoginRegistration.test.js


another terminal, under memora: 
npm run test:system
*/



//old wrong version
// import { Builder } from 'selenium-webdriver';
// import chrome from 'selenium-webdriver/chrome';
// import RegisterPage from '../pageObjects/RegisterPage.js';
// import LoginPage from '../pageObjects/LoginPage.js';
// import { By, until } from 'selenium-webdriver';
// import axios from 'axios';
// import { v4 as uuidv4 } from 'uuid'; //Universally Unique Identifier
// import testMember from '../testData/TestMemberData.js';

// // Use BookingFlow.test.js

// // const chrome = require('selenium-webdriver/chrome');
// // const chromedriver = require('chromedriver');
// // chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

// const PAGE_URL = 'http://localhost:3000';
// const BASE_URL = 'https://memora-backend-2eebe428f36a.herokuapp.com';
// let driver;

// beforeAll(async () => {
//     const options = new chrome.Options();
//     driver = await new Builder() //initialize web driver
//         .forBrowser('chrome')
//         .setChromeOptions(options)
//         .build();

//     const uniqueId = uuidv4().substring(0, 8);
//     testMember.username = `testuser_${uniqueId}`;
//     testMember.email = `testuser_${uniqueId}@example.com`;
//     testMember.phoneNumber = Math.floor(10000000 + Math.random() * 90000000).toString(); //random 8 digits


//     try {
//         await axios.get(`${BASE_URL}/health`);
//         console.log('API is accessible');
//     } catch (error) {
//         console.error('API is not accessible:', error.message);
//     }
// });


// afterAll(async () => {
//     if (driver) {
//       await driver.quit();
//     }

//     //delete test user (need controller method)
//     // try {
//     //     await axios.delete(`${BASE_URL}/api/users`, { data: { username: testMember.username } });
//     // } catch (error) {
//     //     console.error('Failed to cleanup test user:', error);
//     // }
// });

// describe('Authentication Flow', () => {
//     beforeEach(() => { //check web server
//         if (!driver) {
//           throw new Error('WebDriver failed to initialize');
//         }
//     });

//     test('User can register successfully', async () => {
//         console.log('Starting registration test');
//         const registerPage = new RegisterPage(driver);
//         await registerPage.open();
//         console.log('Registration page opened');

//         await registerPage.fillForm(testMember);
//         console.log('Form filled');

//         await registerPage.submitForm();
//         console.log('Form submitted');

//         // Add assertion to check successful registration
//         // Could be used for checking a success message or redirection to login page
//         const currentUrl = await driver.getCurrentUrl();
//         console.log('Current URL:', currentUrl);

//         expect(currentUrl).toContain(`/registerPage`);
//         console.log('Registration page URL:', currentUrl);

//         try {
//             const response = await axios.post(`${BASE_URL}/api/users`, testMember);
//             console.log('Registration response:', response.data);
//             expect(response.status).toBe(201);
//             expect(response.data.id).toBeTruthy();
//         } catch (error) {
//             console.error('Registration API error:', error.response ? error.response.data : error.message);
//             throw error;
//         }

//     });

//     test('User can login with registered credentials', async () => {
//         const loginPage = new LoginPage(driver);
//         await loginPage.open();
//         await loginPage.login(testMember.username, testMember.password);

//         //wait and fix the alert
//         try {
//             await driver.wait(until.alertIsPresent(), 5000);
//             const alert = await driver.switchTo().alert();
//             const alertText = await alert.getText();
//             console.log('Alert text:', alertText);
//             await alert.accept();
//         } catch (error) {
//             console.log('No alert present after registration');
//         }

//         // Verify Login
//         const verifyLogin = async (username, password) => {
//             try {
//                 const response = await axios.post(`${BASE_URL}/api/users/login`, { username, password });
//                 console.log('Login response:', response.data);
//                 return response.data.token != null;
//             } catch (error) {
//                 console.error('Login verification failed:', error.response ? error.response.data : error.message);
//                 return false;
//             }
//         };

//         const loginSuccessful = await verifyLogin(testMember.username, testMember.password);
//         expect(loginSuccessful).toBe(true);
       
//         await driver.wait(until.urlContains('/'), 10000); //expect Home page loading
//         const currentUrl = await driver.getCurrentUrl();
//         console.log('Current URL after login:', currentUrl);
//         expect(currentUrl).toContain('/'); //Home page
        
//     },30000); //30 seconds
// });


