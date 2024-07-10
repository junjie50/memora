//Setting up and managing the database connection

const {MongoClient} = require('mongodb') //mongoClient is to connect to mongodb

async function main(){
    //Atlas (a fully managed mongodb service)
    const uri = "mongodb+srv://demo:abcd1234@cluster0.3guu5zg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

    const client = new MongoClient(uri);

    try{
        await client.connect(); //await: block the further action until the operation has completed
        // await upsertListingByTitle(client,"NewMovieByUpserting",{title:"NewMovieByUpserting", type:"movie",year:2030});
        // await deleteListingByTitle(client,"NewMovieByUpserting");
        // await updateListingByTitle(client,"NewMovieNameMike",{type:"updatedMovieMike",year:2003});
        await findOneListingByTitle(client, "NewMovieNameMike"); //insertMany() example 24:30
        // await listDataBases(client);
        // await createListing(client, {
        //     title: "NewMovieNameMike",
        //     type: "movieM",
        //     year: 2003
        // })
    //     await createMultipleListings(client, [ //each fields have to be different
    //         {
    //             title: "NewMovieName3",
    //             type: "movie3",
    //             year: 2025
    //         },
    //         {
    //             title: "NewMovieName4",
    //             type: "movie4",
    //             year: 2026
    //         }
    //     ]);
    } catch (e){
        console.error(e);
    } finally{
        await client.close();
    }   
}

main().catch(console.error);

async function findOneListingByTitle(client, titleOfListing){
    const result = await client.db("sample_mflix").collection("movies").findOne({title:titleOfListing});
    if (result) {
        console.log(`Found a listing in the collection with the name '${titleOfListing}'`);
        console.log(result);
    } else{
        console.log(`No listings found with the name '${titleOfListing}'`)
    }
}

async function updateListingByTitle(client, titleOfListing, updatedListing){
    const result = await client.db("sample_mflix").collection("movies").updateOne({title:titleOfListing},{$set:updatedListing});
    console.log(`${result.matchedCount} document (s) matched the query criteria`);
    console.log(`${result.modifiedCount} documents was/were updated`);
}

//upsert - when true: can create a new document if no document matches the query
async function upsertListingByTitle(client, titleOfListing, updatedListing){
    const result = await client.db("sample_mflix").collection("movies").updateOne({title:titleOfListing},{$set:updatedListing},{upsert:true});
    console.log(`${result.matchedCount} document(s) matched the query criteria (s):`);
    if (result.upsertedCount>0) {
        console.log(`1 document was inserted with the id ${result.upsertedId}`);
    } else{
        console.log(`${result.modifiedCount} document(s) was/were updated`);
    }

}

async function deleteListingByTitle(client, titleOfListing){
    const result = await client.db("sample_mflix").collection("movies").deleteOne({title:titleOfListing});
    console.log(`${result.deletedCount} document(s) was/were deleted`);
}

async function createMultipleListings(client, newListings){
    const result = await client.db("sample_mflix").collection("movies").insertMany(newListings);
    console.log(`${result.insertedCount} new listing created with the following id (s):`);
    console.log(result.insertedIds);
}

async function createListing(client, newListing){
    const result = await client.db("sample_mflix").collection("movies").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertId}`);
}

async function listDataBases(client){ //list information in DB
    const databaseList = await client.db().admin().listDatabases();
    console.log("Databases:");
    databaseList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    });
}
