import express from "express"; // "type"=module
import axios from "axios"; 
import redis from "redis";

/*
The goal is to cache the hotel data retrieved from the API so that 
subsequent requests for the same data can be served from the cache, 
improving performance and reducing the load on the API.
*/

const app = express();
const port = process.env.PORT || 3000;

// redis setup
let redisClient;

(async () => {
    redisClient = redis.createClient();

    redisClient.on("error", (error) => console.error(`Error : ${error}`));

    await redisClient.connect();
    // redisClient = redis.createClient ({
    //     host: 'redis-server',
    //     port: 6379
    // });
    // redisClient.on("error", (error) => console.error('Error : ${error}'));

    app.listen(port, () => {
        console.log(`App listening on port ${port}`) ;
    });
})();

//routes
app.get("/api/hotels/:id",getIdData); //controller:getIdData

//controllers
async function getIdData(reg, res) {
    const id = reg.params.id;
    let results;
    let isCached = false; //to see cached or not

    try {
        const cacheResults = await redisClient.get(id);
        if (cacheResults) { //if has id
            isCached = true;
            results = JSON.parse(cacheResults);
        } else {
            results = await fetchApiData(id); //make request to API
            if (results.length === 0) {
                throw "API returned an empty array";
            }
            
            await redisClient.set(id, JSON.stringify(results),{ // store the data in the Redis cache
                EX:180, //expire second
                NX:true //only see the key if it does not already exist
            }); //turn result to string (redis works key value)
        }
        res.send ({
            fromCache: isCached, 
            data: results,
        });
    } catch (error) {
        console.error (error);
        res.status(404).send("Data unavailable");
    }
}

async function fetchApiData(id) { //if not found in cache, find from outside API
    const apiResponse = await axios.get (
        `https://hotelapi.loyalty.dev/api/hotels/${id}`
    );
    console.log("Request sent to the API");
    return apiResponse.data;
}
