// const { test, after, beforeEach } = require('node:test')
// const mongoose = require('mongoose')
// const supertest = require('supertest')
// const app = require('../server')
// const Hotel = require('../models/Member')
// var assert = require('assert');

// const api = supertest(app);

// test('the hotel can be retrieved', async () => {
//     await api
//       .post('/api/hotels')
//       .send(initialMember[0])
//       .expect(201)
//       .expect('Content-Type', /application\/json/)
//   })
  

// test('the user can be authenticated', async () => {
//   await api
//     .post('/api/users/login')
//     .send(credentials[0])
//     .expect(200)
//     .expect('Content-Type', /application\/json/)
// })

// test('the user cannot be authenticated with wrong password', async () => {
//   await api
//     .post('/api/users/login')
//     .send(wrongcredentials)
//     .expect(401)
//     .expect('Content-Type', /application\/json/)
// })

// test('the user be registered, login, retrieved by token', async () => {
//   await api
//       .post('/api/users')
//       .send(initialMember[1])
//       .expect(201)
//       .expect('Content-Type', /application\/json/)

//   const authentication = await api
//     .post('/api/users/login')
//     .send(credentials[1])
//     .expect(200)
//     .expect('Content-Type', /application\/json/);
  
//   const user = await api
//   .get(`/api/users/${authentication.body.token}`)
//   .expect(200)
//   .expect('Content-Type', /application\/json/);

//   assert(user.body.username === initialMember[1].username);

// })

// after(async () => {
//   await mongoose.connection.close()
// })