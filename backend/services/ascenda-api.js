// services/ascenda-api.js
const axios = require('axios');
const redis = require('redis');
const AppError = require('../utils/appError');

const ascendaAPI = "https://hotelapi.loyalty.dev"
const formatURL = (endpoint) => {
    return ascendaAPI + endpoint;
} 

// All available rooms according to condition
exports.retrieveAvailableHotels =  async (destination_id, checkin, checkout, lang, currency, country_code, guests,partner_id) => {
    var res;
    try {
        for(var i = 0; i < 6; i++) {
            var res = await axios({
                method:"get",
                url: formatURL("/api/hotels/prices?"),
                retry:3,
                retryDelay: 300,
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
            }, i * 3000)
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
        for(var i = 0; i < 6; i++) {
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
            }, i * 3000)
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
exports.retrieveHotelsByDestinationID = (destination_id ) => {
    try {
        return axios({
            method:"get",
            url:formatURL("/api/hotels?"),
            params: {
                destination_id: destination_id,// YYYY-MM-DD
            },
        }).then((response) => {
            return response.data;
        })
    }
    catch(exception) {
        throw(exception);
    }
}

// Return static hotel details
exports.retrieveStaticHotelDetailByHotelID = (hotel_id ) => {
    try {
        return axios({
            method:"get",
            url:formatURL(`/api/hotels/${hotel_id}`),
        }).then((response) => {
            return response.data;
        })
        
    }
    catch(exception) {
        throw(exception);
    }
}