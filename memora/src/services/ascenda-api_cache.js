// services/ascenda-api.js
import axios from 'axios';
import redis from 'redis';

//Still work on...
//

// Create and connect Redis client
const redisClient = redis.createClient();

redisClient.on('error', (err) => {
  console.error('Redis error:', err);
});

redisClient.on('connect', () => {
  console.log('Connected to Redis');
});

// Cache wrapper function
const cacheWrapper = async (key, fetchFunction) => {
    return new Promise((resolve, reject) => {
      redisClient.get(key, async (err, cachedData) => {
        if (err) return reject(err);
        if (cachedData) {
            console.log(`Cache hit for key: ${key}`);
            return resolve(JSON.parse(cachedData));
        } else {
                try {
                    const data = await fetchFunction();
                    redisClient.setex(key, 3600, JSON.stringify(data)); // Cache for 1 hour
                    return resolve(data);
                } catch (error) {
                    return reject(error);
                }
            }
        });
    });
};
  

// All available rooms according to condition
export const retrieveAvailableHotels = async (destination_id, checkin, checkout, lang, currency, country_code, guests, partner_id) => {
    const cacheKey = `hotels:${destination_id}:${checkin}:${checkout}:${lang}:${currency}:${country_code}:${guests}:${partner_id}`;
    return cacheWrapper(cacheKey, async () => {
        const response = await axios.get('/api/hotels/prices', {
            params: {
                destination_id,
                checkin,
                checkout,
                lang,
                currency,
                country_code,
                guests,
                partner_id,
            }
        });
        return response.data;
    });
};

// available hotel room details in a given hotel.
export const retrieveAvailableHotelRooms = async (hotel_id, destination_id, checkin, checkout, lang, currency, country_code, guests,partner_id) => {
    const cacheKey = `hotelRooms:${hotel_id}:${destination_id}:${checkin}:${checkout}:${lang}:${currency}:${country_code}:${guests}:${partner_id}`;
    return cacheWrapper(cacheKey, async () => {
        const response = await axios.get(`/api/hotels/${hotel_id}/price`, {
            params: {
                destination_id,
                checkin,
                checkout,
                lang,
                currency,
                country_code,
                guests,
                partner_id,
            }
        });
        return response.data;
    });
}

// All hotels in a destination
export const retrieveHotelsByDestinationID = async (destination_id) => {
    const cacheKey = `hotelsByDestination:${destination_id}`;
    return cacheWrapper(cacheKey,async()=>{
        const response = await axios.get('/api/hotels?',{
            params:{
                destination_id
            }
        });
        return response.data;
    });
};

// Fetch static hotel details
export const retrieveStaticHotelDetailByHotelID = async (hotel_id) => {
    const cacheKey = `hotelDetails:${hotel_id}`;
    return cacheWrapper(cacheKey, async () => {
        const response = await axios.get(`/api/hotels/${hotel_id}`);
        return response.data;
    });
};


// putting this here bcos i cant seem to link retrieveStaticHotelDetailByHotelID to ViewHotelDetails.js so im using my own
// Fetch static hotel data by ID
export const fetchStaticHotelData = async (id) => {
    try {
      const response = await fetch(`/api/hotels/${id}`);
      console.log('Response:', response);
  
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error('Unexpected response:', text);
        console.error('Response status:', response.status);
        console.error('Response headers:', Object.fromEntries(response.headers.entries()));
        throw new Error(`Expected JSON, but received ${contentType || 'unknown'} content-type. Status: ${response.status}`);
      }
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching hotel data:', error);
      throw error;
    }
};