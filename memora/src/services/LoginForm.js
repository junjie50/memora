import axios from 'axios';

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

// export async function submitLoginDetails(memberID, password) {
//     try {
//         const response = await axios.post('/api/users/login', {
//             username: memberID,
//             password: password
//         });
//         return response.data.token;
//     } catch (error) {
//         console.error('Error logging in:', error);
//         return null;
//     }
// }

// export function displayInvalidLogin(accessToken ) {
    
// }

// export function submitLoginDetails(memberID, password ) {
    
// }



