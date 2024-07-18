import axios from 'axios';

// + displayHotelDetails(hotelID:string): void)

export async function displayHotelDetails(hotelID, token) {
    try {
        const response = await axios.get(`/api/hotels/${hotelID}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching hotel details:', error);
    }
}
