// services/ascenda-api.js
const axios = require('axios');
const ascendaAPI = "https://hotelapi.loyalty.dev"

const formatURL = (endpoint) => {
    return ascendaAPI + endpoint;
}
// All available rooms according to condition
exports.retrieveAvailableHotels =  async (destination_id, checkin, checkout, lang, currency, country_code, guests,partner_id) => {
    try {
        return axios({
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
            }).then((response) => {
                return response.data;
            })
    }
    catch(exception) {
        console.log(exception);
        throw(exception);
    }
}

// available hotel room details in a given hotel.
exports.retrieveAvailableHotelRooms = async (hotel_id, destination_id, checkin, checkout, lang, currency, country_code, guests,partner_id) => {
    try {
        return axios({
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
        }).then((response) => {
            return response.data;
        })
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


// putting this here bcos i cant seem to link retrieveStaticHotelDetailByHotelID to ViewHotelDetails.js so im using my own
exports.fetchStaticHotelData = async (id) => {
    try {
      const response = await fetch(`/api/hotels/${id}`);
      console.log('Response:', response)
      
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