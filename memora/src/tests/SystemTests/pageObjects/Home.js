import { By, until } from 'selenium-webdriver';

class Home {
    constructor(driver) {
        this.driver = driver;
        this.PAGE_URL = 'http://localhost:3000';
    }

    async open() {
        await this.driver.get(`${this.PAGE_URL}/`);
    }
}

export default Home;