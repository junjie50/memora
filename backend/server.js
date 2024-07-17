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

// const bodyParser = require('body-parser');
const connectMongoDB = require('./config/db_memora');
const memberRegisterRoute = require('./routes/MemberRegister');
const memberLoginRoute = require('./routes/MemberLogin');
const memberUpdateProfileRoute = require('./routes/MemberUpdateProfile');

const app = express();
connectMongoDB();
const hotelsRoute = require('./routes/hotels');

const errorHandler = require('./controllers/ErrorController');
const AppError = require('./utils/appError');

// const app = express();
// connectMongoDB();
// const port = 3001;

// CORS middleware, ensure your backend API allows cross-origin requests if the frontend and backend are running on different origins.
app.use(cors());



// const uri = "mongodb+srv://qihengchang1014:nmntY6pkVbZ9QfdV@memoracluster.nzggb9c.mongodb.net/?retryWrites=true&w=majority&appName=MemoraCluster"
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// app.use(json());

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
app.use('/api', memberRegisterRoute);
app.use('/api/login',memberLoginRoute)
app.use('/api', memberUpdateProfileRoute);

// app.use('/api/updateProfile',memberUpdateProfileRoute)
app.use(morgan('dev'));

app.use('/api', hotelsRoute);

// handle undefined Routes
app.use('*', (req, res, next) => {
    const err = new AppError(404, 'fail', 'undefined route');
    next(err, req, res, next);
});

app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

