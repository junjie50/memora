import { By, until } from 'selenium-webdriver';

class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.PAGE_URL = 'http://localhost:3000';
    }

    async open() {
        await this.driver.get(`${this.PAGE_URL}/login`);
    }

    // async login(username, password) {
    //     await this.driver.wait(until.elementLocated(By.id('username')), 10000);
    //     await this.driver.findElement(By.id('username')).sendKeys(username);

    //     await this.driver.wait(until.elementLocated(By.id('username')), 10000);
    //     await this.driver.findElement(By.id('password')).sendKeys(password);

    //     await this.driver.wait(until.elementLocated(By.id('username')), 10000);
    //     await this.driver.findElement(By.css('button[type="submit"]')).click();
    // }

    async login(username, password) {
        const usernameInput = await this.driver.wait(until.elementLocated(By.css('input[data-testid="username"]')), 5000);
        await usernameInput.sendKeys(username);

        const passwordInput = await this.driver.wait(until.elementLocated(By.css('input[data-testid="password"]')), 5000);
        await passwordInput.sendKeys(password);

        const submitButton = await this.driver.wait(until.elementLocated(By.css('button[type="submit"]')), 5000);
        await submitButton.click();
    }
}

export default LoginPage;
