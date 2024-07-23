const {compareDict} = require("../utils/modelUtils");
const {getTokenFrom} = require("../utils/tokenUtils");
const {parseDate} = require("../utils/dateUtils");
var assert = require('assert');

// Compare dictioanry function
// Used for testing returned data from the model
// If key is removed by database. do not compare
describe('Testing for Compare Dict Function', () => {
	// Define a test case
	it('Test Equal Dict', () => {
        dict1 = {
            name:"junjie",
            email:"junjie@gmail.com"
        }
        dict2 = {
            name:"junjie",
            email:"junjie@gmail.com"
        }

		assert(compareDict(dict1, dict2));
	});

    it('Test Unequal Dict', () => {
        dict1 = {
            name:"junji",
            email:"junjie@gmail.com"
        }
        dict2 = {
            name:"junjie",
            email:"junjie@gmail.com"
        }

		assert(!compareDict(dict1, dict2));
	});

    it('Test missing in database dict.', () => {
        dict1 = {
            name:"junjie",
            email:"junjie@gmail.com"
        }
        dict2 = {
            name:"junjie",
        }

		assert(compareDict(dict1, dict2));
	});

    it('Test missing in input dict.', () => {
        dict1 = {
            name:"junjie",
        }
        dict2 = {
            name:"junjie",
            email:"junjie@gmail.com"
        }
		assert(compareDict(dict1, dict2));
	});
});

// Testing parseToken function used to retrieve the access token from the user.
describe('Testing for parseToken Function', () => {
	// Define a test case
	it('Test parseToken', () => {
        const token = "asdasdasdasd"
        const auth = "Bearer " + token; 
        const request = {
            headers: {
                authorization: auth
            }
        };

        const returned = getTokenFrom(request);
		assert(token === returned);
	});

    it('Test Bearer not present in the access', () => {
        const token = "asdasdasdasd";
        const auth = "bearer " + token; 
        const request = {
            headers: {
                authorization: auth
            }
        };

        const returned = getTokenFrom(request);
		assert(returned === null);
	});

    it('Test Bearer not present in the access', () => {
        const token = "asdasdasdasd";
        const auth = token; 
        const request = {
            headers: {
                authorization: auth
            }
        };
        
        const returned = getTokenFrom(request);
		assert(returned === null);
	});
});

// Testing parseDate function prase date into YYYY-MM-DD format
describe('Testing for parseDate Function', () => {
	// Define a test case
	it('Test parseDate', () => {
        const newDate = new Date("2011-10-10T14:48:00")
        const parsed = parseDate(newDate);
		assert(parsed === "2011-10-10");
	});

    it('Test parseDate', () => {
        const newDate = new Date("2011-10-10T14:48:00")
        const parsed = parseDate(newDate);
		assert(parsed !== "2011-10-12");
	});
});