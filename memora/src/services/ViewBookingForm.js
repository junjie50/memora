import axios from 'axios';
// + submitViewBooking(bookingID: string)
// + displayBookingDetails(Booking: booking)

const BASE_URL = 'https://memora-backend-2eebe428f36a.herokuapp.com';

export async function submitViewBooking(bookingID, token) {
    try {
        const response = await axios.get(`/api/bookings/${bookingID}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error viewing booking:', error);
    }
}

export function displayBookingDetails(booking) {

}