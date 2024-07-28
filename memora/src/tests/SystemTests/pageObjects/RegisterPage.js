import { By, until } from 'selenium-webdriver';

class RegisterPage {
    constructor(driver) {
        this.driver = driver;
        this.PAGE_URL = 'http://localhost:3000';
    }

    async open() {
        await this.driver.get(`${this.PAGE_URL}/registerPage`);
    }

    async fillForm(userData) {
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

        await this.driver.wait(until.elementLocated(By.id('over21')), 10000);
        await this.driver.findElement(By.id('over21')).click();

        await this.driver.wait(until.elementLocated(By.id('agreeToTerms')), 10000);
        await this.driver.findElement(By.id('agreeToTerms')).click();
    }

    async submitForm() {
        await this.driver.findElement(By.css('button[type="submit"]')).click();
    }
}

export default RegisterPage;

