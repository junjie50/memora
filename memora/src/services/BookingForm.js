import axios from 'axios';

// + selectBooknow(): void
// + submitBookingDetails(memberID: string, memberName: string, memberEmailAddress: string, memberPhoneNumber: string, specialRequest: string, creditCardNumber: string, cardExpiryDate: date, billingAddress: string): void
// + displayBookingPage(): void
// + submitBookingDetails(memberID: string, memberName: string, memberEmailAddress: string, memberPhoneNumber: string, specialRequest: string, creditCardNumber: string, cardExpiryDate: date, billingAddress: string): void
// + validatesBookingDetails(memberID: string, memberName: string, memberEmailAddress: string, memberPhoneNumber: string, specialRequest: string, creditCardNumber: string, cardExpiryDate: date, billingAddress: string): bool
// + displayBookingSummary(bookingID: string, bookingStatus: string) : void
// + displayBookingInvalid()
// + selectConfirmBooking() : void
// + displayBookingSuccessful(bookingStatus: string) : void
// + displayBookingFailed() : void

export function selectBooknow(memberID, password ) {
    
}

export async function submitBookingDetails(paymentID, specialRequest, numberOfAdults, numberOfChildren, numberOfNights, startDate, endDate, rooms, token) {
    try {
        const response = await axios.post('/api/bookings', {
            paymentID,
            specialRequest,
            numberOfAdults,
            numberOfChildren,
            numberOfNights,
            startDate,
            endDate,
            rooms
        }, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json'
            }
        });
        console.log(response.data);
    } catch (error) {
        console.error('Error submitting booking details:', error);
    }
}

export function displayBookingPage() {

}

export function validatesBookingDetails(memberID, memberName, memberEmailAddress, memberPhoneNumber, specialRequest, creditCardNumber, cardExpiryDate, billingAddress) {

}

export function validatesBookingDetails(memberID, memberName, memberEmailAddress, memberPhoneNumber, specialRequest, creditCardNumber, cardExpiryDate, billingAddress) {

}

export function displayBookingSummary(bookingID, bookingStatus) {

}

export function displayBookingInvalid() {

}

export function selectConfirmBooking() {

}

export function displayBookingSuccessful(bookingStatus) {

}
export function displayBookingFailed() {

}



