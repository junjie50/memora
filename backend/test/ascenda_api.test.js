const {compareDict} = require("../utils/modelUtils");
const {getTokenFrom} = require("../utils/tokenUtils");
const {parseDate} = require("../utils/dateUtils");
const {retrieveAvailableHotels, retrieveAvailableHotelRooms} = require("../services/ascenda-api");
var assert = require('assert');

var SECONDS = 1000;

describe('Ascenda retrieve available hotel detail', () => {
	// Define a test case
	it('Test getting available hotel from ascenda api', async () => {
        try{
            const today = new Date();
            const start = parseDate(new Date(today.setDate(today.getDate() + 5)));
            const end = parseDate(new Date(today.setDate(today.getDate() + 10)));
            const data = await retrieveAvailableHotels(
                "WD0M",
                start,
                end,
                "en_US",
                "SGD",
                "SG",
                "2",
                "1"
            )
            assert(data.completed);
        }
        catch(err){
            assert(false);
        }
	}, 30*SECONDS);
});

describe('Ascenda retrieve hotel room detail', () => {
	// Define a test case
	it('Test getting available hotel rooms from ascenda api', async () => {
        try{
            const today = new Date();
            const start = parseDate(new Date(today.setDate(today.getDate() + 5)));
            const end = parseDate(new Date(today.setDate(today.getDate() + 3)));
            const data = await retrieveAvailableHotelRooms(
                "diH7",
                "WD0M",
                start,
                end,
                "en_US",
                "SGD",
                "SG",
                "2",
                "1"
            )
            assert(data.completed);
        }
        catch(err){
            assert(false);
        }
	}, 30*SECONDS);
});