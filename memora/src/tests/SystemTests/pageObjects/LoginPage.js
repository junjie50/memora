import { By, until } from 'selenium-webdriver';

class LoginPage {
    constructor(driver) {
        this.driver = driver;
        this.PAGE_URL = 'http://localhost:3000';
    }

    async open() {
        await this.driver.get(`${this.PAGE_URL}/login`);
    }

    async login(username, password) {
        await this.driver.wait(until.elementLocated(By.id('username')), 10000);
        await this.driver.findElement(By.id('username')).sendKeys(username);

        await this.driver.wait(until.elementLocated(By.id('password')), 10000);
        await this.driver.findElement(By.id('password')).sendKeys(password);

        await this.driver.wait(until.elementLocated(By.className("LILogIn")), 10000);
        await this.driver.findElement(By.className("LILogIn")).click();
    }

    async handleLoginAlert() {
        try {
            await this.driver.wait(until.alertIsPresent(), 5000);
            const alert = await this.driver.switchTo().alert();
            const alertText = await alert.getText();
            console.log('Login alert:', alertText);
            await alert.accept();
            return alertText;
        } catch (error) {
            console.error('No alert present or error occurred:', error);
            return null;
        }
    }

    async simulateMaximumAttempts() { //future implemented
        await this.driver.get(`${this.PAGE_URL}/forgetPasswordPage`);
    }

}

export default LoginPage;
