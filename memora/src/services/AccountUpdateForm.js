import axios from 'axios';
import { useEffect, useState } from 'react';

//+submitUpdatedDetails(member:Member): boolean

const BASE_URL = 'https://memora-backend-2eebe428f36a.herokuapp.com';

export const submitForgotPassword = async (email) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/users/forgotPassword`, { email });
        return response;
    } catch (err) {
        throw err;
    }
};

export const deleteAccount = async (username, token) => {
    try {
      const res = await axios.delete(`${BASE_URL}/api/users/${username}`,{
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
      return res.data;
    } catch (error) {
      throw new Error(error.response ? error.response.data.message : error.message);
    }
};

export const submitUpdatedDetails = async (username, token, updatedDetails) =>{
    try {
        const res = await axios.put(`${BASE_URL}/api/users/${username}`, updatedDetails, {
            headers:{
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return res.data;
    } catch (error) {
        throw new Error(error.response ? error.response.data.message : error.message);
    }
};

export const fetchMemberInfo = async (username, token) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/users/${token}`,{
        headers:{
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
      });
      return response.data;
    } catch (err) {
      throw err;
    }
};


//old email version
// export const submitUpdatedDetails = async (email, updatedDetails) =>{
//     try {
//         const res = await axios.put(`${BASE_URL}/api/users/email/${email}`, updatedDetails);
//         return res.data;
//     } catch (error) {
//         throw new Error(error.response ? error.response.data.message : error.message);
//     }
// };

//old email version
// export const fetchMemberInfo = async (email) => {
//     try {
//         const response = await axios.get(`${BASE_URL}/api/users/email/${email}`);
//         return response.data;
//     } catch (err) {
//         throw err;
//     }
// };



// export const updateMemberProfile = async (email, memberInfo, newPassword) => {
//     // try {
//     //     await axios.put(`${BASE_URL}/api/users/email/${email}`, {
//     //         ...memberInfo,
//     //         password: newPassword
//     //     });
//     // } catch (err) {
//     //     throw err;
//     // }

//     try {
//         const res = await axios.put(`${BASE_URL}/api/users/email/${email}`, updatedDetails);
//         return res.data;
//     } catch (error) {
//         throw new Error(error.response ? error.response.data.message : error.message);
//     }
// };