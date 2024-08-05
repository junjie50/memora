import TestSpecialRequests from '../testData/TestSpecialRequests';
const { Builder, By, Key, until } = require('selenium-webdriver');
const { Options } = require('selenium-webdriver/chrome');
const { FuzzedDataProvider } = require('@jazzer.js/core');

const TEST_COUNT = 1; // Test Count (in case at home page: checkout date < checkin date)
const TIMEOUT = 100000; // 100s
// with code from HomeFuzz.test.js

describe('Booking Flow Fuzz Testing', () => {
    let driver;

    beforeAll(async () => {
        const options = new Options();
        // options.addArguments('start-maximized');
        options.addArguments('start-maximized', 'incognito'); //Incognito Window (refresh everytime)
        driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();
    }, TIMEOUT);

    afterEach(async () => { //use Each, not all
        await driver.quit();
    }, TIMEOUT);

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function generateRandomString(length) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return result;
    }

    function formatDateForInput(date) {
        const year = date.getFullYear().toString().padStart(6, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function generateFutureDate() {
        const currentYear = new Date().getFullYear();
        const year = getRandomInt(currentYear, currentYear + 10); // from now to future 10 years
        const month = getRandomInt(1, 12);
        const day = getRandomInt(1, 28); // use 28 as upper limit to avoid dates problem
        return `${year}/${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`;
    }

    const creditCardPrefixes = ['4', '5', '37', '6']; // eg. Visa, MasterCard, AmEx, Discover
    function generateCreditCardNumber() {
        const prefix = creditCardPrefixes[Math.floor(Math.random() * creditCardPrefixes.length)];
        const remainingDigits = '0'.repeat(15 - prefix.length) + Math.floor(Math.random() * Math.pow(10, 15 - prefix.length));
        return prefix + remainingDigits;
    }

    // avoid stuck at login page
    async function attemptLogin(username, password, maxAttempts = 3) {
        for (let attempt = 1; attempt <= maxAttempts; attempt++) { //retry 3 times
            await driver.findElement(By.css('input[data-testid="username"]')).sendKeys(username);
            await driver.findElement(By.css('input[data-testid="password"]')).sendKeys(password);
            await driver.findElement(By.css('button[type="submit"]')).click();
            try {
                await driver.wait(until.urlContains('/ViewHotelDetails/'), 10000);
                console.log('Login successful');
                return true;
            } catch (error) {
                console.log(`Login attempt ${attempt} failed`);
                if (attempt === maxAttempts) {
                console.log('Max login attempts reached');
                return false;
                }
            }
        }
    }

    async function fuzzBookingFlow(fuzz) {
        try {
            // Home page
            await driver.get('http://localhost:3000');
            await driver.sleep(2000);
            // Fuzz destination
            // const destination = fuzz.consumeString(10).replace(/[^a-zA-Z]/g, '') + 'land';
            const destinations = ['London', 'Bangkok', 'Phuket', 'Chiang Mai', 'Pattaya', 'Patong', 'Singapore', 'New York', 'Paris']; //'land' example
            const randomDestination = destinations[Math.floor(Math.random() * destinations.length)];
            console.log('Fuzzing destination:', randomDestination);
            const countryInput = await driver.findElement(By.id('country-select-demo'));
            await countryInput.sendKeys(randomDestination);
            await driver.sleep(1000); //wait for auto complete
            await countryInput.sendKeys(Key.ARROW_DOWN, Key.ENTER); //no.one recommend
            // Fuzz dates
            const today = new Date();
            const futureCheckinDate = new Date(today.getTime() + getRandomInt(1, 90) * 24 * 60 * 60 * 1000);
            const futureCheckoutDate = new Date(futureCheckinDate.getTime() + getRandomInt(1, 14) * 24 * 60 * 60 * 1000);
            const checkinDate = formatDateForInput(futureCheckinDate);
            const checkoutDate = formatDateForInput(futureCheckoutDate);
            console.log('Fuzzing check-in date:', checkinDate);
            console.log('Fuzzing check-out date:', checkoutDate);
            const checkinInput = await driver.findElement(By.css('input[aria-label="checkin"]'));
            await checkinInput.sendKeys(checkinDate);
            const checkoutInput = await driver.findElement(By.css('input[aria-label="checkout"]'));
            await checkoutInput.sendKeys(checkoutDate);
            // Fuzz person details
            const adults = getRandomInt(1, 5);
            const children = getRandomInt(0, 3);
            const rooms = getRandomInt(1, 3);
            console.log('Fuzzing adults:', adults, 'children:', children, 'rooms:', rooms);
            const personButton = await driver.findElement(By.css('.form-container-button'));
            await personButton.click();
            for (let i = 1; i < adults; i++) {
                await driver.findElement(By.css("[data-testid='plus-adult-button']")).click();
                // await driver.sleep(500);
            }
            for (let i = 0; i < children; i++) {
                await driver.findElement(By.css("[data-testid='plus-children-button']")).click();
                // await driver.sleep(500);
            }
            for (let i = 1; i < rooms; i++) {
                await driver.findElement(By.css("[data-testid='plus-room-button']")).click();
                await driver.sleep(500);
            }
            await driver.findElement(By.xpath("//button[contains(text(),'Done')]")).click();
            // Search
            await driver.findElement(By.xpath("//button[contains(text(),'Search')]")).click();



            // Hotel Listing Page
            await driver.wait(until.urlContains('/hotelListings'), 30000);
            try{
                await driver.wait(until.elementLocated(By.css('[data-testid="price-range-slider"]')), 10000);
                await driver.wait(until.elementIsVisible(driver.findElement(By.css('[data-testid="price-range-slider"]'))), 10000); //not too sure
                const priceRangeSlider = await driver.findElement(By.css('[data-testid="price-range-slider"]')); // Fuzz price range
                await driver.wait(async () => {
                    const maxPrice = await priceRangeSlider.getAttribute('max');
                    return maxPrice && parseInt(maxPrice) > 0;
                }, 10000, 'Price range max value not updated');

                // check if hotel information available
                const noHotelsMessage = await driver.findElements(By.css('.no-hotels-message'));
                if (noHotelsMessage.length > 0) {
                    console.log('No hotels available for the selected criteria. Restarting search.');
                    return; // next iteration
                }
                // (Price Range bar need to be fixed)
                // await driver.wait(until.elementTextIsNotEmpty(By.css('[data-testid="price-range-value"]')), 10000);
                // Fuzz filter options
                const starRatings = [1, 2, 3, 4, 5];
                const randomStarRating = starRatings[Math.floor(Math.random() * starRatings.length)];
                await driver.findElement(By.css(`[data-testid="star-rating-${randomStarRating}"]`)).click();
                // Fuzz price range
                // const priceRangeSlider = await driver.findElement(By.css('[data-testid="price-range-slider"]'));
                const maxPrice = await priceRangeSlider.getAttribute('max');
                const randomPrice = Math.floor(Math.random() * parseInt(maxPrice));
                await driver.executeScript(`arguments[0].value = ${randomPrice};`, priceRangeSlider);
                await driver.executeScript(`arguments[0].dispatchEvent(new Event('change'));`, priceRangeSlider);
                // Fuzz filters
                await driver.findElement(By.css('[data-testid="search-button"]')).click();
                await driver.sleep(3000); // Wait for results to update
                // Fuzz sort options
                const sortOptions = ['guest-rating', 'price-low-to-high', 'price-high-to-low'];
                const randomSortOption = sortOptions[Math.floor(Math.random() * sortOptions.length)]; //randomly choose one option
                const sortSelect = await driver.findElement(By.css('[data-testid="sort-select"]'));
                await sortSelect.sendKeys(randomSortOption)
                // Wait for results to update
                await driver.sleep(2000);
                console.log(`Applied filters: Star Rating: ${randomStarRating}, Price: ${randomPrice}, Sort: ${randomSortOption}`);
                // (not worked) const seeMoreDetailsButton = await driver.wait(until.elementLocated(By.css('.more-info')), 30000);
                const seeMoreDetailsButton = await driver.wait(until.elementLocated(By.css('button.more-info')), 10000); //30000
                await seeMoreDetailsButton.click();
            } catch (error) {
                console.error('Error in Hotel Listing Page:', error);
                return;
            };
            


            // Hotel Details Page
            await driver.wait(until.urlContains('/ViewHotelDetails'), 30000);
            // Login (logged in from here)
            await driver.wait(until.elementLocated(By.css('.login')), 10000);
            const loginButton = await driver.findElement(By.css('.login'));
            await loginButton.click();
            await driver.wait(until.urlContains('/login'), 5000);
            


            // Fuzz login details
            const validCredentials = [ //validate members
                { username: 'xiaowang3', password: '123456' },
                { username: 'testUser2', password: '123456' },
                { username: 'testUser3', password: '123456' }
            ];
            const useValidCredential = Math.random() < 0.7; // 70% to use validated member information
            
            if (useValidCredential) {
                console.log('Using valid credential');
                const credential = validCredentials[Math.floor(Math.random() * validCredentials.length)]; //randomly choose one valideated member from validCredentials
                const loginSuccess = await attemptLogin(credential.username, credential.password);
                // await driver.findElement(By.css('input[data-testid="username"]')).sendKeys(credential.username);
                // await driver.findElement(By.css('input[data-testid="password"]')).sendKeys(credential.password);
                if (!loginSuccess) {
                    console.log('Login failed with valid credentials, skipping to next test iteration');
                    return; //jump to next iteration
                }
            } else {
                console.log('Using random credential');
                const username = fuzz.consumeString(10);
                const password = fuzz.consumeString(10);
                await driver.findElement(By.css('input[data-testid="username"]')).sendKeys(username);
                await driver.findElement(By.css('input[data-testid="password"]')).sendKeys(password);
                const loginSuccess = await attemptLogin(username, password);
                if (!loginSuccess) {
                    console.log('Login failed with random credentials, skipping to next test iteration');
                    return; //jump to next iteration
                }
            }
            // await driver.findElement(By.css('button[type="submit"]')).click(); //already clicked in attemptLogin



            // Navigate back to viewhotelDetails page
            await driver.wait(until.urlContains('/ViewHotelDetails/'), 60000);
            let roomCard = await driver.wait(until.elementLocated(By.css('[data-testid="room-card"]')), 10000);
            let plusButton = await roomCard.findElement(By.css('[data-testid="plus-button"]'));
            await plusButton.click();
            const submitSelectedRoomButton = await driver.wait(until.elementLocated(By.css('.submit-button')), 10000);
            await submitSelectedRoomButton.click();

            // Booking Page
            await driver.wait(until.urlContains('/bookingPageLoggedIn'), 5000);
            // Fuzz payment details
            // const specialRequest = generateRandomString(100); // generate special request
            const specialRequest = TestSpecialRequests[Math.floor(Math.random() * TestSpecialRequests.length)]; //from TestSpecialRequests.js
            console.log('Fuzzing special request:', specialRequest);
            await driver.findElement(By.css('input[data-testid="specialRequestText"]')).sendKeys(specialRequest);
            // const creditCardNumber = generateRandomString(16).replace(/[^0-9]/g, '');
            const creditCardNumber = generateCreditCardNumber();
            const cardHolderName = generateRandomString(20).replace(/[^a-zA-Z ]/g, '');
            const billingAddress = generateRandomString(50);
            const postalCode = getRandomInt(10, 99).toString();
            const countryName = generateRandomString(15).replace(/[^a-zA-Z]/g, '');
            // const validUntill = `${getRandomInt(1, 12).toString().padStart(2, '0')}/${getRandomInt(23, 30)}`;
            const validUntill = generateFutureDate();
            const cvcNo = getRandomInt(100, 999).toString();
            console.log('Fuzzing payment details:', { creditCardNumber, cardHolderName, billingAddress, postalCode, countryName, validUntill, cvcNo });
            await driver.findElement(By.css('input[data-testid="creditCardNumber"]')).sendKeys(creditCardNumber);
            await driver.findElement(By.css('input[data-testid="cardHolderName"]')).sendKeys(cardHolderName);
            await driver.findElement(By.css('input[data-testid="billingAddress"]')).sendKeys(billingAddress);
            await driver.findElement(By.css('input[data-testid="postalCode"]')).sendKeys(postalCode);
            await driver.findElement(By.css('input[data-testid="countryName"]')).sendKeys(countryName);
            await driver.sleep(500); //wait a bit before click ProceedBookingSummary
            await driver.findElement(By.css('input[data-testid="validUntill"]')).sendKeys(validUntill);
            await driver.sleep(500);
            await driver.findElement(By.css('input[data-testid="cvcNo"]')).sendKeys(cvcNo);
            await driver.sleep(500);
            //click ProceedBookingSummary button
            await driver.findElement(By.css('.ProceedBookingSummary')).click();



            // Booking Confirmation
            await driver.wait(until.urlContains('/bookingConfirmed'), 5000);
            const termsCheckbox = await driver.findElement(By.css('input[data-testid="agreementCheckbox"]'));
            await driver.executeScript("arguments[0].checked = true;", termsCheckbox);
            await driver.findElement(By.css('.ConfirmBooking')).click();



            // Booking Completed
            await driver.wait(until.urlContains('/bookingCompleted'), 5000);
            const confirmationMessage = await driver.findElement(By.css('.TextBar'));
            console.log('Booking result:', await confirmationMessage.getText());
        } catch (error) {
            console.error('Test failed:', error);
        }
    }

    test('Fuzz test entire booking flow', async () => {
        for (let i = 0; i < TEST_COUNT; i++) {
            console.log(`Running fuzz test iteration ${i + 1}`);

            // const options = new Options();
            // options.addArguments('start-maximized', 'incognito');
            // driver = await new Builder().forBrowser('chrome').setChromeOptions(options).build();

            const data = Buffer.from(Math.random().toString());
            const fuzz = new FuzzedDataProvider(data);
            await fuzzBookingFlow(fuzz);

            // try {
            //     const data = Buffer.from(Math.random().toString());
            //     const fuzz = new FuzzedDataProvider(data);
            //     await fuzzBookingFlow(fuzz);
            // } finally {
            //     await driver.quit();
            // }
        }
    }, TIMEOUT * TEST_COUNT);
});



/*


under memora/memora:
npx jest tests/fuzzTests/BookHotelFuzz.test.js  

*/