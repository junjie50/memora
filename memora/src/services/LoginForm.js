import axios from 'axios';
import { useEffect, useState } from 'react';

// + submitLoginDetails(memberID:string, password:string): void
// + displayInvalidLogin(accessToken:boolean): string
// + submitLoginDetails(memberID:string, password:string): void
// + validateLoginDetails(memberID:string, password:string): boolean

const BASE_URL = 'https://memora-backend-2eebe428f36a.herokuapp.com';

export async function fetchUserByToken(token){
    try {
        const response = await axios.get(`${BASE_URL}/api/users/${token}`, {
        });
        return response.data;
    } catch (error) {
        console.error('Error logging in:', error);
        return null;
    }
}

export const getCookie = (name) => {
    const value = `; ${document.cookie}`; //retrieves all cookies stored in the document as a single string. document.cookie returns a string of all cookies, each separated by a semicolon and a space. By adding a leading semicolon and space (; ), the function ensures that even the first cookie in the list will be matched correctly in the next step.
    const parts = value.split(`; ${name}=`); // splits the value string into an array of substrings
    if (parts.length === 2) return parts.pop().split(';').shift(); //If the parts array has exactly two elements, it means the target cookie exists in the document. The length will be 2 if the split operation finds exactly one occurrence of ; 
    //parts.pop() retrieves the last element of the parts array, which contains the cookie's value and possibly other cookies following it.
    return null; //if the Cookie is Not Found:
}

export const useCheckAuthentication = () =>{
    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    const [error, setError] = useState(null); // Add error state
    useEffect(() => {
        const token = getCookie('token');
        if (token) {
            const authenticateUser = async () => {
                try {
                    const response = await axios.get(`${BASE_URL}/api/users/${token}`);
                    // console.log('response data',response.data);
                    setUser(response.data);
                    setAuthenticated(true);
                } catch (err) {
                    console.error('Authentication failed', err);
                    setError('Failed to retrieve from token'); // Set error state on failure
                    setAuthenticated(false);
                }
            };
            authenticateUser();
        }
    }, []);

    return {user,authenticated,error};
}

export const validateLoginDetails = (formData) => {
    const { email, password } = formData;
    if (!email || !password) {
        return false;
    }
    return true;
};

export const submitLoginDetails = async (formData) => {
    try {
        // const response = await axios.post(`${BASE_URL}/api/users/login`,formData);
        // displaySuccessfulMessage(response.data.token);
        const res = await axios.post(`${BASE_URL}/api/users/login`, formData);
        return res;
    } catch (error) {
        // console.error('Error logging in:', err);
        // displayUnsuccessfulMessage(err.response ? err.response.data.message : err.message);
        throw new Error(error.response ? error.response.data.message : error.message);

    }
}


export const displayUnsuccessfulMessage = (message) => {
    alert(`Login failed: ${message}`);
};


export const displaySuccessfulMessage = (message)=> {
    alert(`Login successful. ${message}`);
};

// export const validationFailed = () => {
//     alert('Please fill in all required fields.');
// };


