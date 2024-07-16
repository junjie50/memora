//File sets up and starts the server. (If can handle everything, no need app.js)
//Includes the necessary configurations and middleware to handle incoming requests.

// import connectDB from './config/db_memora';

// connectDB()

const express = require('express');
const cors = require('cors');
const connectMongoDB = require('./config/db_memora');
const memberRegisterRoute = require('./routes/MemberRegister');
const memberLoginRoute = require('./routes/MemberLogin');
const memberUpdateProfileRoute = require('./routes/MemberUpdateProfile');

const app = express();
connectMongoDB();

// CORS middleware, ensure your backend API allows cross-origin requests if the frontend and backend are running on different origins.
app.use(cors());

// const uri = "mongodb+srv://qihengchang1014:nmntY6pkVbZ9QfdV@memoracluster.nzggb9c.mongodb.net/?retryWrites=true&w=majority&appName=MemoraCluster"
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// app.use(json());

// app.post('/register', async (req, res) => {
//     const { title, firstName, lastName, countryCode, phoneNumber, email, password } = req.body;
//     try {
//         await client.connect();
//         const database = client.db('MemoraCluster');
//         const collection = database.collection('Members');
        
//         const newMember = {
//             title,
//             firstName,
//             lastName,
//             countryCode,
//             phoneNumber,
//             email,
//             password
//         };

//         const result = await collection.insertOne(newMember);

//         res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Internal server error' });
//     } finally {
//         await client.close();
//     }
// });

// app.listen(port, () => {
//     console.log(`Server running at http://localhost:${port}`);
// });

app.use(express.json());
app.use('/api', memberRegisterRoute);
app.use('/api/login',memberLoginRoute)
app.use('/api', memberUpdateProfileRoute);
// app.use('/api/updateProfile',memberUpdateProfileRoute)

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));