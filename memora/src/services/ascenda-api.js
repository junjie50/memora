// services/ascenda-api.js
import axios from 'axios';
// const ascendaAPI = "https://hotelapi.loyalty.dev";
const BASE_URL = 'https://memora-backend-2eebe428f36a.herokuapp.com';

// All available rooms according to condition
export function retrieveAvailableHotels(destination_id, checkin, checkout, lang, currency, country_code, guests,partner_id) {
    // const BASE_URL = 'https://localhost:5001';
    try {
        return axios({
            method:"get",
            url:`${BASE_URL}/api/hotels/prices?`,
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
            url:`${BASE_URL}/api/hotels/${hotel_id}price?`,
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
            url:`${BASE_URL}/api/hotels?`,
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
            url:`${BASE_URL}/api/hotels/${hotel_id}`,
            })
    }
    catch(exception) {
        console.error(exception);
    }
}


// putting this here bcos i cant seem to link retrieveStaticHotelDetailByHotelID to ViewHotelDetails.js so im using my own
export const fetchStaticHotelData = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/api/hotels/${id}`);
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