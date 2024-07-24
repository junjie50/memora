const { test, after, beforeEach } = require('node:test');
const mongoose = require('mongoose');
const supertest = require('supertest');
const Member = require('../models/Member');
const Booking = require('../models/Booking');
const RoomBooking = require('../models/RoomBooking');
const Transaction = require('../models/Transaction');
const {compareDict} = require("../utils/modelUtils");
var assert = require('assert');

const {connectMongoDB, disconnectMongoDB} = require("../config/db_memora");

describe('Member Model Testing', () => {
	beforeAll(async () => {
		await connectMongoDB();
	})

	afterAll(async () => {
		await disconnectMongoDB();
	})

    it('Test adding member into database and retrieve', async () => {
		testMember = {
			username: "junjie50",
			title: "mr",
			firstName: "junjie",
			lastName: "cai",
			password: "123456",
			email: "junjie50@@hotmail.com",
			phoneNumber: "96650175",
			address: "Upper Changi"
		}

		const newMember = new Member(testMember);
		await newMember.save();
		const savedMember = await Member.findOne({ username:testMember.username });
      	assert(compareDict(testMember, savedMember));

		testMember2 = {
			username: "junjie60",
			title: "mr",
			firstName: "junjie",
			lastName: "cai",
			password: "123456",
			email: "junjie56@@hotmail.com",
			phoneNumber: "96650175",
			address: "Upper Changi"
		}
		const newMember2 = new Member(testMember2);
		const savedMember2 = await newMember2.save();

		const allMembers = await Member.find({});
		assert(allMembers.length === 2);

		const searchMember2 = await Member.findById(savedMember2.id);
		assert(compareDict(testMember2, searchMember2));
		assert(!compareDict(testMember, searchMember2));
    });
});

describe('Booking Model Testing', () => {
	beforeAll(async () => {
		await connectMongoDB();
	})

	afterAll(async () => {
		await disconnectMongoDB();
	})
	
	it('Test adding a Booking into the database', async () => {
		const testBooking = {
			paymentID: "123456",
			destinationID: "123123",
			memberID: "123123",
			specialRequest:  "cats",
			numberOfAdults: 3,
			numberOfChildren: 2,
			numberOfNights: 3,
			bookingStatus: "Confirmed",
			startDate: "2024-07-18",
			endDate: "2024-07-28",
		}

		const newBooking = new Booking(testBooking);
		await newBooking.save();
		const savedBooking = await Booking.findOne({paymentID: "123456"});
		assert(compareDict(testBooking, savedBooking));
	});
});

describe('RoomBooking Model Testing', () => {
	beforeAll(async () => {
		await connectMongoDB();
	})

	afterAll(async () => {
		await disconnectMongoDB();
	})

	it('Test adding a RoomBooking into the database', async () => {
		const testRoomBooking = {
			bookingID: "123123",
			roomIDs: [
				{
					roomPrice:123120,
					roomName: "room1"
				},
				{
					roomPrice:123,
					roomName: "room2"
				}
			]
		}

		const newRoomBooking = new RoomBooking(testRoomBooking);
		await newRoomBooking.save();
		const savedRoomBooking = await RoomBooking.findOne({bookingID: "123123"});
		assert(compareDict(testRoomBooking, savedRoomBooking));
	});
});

describe('Transaction Model Testing', () => {
	beforeAll(async () => {
		await connectMongoDB();
	})

	afterAll(async () => {
		await disconnectMongoDB();
	})

	// Define a test case
	it('Test adding a Transaction into the database', async () => {
		const testTransaction = {
			paymentID: "123456",
			transactionDate: "2024-06-24",
			totalPayment: 1234.90,
			last4Digit: "1231"
		}
		
		const newTransaction = new Transaction(testTransaction);
		await newTransaction.save();

		const savedTransaction = await Transaction.findOne({paymentID: "123456"});
		assert(compareDict(testTransaction, savedTransaction));
	});
});
