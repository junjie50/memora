const {compareDict} = require("../../utils/modelUtils");
const {getTokenFrom} = require("../../utils/tokenUtils");
const {parseDate} = require("../../utils/dateUtils");
const {retrieveAvailableHotels, retrieveAvailableHotelRooms, retrieveHotelsByDestinationID,
    retrieveStaticHotelDetailByHotelID
} = require("../../services/ascenda-api");
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
	}, 50*SECONDS);
});

describe('Ascenda retrieve avilable hotel room detail', () => {
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
	}, 50*SECONDS);
});

describe('Ascenda retrieve hotel informations in a destination', () => {
	// Define a test case
	it('Test enter valid destination id', async () => {
        try{
            const data = await retrieveHotelsByDestinationID(
                "WD0M"
            )
            assert(data);
            assert(data.length > 0);
        }
        catch(err){
            assert(false);
        }
	}, 50*SECONDS);

    it('Test enter invalid destination id', async () => {
        try{
            const data = await retrieveHotelsByDestinationID(
                "WDsdf"
            )
            assert(data);
            assert(data.length === 0);
        }
        catch(err){
            assert(false);
        }
	}, 50*SECONDS);
});

describe('Ascenda retrieve hotel room static information for a certain hotel.', () => {
	// Define a test case
	it('Test getting valid detail', async () => {
        try{
            const data = await retrieveStaticHotelDetailByHotelID(
                "FMaW"
            )
            assert(data);
            assert(data.id === "FMaW");
        }
        catch(err){
            assert(false);
        }
	}, 50*SECONDS);

    // Define a test case
	it('Test entering invalid hotel id', async () => {
        try{
            const data = await retrieveStaticHotelDetailByHotelID(
                "FM"
            )
            assert(Object.keys(data).length === 0) ;
        }
        catch(err){
            assert(false);
        }
	}, 50*SECONDS);
});