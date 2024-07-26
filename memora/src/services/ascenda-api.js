// services/ascenda-api.js
import axios from 'axios';
import {cache} from 'react';

const BASE_URL = 'https://memora-backend-2eebe428f36a.herokuapp.com';

const cacheGet = (cacheString) => {
    return caches.open(cacheString).then((cache) => {
        return cache.match(cacheString).then((res) => {
            return res.json().then((data) => {
                return data;
            })
        })
    })
}

const cachePut = async (cacheString, data) => {
    await caches.open(cacheString).then((cache) => {
        cache.put(cacheString, new Response(JSON.stringify(data)));
    })
}

// All available rooms according to condition
export async function retrieveAvailableHotels(destination_id, checkin, checkout, lang, currency, country_code, guests,partner_id) {
    // const BASE_URL = 'https://localhost:5001';
    try {
        const url = `${BASE_URL}/api/hotels/prices?`;
        const params = {
            destination_id: destination_id, 
            checkin: checkin,
            checkout: checkout,
            lang: lang,
            currency: currency,
            country_code: country_code,
            guests: guests,
            partner_id: partner_id
        }
        const cacheString = url + JSON.stringify(params);
        const result = await caches.has(cacheString);
        if(result) {
            return cacheGet(cacheString)
        }
        else {
            var res = await axios({
                method:"get",
                url:url,
                params: params,
            })
            cachePut(cacheString, res);
            return res;
        }
    }
    catch(exception) {
        console.error(exception);
    }
};

// available hotel room details in a given hotel.
export async function retrieveAvailableHotelRooms(hotel_id, destination_id, checkin, checkout, lang, currency, country_code, guests,partner_id) {
    try {
        const url = `${BASE_URL}/api/hotels/${hotel_id}/price?`;
        const params = {
            destination_id: destination_id,// YYYY-MM-DD
            checkin: checkin,
            checkout: checkout,
            lang: lang,
            currency: currency,
            country_code: country_code,
            guests: guests,
            partner_id: partner_id
        };

        const cacheString = url + JSON.stringify(params);
        const result = await caches.has(cacheString);
        console.log(result);
        if(result) {
            return cacheGet(cacheString)
        }
        else{
            var res = await axios({
                method:"get",
                url:url,
                params: params,
            })
            cachePut(cacheString, res);
            return res;
        }
    }
    catch(exception) {
        console.error(exception);
    }
};

// All hotels in a destination
export async function retrieveHotelsByDestinationID(destination_id ) {
    try {
        const url = `${BASE_URL}/api/hotels?`;
        const params = {
            destination_id: destination_id,// YYYY-MM-DD
        };
        const res = await axios({
            method:"get",
            url:url,
            params: params,
        });
        return res;
    }
    catch(exception) {
        console.error(exception);
    }
}

// Return static hotel details
export async function retrieveStaticHotelDetailByHotelID(hotel_id ) {
    try {
        var res = await axios({
            method:"get",
            url:`${BASE_URL}/api/hotels/${hotel_id}`,
        })
        return res;
    }
    catch(exception) {
        console.error(exception);
    }
}
