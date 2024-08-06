const {compareDict} = require("../../utils/modelUtils");
const {getTokenFrom} = require("../../utils/tokenUtils");
const {parseDate} = require("../../utils/dateUtils");
var assert = require('assert');

// Compare dictioanry function
// Used for testing returned data from the model
// If key is removed by database. do not compare

/*
This function helps to compare the returned data from server with the original data to be inserted.
The data returned might be missing some attributes like password as compared to the original data.

Equivalence testing
normal dict1, normal dict2 (true, false case)
normal dict1, missing dict2  (true, false case)
missing dict1, normal dict2  (true, false case)
missing dict1, missing dict2  (true, false case)
null dict1, null dict2 (true)
*/

describe('Testing for Compare Dict Function', () => {
	// Define a test case
	it('Test normal dict1, normal dict2 equal', () => {
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

    it('Test normal dict1, normal dict2 not equal', () => {
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

    it('Test normal dict1, missing dict2 equal.', () => {
        dict1 = {
            name:"junjie",
            email:"junjie@gmail.com"
        }
        dict2 = {
            name:"junjie",
        }

		assert(compareDict(dict1, dict2));
	});

    it('Test normal dict1, missing dict2.', () => {
        dict1 = {
            name:"junj",
            email:"junjie@gmail.com"
        }
        dict2 = {
            name:"junjie",
        }

		assert(!compareDict(dict1, dict2));
	});

    it('Test missing dict1, normal dict2 equal.', () => {
        dict1 = {
            name:"junjie",
        }
        dict2 = {
            name:"junjie",
            email:"junjie@gmail.com"
        }
		assert(compareDict(dict1, dict2));
	});

    it('Test missing dict1, normal dict2 not equal.', () => {
        dict1 = {
            name:"june",
        }
        dict2 = {
            name:"junjie",
            email:"junjie@gmail.com"
        }
		assert(!compareDict(dict1, dict2));
	});

    it('Test missing dict1, missing dict2.', () => {
        dict1 = {
            name:"junjie",
            phoneNumber:"96650"
        }
        dict2 = {
            name:"junjie",
            email:"junjie@gmail.com"
        }
		assert(compareDict(dict1, dict2));
	});

    it('Test edge case, empty dict1 and dict2.', () => {
        dict1 = {
        }
        dict2 = {
        }
		assert(compareDict(dict1, dict2));
	});
});

// Testing parseToken function used to retrieve the access token from the user.
// Testing parseDate function parse date into YYYY-MM-DD format
// Decision table testing
// B1 {Bearer present}
// B2 {bearer present}
// B3 {nothing present}
// T1 {0 length}
// T2 {1 length} 
// T3 {10 length}
describe('Testing for parseToken Function', () => {
	// Define a test case
    const B1 = "Bearer ";
    const B2 = "bearer ";
    const B3 = "";
    const T1 = "";
    const T2 = "a";
    const T3 = "sdafsfdsafs"
	it('Test parseToken B1 + T1', () => {
        const auth = B1 + T1;
        const request = {
            headers: {
                authorization: auth
            }
        };

        const returned = getTokenFrom(request);
		assert(T1 === returned);
	});

    it('Test parseToken B1 + T2', () => {
        const auth = B1 + T2;
        const request = {
            headers: {
                authorization: auth
            }
        };

        const returned = getTokenFrom(request);
		assert(returned === T2);
	});

    it('Test parseToken B1 + T3', () => {
        const auth = B1 + T3;
        const request = {
            headers: {
                authorization: auth
            }
        };

        const returned = getTokenFrom(request);
		assert(returned === T3);
	});

    it('Test parseToken B2 + T1', () => {
        const auth = B2 + T1;
        const request = {
            headers: {
                authorization: auth
            }
        };

        const returned = getTokenFrom(request);
		assert(!returned);
	});

    it('Test parseToken B2 + T2', () => {
        const auth = B2 + T2;
        const request = {
            headers: {
                authorization: auth
            }
        };

        const returned = getTokenFrom(request);
		assert(!returned);
	});


    it('Test parseToken B3 + T2', () => {
        const auth = B3 + T2;
        const request = {
            headers: {
                authorization: auth
            }
        };

        const returned = getTokenFrom(request);
		assert(!returned );
	});
});

// Testing parseDate function parse date into YYYY-MM-DD format
// Equivalence testing
// 1 not date object
// 2 null
// 3 wrong date 
// 4 single digit month single digit date 
// 5 single digit month double digit date 
// 6 double digit month single digit date 
// 7 double digit month double digit date 
describe('Testing for parseDate Function', () => {
    it('Test not date object', () => {
        const parsed = parseDate("2011-10-10T14:48:00");
		assert(!parsed);
	});

    it('Test not date object', () => {
        const parsed = parseDate(null);
		assert(!parsed);
	});

    it('Test date object with invalid date', () => {
        const newDate = new Date("2011-10-40T14:48:00")
        const parsed = parseDate(newDate);
		assert(!parsed);
	});

	it('Test single digit month single digit date ', () => {
        const newDate = new Date("2011-09-09T14:48:00")
        const parsed = parseDate(newDate);
		assert(parsed === "2011-09-09");
	});

    it('Test single digit month double digit date ', () => {
        const newDate = new Date("2011-09-19T14:48:00")
        const parsed = parseDate(newDate);
		assert(parsed === "2011-09-19");
	});

    it('Test double digit month single digit date ', () => {
        const newDate = new Date("2011-11-09T14:48:00")
        const parsed = parseDate(newDate);
		assert(parsed === "2011-11-09");
	});

    it('Test double digit month double digit date ', () => {
        const newDate = new Date("2011-11-13T14:48:00")
        const parsed = parseDate(newDate);
		assert(parsed === "2011-11-13");
	});
});