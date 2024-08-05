const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const {app, server} = require('../server')
const Booking = require('../models/Booking')
const Member = require('../models/Member')
const Transaction = require('../models/Transaction')
const {connectMongoDB, disconnectMongoDB} = require("../config/db_memora");
const {compareDict} = require("../utils/modelUtils");
var assert = require('assert');

describe('Booking Route Integration Testing.', () => {
    const api = supertest(app); 
    beforeAll(async () => {
      await connectMongoDB();
      await Booking.deleteMany({}).exec();
      await Member.deleteMany({}).exec();
      await Transaction.deleteMany({}).exec();
    }, 10000);
  
    afterAll(async() => {
      await Booking.deleteMany({}).exec();
      await Member.deleteMany({}).exec();
      await Transaction.deleteMany({}).exec();
      await disconnectMongoDB();
      server.close();
    }, 10000)

    describe("Able to make booking with valid authorization.", () => {
        it('Able to make booking and retrieve with valid authorization.', async () => {
            const initialMember = 
            {
                username: "junjie50",
                title: "mr",
                firstName: "junjie",
                lastName: "cai",
                password: "123456",
                email: "junjie50@@hotmail.com",
                phoneNumber: "96650175",
                address: "Upper Changi"
            };

            const credentials = {
                username: "junjie50",
                password: "123456"
            };

            const booking = {
                "totalPayment" : 1234.45,
                "creditCardNumber": "32424324432422342",
                "cardExpiryDate" : "07/26",
                "cvc": 236,
                "destinationID": "diH7",
                "specialRequest":  "Dog service",
                "numberOfAdults": 3,
                "numberOfChildren": 2,
                "numberOfNights": 2,
                "startDate": "2024-03-34",
                "endDate": "2024-03-36",
                "rooms": ["dsaf", "1231"]
            };
      
            // user registered 
            await api
                .post('/api/users')
                .send(initialMember)
                .expect(201)
                .expect('Content-Type', /application\/json/);
        
            // user login 
            const res = await api
                .post('/api/users/login')
                .send(credentials)
                .expect(200)
                .expect('Content-Type', /application\/json/);

            const token = res.body.token;
        
            // user failed to give Bearer token
            await api
                .post('/api/bookings')
                .send(booking)
                .expect(401)
                .expect('Content-Type', /application\/json/);
            
        
            // user gives valid autorization token
            const savedBooking = await api
                .post('/api/bookings')
                .set({Authorization: `Bearer ${token}`})
                .send(booking)
                .expect(201)
                .expect('Content-Type', /application\/json/)
            

            // user does not gives valid autorization token
            const invalidBooking = await api
                .get(`/api/bookings/${savedBooking.id}`)
                .send(booking)
                .expect(401)
                .expect('Content-Type', /application\/json/);
            
            
            // user gives valid autorization token
            const resBooking = await api
            .get(`/api/bookings/${savedBooking.id}`)
            .set({Authorization: `Bearer ${token}`})
            .send(booking)
            .expect(401)
            .expect('Content-Type', /application\/json/);

            const validBooking = resBooking.body;

            assert(compareDict(validBooking, booking));
        });
    });
});