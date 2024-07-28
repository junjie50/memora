
import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import RegisterPage from '../pageObjects/RegisterPage.js';
import LoginPage from '../pageObjects/LoginPage.js';
import { By, until } from 'selenium-webdriver';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; //Universally Unique Identifier
import testMember from '../testData/TestMemberData.js';

// const chrome = require('selenium-webdriver/chrome');
// const chromedriver = require('chromedriver');
// chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

const PAGE_URL = 'http://localhost:3000';
const BASE_URL = 'https://memora-backend-2eebe428f36a.herokuapp.com';
let driver;


beforeAll(async () => {
    const options = new chrome.Options();
    driver = await new Builder() //initialize web driver
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    const uniqueId = uuidv4().substring(0, 8);
    testMember.username = `testuser_${uniqueId}`;
    testMember.email = `testuser_${uniqueId}@example.com`;
    testMember.phoneNumber = Math.floor(10000000 + Math.random() * 90000000).toString(); //random 8 digits
});


afterAll(async () => {
    if (driver) {
      await driver.quit();
    }

    //delete test user (need controller method)
    // try {
    //     await axios.delete(`${BASE_URL}/api/users`, { data: { username: testMember.username } });
    // } catch (error) {
    //     console.error('Failed to cleanup test user:', error);
    // }
});

describe('Authentication Flow', () => {
    beforeEach(() => { //check web server
        if (!driver) {
          throw new Error('WebDriver failed to initialize');
        }
    });

    test('User can register successfully', async () => {
        console.log('Starting registration test');
        const registerPage = new RegisterPage(driver);
        await registerPage.open();
        console.log('Registration page opened');

        await registerPage.fillForm(testMember);
        console.log('Form filled');

        await registerPage.submitForm();
        console.log('Form submitted');

        // Add assertion to check successful registration
        // Could be used for checking a success message or redirection to login page
        const currentUrl = await driver.getCurrentUrl();
        console.log('Current URL:', currentUrl);

        expect(currentUrl).toContain(`${PAGE_URL}/registerPage`);
        console.log('Registration page URL:', currentUrl);

        try {
            const response = await axios.post(`${BASE_URL}/api/users`, testMember);
            expect(response.status).toBe(201);
            expect(response.data.id).toBeTruthy();
        } catch (error) {
            console.error('Registration API error:', error.response ? error.response.data : error.message);
            throw error;
        }
    });

    test('User can login with registered credentials', async () => {
        const loginPage = new LoginPage(driver);
        await loginPage.open();
        await loginPage.login(testMember.username, testMember.password);

        //wait and fix the alert
        try {
            await driver.wait(until.alertIsPresent(), 5000);
            const alert = await driver.switchTo().alert();
            const alertText = await alert.getText();
            console.log('Alert text:', alertText);
            await alert.accept();
        } catch (error) {
            console.log('No alert present after registration');
        }

        // Verify Login
        const verifyLogin = async (username, password) => {
            try {
                const response = await axios.post(`${BASE_URL}/api/users/login`, { username, password });
                return response.data.token != null;
            } catch (error) {
                console.error('Login verification failed:', error);
                return false;
            }
        };

        const loginSuccessful = await verifyLogin(testMember.username, testMember.password);
        expect(loginSuccessful).toBe(true);
       
        await driver.wait(until.urlContains('/'), 10000); //expect Home page loading
        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toContain('/'); //Home page
        
    },30000); //30 seconds
});


/*
under memora: 
npm start

another terminal, under memora: 
npm run test:system
*/