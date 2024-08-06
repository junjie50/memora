const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const {app, server} = require('../../server')
const Booking = require('../../models/Booking')
const Member = require('../../models/Member')
const {connectMongoDB, disconnectMongoDB} = require("../../config/db_memora");
const {compareDict} = require("../../utils/modelUtils");
const {parseDate} = require("../../utils/dateUtils");
var assert = require('assert');

const SECONDS = 1000;

describe('Hotel Route Integration Testing.', () => {
    const api = supertest(app); 
    beforeAll(async () => {
      await connectMongoDB();
    });
  
    beforeEach(async () => {

    })
  
    afterAll(async() => {
      await disconnectMongoDB();
      server.close();
    })
    describe("Able to make API calls to retrieve the data", () => {
        it('Get available hotel by destination id.', async () => {
            const today = new Date();
            const start = parseDate(new Date(today.setDate(today.getDate() + 5)));
            const end = parseDate(new Date(today.setDate(today.getDate() + 10)));
            const data = {
                destination_id: "WD0M",
                checkin: start,
                checkout: end,
                lang: "en_US",
                currency: "SGD",
                country_code: "SG",
                guests: "2",
                partner_id: "1"
            }

            const received_data = await api
                .get('/api/hotels/prices?')
                .query(data)
                .expect(200)
                .expect('Content-Type', /application\/json/);
            
            assert(received_data.body.completed);
            assert(received_data.body.hotels.length > 0);
        }, 30*SECONDS);

        it('Get available hotel rooms by id.', async () => {
            const today = new Date();
            const start = parseDate(new Date(today.setDate(today.getDate() + 5)));
            const end = parseDate(new Date(today.setDate(today.getDate() + 10)));
            const hotel_id = "FMaW";
            const data = {
                destination_id: "WD0M",
                checkin: start,
                checkout: end,
                lang: "en_US",
                currency: "SGD",
                country_code: "SG",
                guests: "2",
                partner_id: "1"
            }

            const received_data = await api
                .get(`/api/hotels/${hotel_id}/price?`)
                .query(data)
                .expect(200)
                .expect('Content-Type', /application\/json/);
            
            assert(received_data.body.completed);
            assert(received_data.body.rooms.length > 0);
        }, 30*SECONDS);

        it('Get available hotel static details by hotel id.', async () => {
            const hotel_id = "0KmN";

            const received_data = await api
                .get(`/api/hotels/${hotel_id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/);


            const received_data2 = await api
                .get(`/api/hotels/${hotel_id}`)
                .expect(200)
                .expect('Content-Type', /application\/json/);
            
            // Ensure cache is working.
            assert(compareDict(received_data.body, received_data2.body));
        }, 30*SECONDS);

        it('Get all hotels by destination id.', async () => {
            const destination_id = "l0RE";
            const data = {
                destination_id:destination_id
            }

            const received_data = await api
                .get(`/api/hotels`)
                .query(data)
                .expect(200)
                .expect('Content-Type', /application\/json/);


            const received_data2 = await api
                .get(`/api/hotels`)
                .query(data)
                .expect(200)
                .expect('Content-Type', /application\/json/);
            
            assert(received_data.body.length > 0);
            assert(received_data2.body.length > 0);
            // Ensure cache is working.
            assert(compareDict(received_data.body, received_data2.body));
        }, 30*SECONDS);
    });
});