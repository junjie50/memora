import { By, until } from 'selenium-webdriver';

class HotelListings {
    constructor(driver) {
        this.driver = driver;
        this.PAGE_URL = 'http://localhost:3000';
    }

    async open() {
        await this.driver.get(`${this.PAGE_URL}/hotelListings`);
    }
}

export default HotelListings;