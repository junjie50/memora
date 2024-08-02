import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

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


const BASE_URL = 'https://memora-backend-2eebe428f36a.herokuapp.com';


export const getCookie = (name) => {
    const value = `; ${document.cookie}`; //retrieves all cookies stored in the document as a single string. document.cookie returns a string of all cookies, each separated by a semicolon and a space. By adding a leading semicolon and space (; ), the function ensures that even the first cookie in the list will be matched correctly in the next step.
    const parts = value.split(`; ${name}=`); // splits the value string into an array of substrings
    if (parts.length === 2) return parts.pop().split(';').shift(); //If the parts array has exactly two elements, it means the target cookie exists in the document. The length will be 2 if the split operation finds exactly one occurrence of ; 
    //parts.pop() retrieves the last element of the parts array, which contains the cookie's value and possibly other cookies following it.
    return null; //if the Cookie is Not Found:
}

export const useCheckAuthentication = () =>{
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => { //need integrate as a method call
        const token = getCookie('token');
        if (token) {
            axios.get(`${BASE_URL}/api/users/${token}`,{
                headers:{
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    setAuthenticated(true);
                    setUser(response.data);
                })
                .catch(error => {
                    console.error('Authentication failed', error);
                    setAuthenticated(false);
                    navigate("/login"); // Redirect to login page if not authenticated
                });
        } else {
            navigate("/login"); // Redirect to login page if no token
        }
    }, [navigate]);
    
    return {authenticated,user};
}

export async function submitBookingDetails(bookingData, token, userId, navigate) {
    try {
        const response = await axios.post(`${BASE_URL}/api/bookings`, bookingData, {
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
            }
        });

        if (response.status === 201) {
            navigate("/bookingCompleted", {
                state: { formData: bookingData }
            });
        } else {
            alert('Failed to complete booking. Please try again.');
        }        
    } catch (error) {
        console.error('Booking failed:', error.toJSON());
        console.error('Error submitting booking details:', error);
    }
};

// export function displayBookingPage() {

// }

// export function validatesBookingDetails(memberID, memberName, memberEmailAddress, memberPhoneNumber, specialRequest, creditCardNumber, cardExpiryDate, billingAddress) {

// }

// export function validatesBookingDetails(memberID, memberName, memberEmailAddress, memberPhoneNumber, specialRequest, creditCardNumber, cardExpiryDate, billingAddress) {

// }

// export function displayBookingSummary(bookingID, bookingStatus) {

// }

// export function displayBookingInvalid() {

// }

// export function selectConfirmBooking() {

// }

// export function displayBookingSuccessful(bookingStatus) {

// }
// export function displayBookingFailed() {

// }



