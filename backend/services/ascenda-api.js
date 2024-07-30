// services/ascenda-api.js
const axios = require('axios');
const AppError = require('../utils/appError');
const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 900, checkperiod: 301, useClones: false});

const ascendaAPI = "https://hotelapi.loyalty.dev"
const formatURL = (endpoint) => {
    return ascendaAPI + endpoint;
} 

// All available rooms according to condition
exports.retrieveAvailableHotels =  async (destination_id, checkin, checkout, lang, currency, country_code, guests,partner_id) => {
    try {
        for(var i = 1; i <= 6; i++) {
            var res = await axios({
                method:"get",
                url: formatURL("/api/hotels/prices?"),
                params: {
                    destination_id: destination_id,
                    checkin: checkin,
                    checkout: checkout,
                    lang: lang,
                    currency: currency,
                    country_code: country_code,
                    guests: guests,
                    partner_id: partner_id
                },
            })
    
            if(res.data.completed) {
                break;
            }

            await setTimeout(function () {
            }, i * 1000)
        }
        if(!res.data.completed) {
            throw(new AppError(503,'error', 'server timeout'));
        }

        return res.data;
    }
    catch(exception) {
        throw(exception);
    }
}

// available hotel room details in a given hotel.
exports.retrieveAvailableHotelRooms = async (hotel_id, destination_id, checkin, checkout, lang, currency, country_code, guests,partner_id) => {
    try {
        for(var i = 1; i <= 6; i++) {
            var res = await axios({
                method:"get",
                url: formatURL(`/api/hotels/${hotel_id}/price?`),
                params: {
                    destination_id: destination_id,// YYYY-MM-DD
                    checkin: checkin,
                    checkout: checkout,
                    lang: lang,
                    currency: currency,
                    country_code: country_code,
                    guests: guests,
                    partner_id: partner_id
                },
            })

            if(res.data.completed) {
                break;
            }
    
            await setTimeout(function () {
            }, i * 1000)
        }
        if(!res.data.completed) {
            throw(new AppError(503,'error', 'server timeout'));
        }

        return res.data;
    }
    catch(exception) {
        throw(exception);
    }
}

// All hotels in a destination
exports.retrieveHotelsByDestinationID = async (destination_id ) => {
    try {
        const cacheString = `/destination/${destination_id}`;
        var cachedPromise = cache.get(cacheString);
        if(cachedPromise) {
            const res = await cachedPromise;
            console.log(res.status);
            if(res.status !== "error") {
                return res.data;
            }
        }

        var res_promise = axios({
            method:"get",
            url:formatURL("/api/hotels?"),
            params: {
                destination_id: destination_id,// YYYY-MM-DD
            },
        });

        cache.set(cacheString, res_promise);
        const res = await res_promise;
        return res.data;
    }
    catch(exception) {
        throw(exception);
    }
}


// Return static hotel details
exports.retrieveStaticHotelDetailByHotelID = async (hotel_id ) => {
    try {
        const cacheString = `/hotels/${hotel_id}`;
        const cachedPromise = cache.get(cacheString);
        if(cachedPromise) {
            const res = await cachedPromise;
            console.log(res.status);
            if(res.status !== "error") {
                return res.data;
            }
        }

        var res_promise = axios({
            method:"get",
            url:formatURL(`/api/hotels/${hotel_id}`),
        })

        cache.set(cacheString, res_promise);
        // console.log("cached promise");
        const res = await res_promise;
        // console.log("getting promise");
        return res.data;
    }
    catch(exception) {
        throw(exception);
    }
}