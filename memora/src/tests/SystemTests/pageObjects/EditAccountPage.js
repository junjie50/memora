import { By, until } from 'selenium-webdriver';
const wd = require('selenium-webdriver');
const {Key} = wd;

class RegisterPage {
    constructor(driver) {
        this.driver = driver;
        this.PAGE_URL = 'http://localhost:3000';
    }

    async clear(drv, web_elt) {
        await drv.executeScript(elt => elt.select(), web_elt);
        await web_elt.sendKeys(Key.BACK_SPACE);
    }

    async open() {
        await this.driver.get(`${this.PAGE_URL}/updateProfilePage`);
    }

    async navToLogin() {
        await this.driver.wait(until.elementLocated(By.className('login')), 10000);
        await this.driver.findElement(By.className('login')).click();
    }

    async navToEdit() {
        await this.driver.wait(until.elementLocated(By.className('user-picture')), 10000);
        await this.driver.findElement(By.className('user-picture')).click();
    }

    async updateUser(userData) {
        await this.driver.wait(until.elementLocated(By.id('title')), 10000);
        var title = await this.driver.findElement(By.id('title'));
        title.clear();
        title.sendKeys(userData.title);

        await this.driver.wait(until.elementLocated(By.id('firstName')), 10000);
        var firstName = await this.driver.findElement(By.id('firstName'));
        firstName.clear();
        firstName.sendKeys(userData.firstName);

        await this.driver.wait(until.elementLocated(By.id('lastName')), 10000);
        var lastName = await this.driver.findElement(By.id('lastName'));
        lastName.clear();
        lastName.sendKeys(userData.lastName);

        await this.driver.wait(until.elementLocated(By.id('username')), 10000);
        var username = await this.driver.findElement(By.id('username'));
        username.clear();
        username.sendKeys(userData.username);

        await this.driver.wait(until.elementLocated(By.id('address')), 10000);
        var address = await this.driver.findElement(By.id('address'));
        address.clear();
        address.sendKeys(userData.address);

        await this.driver.wait(until.elementLocated(By.id('phoneNumber')), 10000);
        var phoneNumber = await this.driver.findElement(By.id('phoneNumber'))
        phoneNumber.clear();
        phoneNumber.sendKeys(userData.phoneNumber);

        await this.driver.wait(until.elementLocated(By.id('email')), 10000);
        var email = await this.driver.findElement(By.id('email'));
        email.clear();
        email.sendKeys(userData.email);

        await this.driver.wait(until.elementLocated(By.id('password')), 10000);
        var password = await this.driver.findElement(By.id('password'));
        password.clear();
        password.sendKeys(userData.password);
    }

    async updatePass(newPassword) {
        await this.driver.wait(until.elementLocated(By.id('password')), 10000);
        await this.driver.findElement(By.id('password')).sendKeys(newPassword);
    }

    async submitForm() {
        await this.driver.wait(until.elementLocated(By.className('UpdateProfile')), 10000);
        await this.driver.findElement(By.className('UpdateProfile')).click();
    }

    async deleteForm() {
        await this.driver.wait(until.elementLocated(By.className('DeleteAccount')), 10000);
        await this.driver.findElement(By.className('DeleteAccount')).click();
    }

    async editAccount() {
        await this.driver.wait(until.elementLocated(By.className('user-picture')), 10000);
        await this.driver.findElement(By.className('user-picture')).click();
    }

    async login(username, password) {
        await this.driver.wait(until.elementLocated(By.id('username')), 10000);
        await this.driver.findElement(By.id('username')).sendKeys(username);

        await this.driver.wait(until.elementLocated(By.id('password')), 10000);
        await this.driver.findElement(By.id('password')).sendKeys(password);

        await this.driver.wait(until.elementLocated(By.className("LILogIn")), 10000);
        await this.driver.findElement(By.className("LILogIn")).click();
    }
}

export default RegisterPage;

