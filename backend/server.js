//File sets up and starts the server. (If can handle everything, no need app.js)
//Includes the necessary configurations and middleware to handle incoming requests.

import connectDB from './config/db_memora';

connectDB()