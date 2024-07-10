// services/ascenda-api.js
import axios from 'axios';

// All available rooms according to condition
export function retrieveAvailableHotels(destination_id, checkin, checkout, lang, currency, country_code, guests,partner_id) {
    try {
        return axios({
            method:"get",
            url:"/api/hotels/prices?",
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
    }
    catch(exception) {
        console.error(exception);
    }
}

// available hotel room details in a given hotel.
export function retrieveAvailableHotelRooms(hotel_id, destination_id, checkin, checkout, lang, currency, country_code, guests,partner_id) {
    try {
        return axios({
            method:"get",
            url:`/api/hotels/${hotel_id}price?`,
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
    }
    catch(exception) {
        console.error(exception);
    }
}

// All hotels in a destination
export function retrieveHotelsByDestinationID(destination_id ) {
    try {
        return axios({
            method:"get",
            url:"/api/hotels?",
            params: {
                destination_id: destination_id,// YYYY-MM-DD
            },
            })
    }
    catch(exception) {
        console.error(exception);
    }
}

// Return static hotel details
export function retrieveStaticHotelDetailByHotelID(hotel_id ) {
    try {
        return axios({
            method:"get",
            url:`/api/hotels/${hotel_id}`,
            })
    }
    catch(exception) {
        console.error(exception);
    }
}