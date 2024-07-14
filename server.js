//File sets up and starts the server. (If can handle everything, no need app.js)
//Includes the necessary configurations and middleware to handle incoming requests.

// import connectDB from './config/db_memora';

// connectDB()

const express = require('express');
const cors = require('cors');
// const bodyParser = require('body-parser');
const connectMongoDB = require('./config/db_memora');
// const { MongoClient } = require('mongodb');
const memberRegisterRoute = require('./routes/MemberRegister');

const app = express();
connectMongoDB();
// const port = 3001;

// CORS middleware
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

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));