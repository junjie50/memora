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



const mongoose = require('mongoose');
// const live_backend = 'mongodb+srv://qihengchang1014:nmntY6pkVbZ9QfdV@memoracluster.nzggb9c.mongodb.net/memora';
// const local = 'mongodb://127.0.0.1:27017/memora'
const connectMongoDB = async () => {
    try {
        const MONGODB_URI = process.env.NODE_ENV === 'test' 
            ? process.env.TESTDB_URI
            : process.env.DB_URI

        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
        if(process.env.NODE_ENV ==='test') {
            mongoose.connection.db.dropDatabase(); //activate to restart local db for testing.
        }
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectMongoDB;
