import { By, until } from 'selenium-webdriver';

class RegisterPage {
    constructor(driver) {
        this.driver = driver;
        this.PAGE_URL = 'http://localhost:3000/registerPage';
    }

    async open() {
        await this.driver.get(this.PAGE_URL);
    }

    // async fillForm(userData) {
    //     await this.driver.wait(until.elementLocated(By.id('title')), 10000);
    //     await this.driver.findElement(By.id('title')).sendKeys(userData.title);

    //     await this.driver.wait(until.elementLocated(By.id('firstName')), 10000);
    //     await this.driver.findElement(By.id('firstName')).sendKeys(userData.firstName);

    //     await this.driver.wait(until.elementLocated(By.id('lastName')), 10000);
    //     await this.driver.findElement(By.id('lastName')).sendKeys(userData.lastName);

    //     await this.driver.wait(until.elementLocated(By.id('username')), 10000);
    //     await this.driver.findElement(By.id('username')).sendKeys(userData.username);

    //     await this.driver.wait(until.elementLocated(By.id('address')), 10000);
    //     await this.driver.findElement(By.id('address')).sendKeys(userData.address);

    //     await this.driver.wait(until.elementLocated(By.id('phoneNumber')), 10000);
    //     await this.driver.findElement(By.id('phoneNumber')).sendKeys(userData.phoneNumber);

    //     await this.driver.wait(until.elementLocated(By.id('email')), 10000);
    //     await this.driver.findElement(By.id('email')).sendKeys(userData.email);

    //     await this.driver.wait(until.elementLocated(By.id('password')), 10000);
    //     await this.driver.findElement(By.id('password')).sendKeys(userData.password);

    //     await this.driver.wait(until.elementLocated(By.id('over21')), 10000);
    //     await this.driver.findElement(By.id('over21')).click();

    //     await this.driver.wait(until.elementLocated(By.id('agreeToTerms')), 10000);
    //     await this.driver.findElement(By.id('agreeToTerms')).click();
    // }

    async handleSuccessAlert() {
        try {
            await this.driver.wait(until.alertIsPresent(), 5000);
            const alert = await this.driver.switchTo().alert();
            const alertText = await alert.getText();
            console.log('Registration alert:', alertText);
            await alert.accept();
            return alertText;
        } catch (error) {
            console.error('No alert present or error occurred:', error);
            return null;
        }
    }

    async fillForm(userData) {
        const fields = ['title', 'firstName', 'lastName', 'username', 'address', 'phoneNumber', 'email', 'password'];
        
        for (const field of fields) {
            const input = await this.driver.wait(until.elementLocated(By.id(field)), 5000);
            await input.sendKeys(userData[field]);
        }

        const over21Checkbox = await this.driver.wait(until.elementLocated(By.id('over21')), 5000);
        await over21Checkbox.click();

        const agreeToTermsCheckbox = await this.driver.wait(until.elementLocated(By.id('agreeToTerms')), 5000);
        await agreeToTermsCheckbox.click();
    }

    async submitForm() {
        // await this.driver.findElement(By.css('button[type="submit"]')).click();
        const submitButton = await this.driver.wait(until.elementLocated(By.css('button[type="submit"]')), 5000);
        await submitButton.click();
    }
}

export default RegisterPage;

