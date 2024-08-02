import { By, until } from 'selenium-webdriver';

class RegisterPage {
    constructor(driver) {
        this.driver = driver;
        this.PAGE_URL = 'http://localhost:3000';
    }

    async open() {
        await this.driver.get(`${this.PAGE_URL}/updateProfilePage`);
    }

    async updateUser(userData) {
        await this.driver.wait(until.elementLocated(By.id('title')), 10000);
        await this.driver.findElement(By.id('title')).sendKeys(userData.title);

        await this.driver.wait(until.elementLocated(By.id('firstName')), 10000);
        await this.driver.findElement(By.id('firstName')).sendKeys(userData.firstName);

        await this.driver.wait(until.elementLocated(By.id('lastName')), 10000);
        await this.driver.findElement(By.id('lastName')).sendKeys(userData.lastName);

        await this.driver.wait(until.elementLocated(By.id('username')), 10000);
        await this.driver.findElement(By.id('username')).sendKeys(userData.username);

        await this.driver.wait(until.elementLocated(By.id('address')), 10000);
        await this.driver.findElement(By.id('address')).sendKeys(userData.address);

        await this.driver.wait(until.elementLocated(By.id('phoneNumber')), 10000);
        await this.driver.findElement(By.id('phoneNumber')).sendKeys(userData.phoneNumber);

        await this.driver.wait(until.elementLocated(By.id('email')), 10000);
        await this.driver.findElement(By.id('email')).sendKeys(userData.email);

        await this.driver.wait(until.elementLocated(By.id('password')), 10000);
        await this.driver.findElement(By.id('password')).sendKeys(userData.password);
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
}

export default RegisterPage;

