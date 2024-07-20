//File sets up and starts the server. (If can handle everything, no need app.js)
//Includes the necessary configurations and middleware to handle incoming requests.

// import connectDB from './config/db_memora';

// connectDB()

const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const morgan = require('morgan');
const connectMongoDB = require('./config/db_memora');

const membersRoute = require('./routes/members');
const hotelsRoute = require('./routes/hotels');
const bookingsRoute = require('./routes/bookings');
const roomBookingsRoute = require('./routes/roomBookings');

const tokenUtil = require("./utils/tokenUtil");
const jwt = require('jsonwebtoken');

const errorHandler = require('./controllers/ErrorController');
const AppError = require('./utils/appError');

const app = express();
connectMongoDB();

// CORS middleware
app.use(cors());

// Set security HTTP headers
app.use(helmet());

// Limit request from the same API 
const limiter = rateLimit({
    max: 150,
    windowMs: 60 * 60 * 1000,
    message: 'Too Many Request from this IP, please try again in an hour'
});

app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({
    limit: '15kb'
}));

// Data sanitization against Nosql query injection
app.use(mongoSanitize());

// Data sanitization against XSS(clean user input from malicious HTML code)
app.use(xss());

// Prevent parameter pollution
app.use(hpp());

app.use(express.json());
app.use(morgan('dev'));

// Retrieve token if there is a token.
app.use((req, res, next) => {
    const token = tokenUtil.getTokenFrom(req);
    if(token) {
        const decodedToken = jwt.verify(token, process.env.SECRET);
        if(decodedToken.id) {
            req.headers.memberID = decodedToken.id;
        }
    }
    console.log(req.headers.memberID);
    next();
})

app.use('/api', hotelsRoute);
app.use('/api', membersRoute);
app.use('/api', bookingsRoute);
app.use('/api', roomBookingsRoute);

// handle undefined Routes
app.use('*', (req, res, next) => {
    const err = new AppError(404, 'fail', 'undefined route');
    next(err, req, res, next);
});

app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app;