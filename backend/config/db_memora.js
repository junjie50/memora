// //Configuration for connecting to MongoDB.

// const {MongoClient} = require('mongodb')

// //https://cloud.mongodb.com/v2/668e7133bf1a45356ff88220#/overview
// async function main(){
//     //Memora Cluster
//     const uri = "mongodb+srv://qihengchang1014:nmntY6pkVbZ9QfdV@memoracluster.nzggb9c.mongodb.net/?retryWrites=true&w=majority&appName=MemoraCluster"

//     const client = new MongoClient(uri);

//     try{
//         await client.connect();
//     } catch (e){
//         console.error(e);
//     } finally{
//         await client.close();
//     }   
// }

// module.exports = main;


//connect to database
const mongoose = require('mongoose');
// const live_backend = 'mongodb+srv://qihengchang1014:nmntY6pkVbZ9QfdV@memoracluster.nzggb9c.mongodb.net/memora';
// const local = 'mongodb://127.0.0.1:27017/memora'
const connectMongoDB = async () => {
    try {
        const MONGODB_URI = process.env.NODE_ENV === 'test' 
            ? process.env.TESTDB_URI
            : process.env.DB_URI
        await mongoose.connect(MONGODB_URI);
        
    }
    catch (err) {
        console.error(err.message);
    }
};

const disconnectMongoDB = async () => {
    try {
        await mongoose.connection.close();
    }
    catch (err) {
        console.error(err.message);
    }
}

const clearMongoDB = async () => {
    try {
        await mongoose.connection.db.dropDatabase(); // restart local db for testing.
    }
    catch (err) {
        console.error(err.message);
    }
}

module.exports = {connectMongoDB, disconnectMongoDB, clearMongoDB};
