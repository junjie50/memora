const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../server')
const Member = require('../models/Member')
const {connectMongoDB, disconnectMongoDB} = require("../config/db_memora");
var assert = require('assert');



describe('Member Route Integration Testing. register, authenticate, retrieve by token.', () => {
  it('Integration testing', async () => {
    const api = supertest(app); 
    const initialMember = [
      {
          username: "junjie50",
          title: "mr",
          firstName: "junjie",
          lastName: "cai",
          password: "123456",
          email: "junjie50@@hotmail.com",
          phoneNumber: "96650175",
          address: "Upper Changi"
        },
        {
          username: "johnny50",
          title: "mr",
          firstName: "jonny",
          lastName: "Tan",
          password: "12345678",
          email: "john50@@hotmail.com",
          phoneNumber: "12341234",
          address: "Upper Changi"
      }
    ]
    const credentials = [{
        username: "junjie50",
        password: "123456"
      },
      {
        username: "johnny50",
        password: "12345678"
      }
    ]
    
    const wrongcredentials = {
      username: "junjie50",
      password: "12346"
    }

    // user registered 
    await api
      .post('/api/users')
      .send(initialMember[0])
      .expect(201)
      .expect('Content-Type', /application\/json/)

    // user login 
    await api
      .post('/api/users/login')
      .send(credentials[0])
      .expect(200)
      .expect('Content-Type', /application\/json/)

    // user failed to
    await api
      .post('/api/users/login')
      .send(wrongcredentials)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  });

  it('the user be registered, login, retrieved by token', async () => {
    const api = supertest(app); 
    const initialMember = [
      {
          username: "junjie50",
          title: "mr",
          firstName: "junjie",
          lastName: "cai",
          password: "123456",
          email: "junjie50@@hotmail.com",
          phoneNumber: "96650175",
          address: "Upper Changi"
        },
        {
          username: "johnny50",
          title: "mr",
          firstName: "jonny",
          lastName: "Tan",
          password: "12345678",
          email: "john50@@hotmail.com",
          phoneNumber: "12341234",
          address: "Upper Changi"
      }
    ]
    const credentials = [{
        username: "junjie50",
        password: "123456"
      },
      {
        username: "johnny50",
        password: "12345678"
      }
    ]
    
    const wrongcredentials = {
      username: "junjie50",
      password: "12346"
    }

    await api
        .post('/api/users')
        .send(initialMember[1])
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const authentication = await api
      .post('/api/users/login')
      .send(credentials[1])
      .expect(200)
      .expect('Content-Type', /application\/json/);
    
    const user = await api
    .get(`/api/users/${authentication.body.token}`)
    .expect(200)
    .expect('Content-Type', /application\/json/);

    assert(user.body.username === initialMember[1].username);
  })


});