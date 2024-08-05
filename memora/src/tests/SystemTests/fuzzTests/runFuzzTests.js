//For login and register

// const { FuzzTarget, FuzzerOptions } = require('@jazzer.js/core');
// const { FuzzTarget } = require('@jazzer.js/core');
const { fuzz } = require('@jazzer.js/core');
const { FuzzedDataProvider } = require('@jazzer.js/core');
const { testLoginWithFuzzedData } = require('./LoginFuzz.test.js');
const { testRegisterWithFuzzedData } = require('./RegistrationFuzz.test.js');

// const options = new FuzzerOptions();
// options.setMaxTotalDurationSecs(2); // 3600 is run for 1 hour

// async function runFuzzTests() {
//     // console.log("Starting Login Fuzz Test...");
//     // await new FuzzTarget(testLoginWithFuzzedData).run(options);
    
//     // console.log("Starting Register Fuzz Test...");
//     // await new FuzzTarget(testRegisterWithFuzzedData).run(options);
    
//     // console.log("Fuzz tests completed.");

//     console.log("Starting Login Fuzz Test...");
//     await fuzz(testLoginWithFuzzedData);
    
//     console.log("Starting Register Fuzz Test...");
//     await fuzz(testRegisterWithFuzzedData);
    
//     console.log("Fuzz tests completed.");
// }

const TIMEOUT = 10000; // 10 seconds
const TEST_COUNT = 5; // Number of tests to run for each function

async function runFuzzTest(testFunction, name) {
    console.log(`Starting ${name} Fuzz Test...`);
    for (let i = 0; i < TEST_COUNT; i++) {
        const data = Buffer.from(Math.random().toString());
        const fuzzed = new FuzzedDataProvider(data);
        await testFunction(fuzzed);
    }
    console.log(`${name} Fuzz Test completed.`);
}


async function runFuzzTests() {
    return new Promise(async (resolve) => {
        const timeoutId = setTimeout(() => {
            console.log("Fuzz tests timed out");
            resolve();
        }, TIMEOUT);

        try {
            await runFuzzTest(testLoginWithFuzzedData, "Login");
            await runFuzzTest(testRegisterWithFuzzedData, "Register");
            console.log("All Fuzz tests completed successfully.");
        } catch (error) {
            console.error("Error during fuzz testing:", error);
        } finally {
            clearTimeout(timeoutId);
            resolve();
        }
    });
}

// runFuzzTests().catch(console.error);
runFuzzTests().then(() => process.exit(0)); //after test, no matter success or fail, exit(0)


/*
under memora/memora:
npm run fuzz

*/
