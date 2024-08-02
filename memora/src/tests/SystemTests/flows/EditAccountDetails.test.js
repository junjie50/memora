
import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';
import RegisterPage from '../pageObjects/RegisterPage.js';
import LoginPage from '../pageObjects/LoginPage.js';
import EditAccountPage from '../pageObjects/EditAccountPage.js';
import { By, until } from 'selenium-webdriver';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; //Universally Unique Identifier

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

describe('Edit Account Detail', () => {
    beforeEach(() => { //check web server
        if (!driver) {
          throw new Error('WebDriver failed to initialize');
        }
    });

    test('User can register and login with registered credentials and delete / update account', async () => {
        const number = Math.floor(10000000 + Math.random() * 90000000).toString(); //random 8 digits;
        var testMember = {
            title: 'Mr',
            firstName: 'John',
            lastName: 'Doe',
            username: `testuser_${number}`,
            address: '123 Test St',
            phoneNumber: number,
            email: `testuser1_${number}@example.com`,
            password: 'securePassword123',
        };
        
        var testMemberWNewPassword = {
            title: 'Mr',
            firstName: 'John',
            lastName: 'Doe',
            username: `testuser_${number}`,
            address: '123 Test St',
            phoneNumber: number,
            email: `testuser1_${number}@example.com`,
            password: 'securePassword',
        };
        console.log('Starting registration test');
        const registerPage = new RegisterPage(driver);
        await registerPage.open();
        console.log('Registration page opened');

        await registerPage.fillForm(testMember);
        console.log('Form filled');

        await registerPage.submitForm();
        console.log('Form submitted');

        await driver.wait(until.alertIsPresent(), 5000);
        alert = await driver.switchTo().alert();
        alertText = await alert.getText();
        console.log('Alert text:', alertText);
        await alert.accept();


        // Add assertion to check successful registration
        // Could be used for checking a success message or redirection to login page
        var currentUrl = await driver.getCurrentUrl();
        console.log('Current URL:', currentUrl);

        expect(currentUrl).toContain(`${PAGE_URL}/registerPage`);
        console.log('Registration page URL:', currentUrl);
        
        const loginPage = new LoginPage(driver);
        await loginPage.open();
        await loginPage.login(testMember.username, testMember.password);

        await driver.wait(until.urlContains('/'), 10000); //expect Home page loading
        currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toContain('/'); //Home page

        const editAccountPage = new EditAccountPage(driver);
        await editAccountPage.open();
        await editAccountPage.updateUser(testMemberWNewPassword);
        await editAccountPage.submitForm();

    //wait and fix the alert
        await driver.wait(until.alertIsPresent(), 5000);
        var alert = await driver.switchTo().alert();
        var alertText = await alert.getText();
        console.log('Alert text:', alertText);
        await alert.accept();

        await editAccountPage.open();
        await editAccountPage.deleteForm();
        //wait and fix the alert
        await driver.wait(until.alertIsPresent(), 5000);
        alert = await driver.switchTo().alert();
        alertText = await alert.getText();
        console.log('Alert text:', alertText);
        await alert.accept();

        await driver.wait(until.alertIsPresent(), 5000);
        alert = await driver.switchTo().alert();
        alertText = await alert.getText();
        console.log('Alert text:', alertText);
        await alert.accept();

        await loginPage.open();
        await loginPage.login(testMember.username, testMember.password);

         //wait and fix the alert
        await driver.wait(until.alertIsPresent(), 5000);
        alert = await driver.switchTo().alert();
        alertText = await alert.getText();
        expect(alertText).toContain('Login failed');
        console.log('Alert text:', alertText);
        await alert.accept();

    },30000); //30 seconds
});


/*
under memora: 
npm start

another terminal, under memora: 
npm run test:system
*/