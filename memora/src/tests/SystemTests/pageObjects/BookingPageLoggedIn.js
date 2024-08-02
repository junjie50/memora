import { By, until } from 'selenium-webdriver';

class BookingPageLoggedIn {
  constructor(driver) {
    this.driver = driver;
  }

  async enterPaymentDetails(paymentData) {
    await this.driver.findElement(By.css('input[data-testid="creditCardNumber"]')).sendKeys(paymentData.creditCardNumber);
    await this.driver.findElement(By.css('input[data-testid="cardHolderName"]')).sendKeys(paymentData.cardHolderName);
    await this.driver.findElement(By.css('input[data-testid="billingAddress"]')).sendKeys(paymentData.billingAddress);
    await this.driver.findElement(By.css('input[data-testid="postalCode"]')).sendKeys(paymentData.postalCode);
    await this.driver.findElement(By.css('input[data-testid="countryName"]')).sendKeys(paymentData.countryName);
    await this.driver.findElement(By.css('input[data-testid="validUntill"]')).sendKeys(paymentData.validUntill);
    await this.driver.findElement(By.css('input[data-testid="cvcNo"]')).sendKeys(paymentData.cvcNo);
  }

  async clickProceedToBookingSummary() {
    await this.driver.findElement(By.css('.ProceedBookingSummary')).click();
  }

}

export default BookingPageLoggedIn;