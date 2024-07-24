import axios from 'axios';

// + submitMemberDetails(memberName: string, memberEmailAddress: string, memberPhoneNumber: string, memberAddress: string, memberPassword: string) : void
// + validateMemberDetails(memberName: string, memberEmailAddress: string, memberPhoneNumber: string, memberAddress: string, memberPassword: string) : bool
// + validationFailed() : void
// + displaySuccessfulMessage(memberID: string) : void
// + displayUnsuccessfulMessage() : void

const BASE_URL = 'https://memora-backend-2eebe428f36a.herokuapp.com';

export const submitMemberDetails = async (formData, navigate) => {
    try {
        const res = await axios.post(`${BASE_URL}/api/users`, formData);
        displaySuccessfulMessage(res.data.id, navigate);
    } catch (err) {
        console.error(err.response ? err.response.data : err.message);
        displayUnsuccessfulMessage(err.response ? err.response.data.message : err.message);
    }
};

export const validateMemberDetails = (formData) => {
    const { firstName, lastName, phoneNumber, email, password, username, address } = formData;
    if (!firstName || !lastName || !phoneNumber || !email || !password || !username || !address) {
        return false;
    }
    // Can add more validations if needed
    return true;
};

export const validationFailed = () => {
    alert('Please fill in all required fields.');
};

export const displaySuccessfulMessage = (memberID, navigate) => {
    alert(`Registration successful. Your member ID is ${memberID}`);
    navigate("/login");
};

export const displayUnsuccessfulMessage = (message) => {
    alert(`Registration failed: ${message}`);
};