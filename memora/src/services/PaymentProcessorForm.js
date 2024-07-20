import axios from 'axios';

// +enterPaymentDetails(): void
// +submitPaymentDetails(): void
// +displayPaymentConfirmation(): void
// +displayPaymentDetails(): void

export function enterPaymentDetails() {

}

export async function submitPaymentDetails(paymentDetails, token) {
    try {
        const response = await axios.post('/api/payments', paymentDetails, { //wait for route
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error submitting payment details:', error);
    }
}

export function displayPaymentConfirmation() {

}

export function displayPaymentDetails() {

}