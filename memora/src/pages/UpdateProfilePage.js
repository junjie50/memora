import Navbar from '../components/Navbar.js';
import './UpdateProfilePage.css'
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation} from "react-router-dom";
import profile_image from '../assets/profile_image.png';
import axios from 'axios';
import { fetchMemberInfo, submitUpdatedDetails, deleteAccount } from '../services/AccountUpdateForm.js';
import { getCookie, useCheckAuthentication } from '../services/LoginForm.js';

function UpdateProfilePage(){
    const navigate = useNavigate(); 
    // old email version need comment out
    // const location = useLocation();
    // const email = location.state?.email;
    const [newPassword, setNewPassword] = useState('');
    const [memberInfo, setMemberInfo] = useState({
        title: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
        username:'',
        address:''
    });

    // return the member to current page
    const location = useLocation();
    const from = location.state?.from || "/";
    

    // old version with email
    // useEffect(() => {
    //     const fetchInfo = async () => {
    //         try {
    //             // const res = await axios.get(`http://localhost:5001/api/users/email/${email}`); //use the email passed from forget password state
    //             // console.log(res.data);
    //             // setMemberInfo(res.data); //api return member object

    //             const data = await fetchMemberInfo(email);
    //             console.log(data);
    //             setMemberInfo(data);
    //         } catch (err) {
    //             console.error(err.message);
    //         }
    //     };
    //     if (email) {
    //         fetchInfo();
    //     }
    // }, [email]);

    
    const { user } = useCheckAuthentication();
    // new version for username && token
    useEffect(() => {
        const fetchInfo = async () => {
          try {
            const token = getCookie('token');
            if (user && user.username) {
                const data = await fetchMemberInfo(user.username, token);
                setMemberInfo(data);
            }
          } catch (err) {
            console.error(err.message);
          }
        };
        fetchInfo();
      }, [user]);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setMemberInfo(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handlePasswordChange = (e) => {
        setNewPassword(e.target.value);
    };
    
    const handleClick = async () => {
        try {
            // Old Email Version
            // await axios.put(`http://localhost:5001/api/users/email/${email}`, {
            //     title: memberInfo.title,
            //     username:memberInfo.username,
            //     firstName: memberInfo.firstName,
            //     lastName: memberInfo.lastName,
            //     phoneNumber: memberInfo.phoneNumber,
            //     password: newPassword,
            //     address: memberInfo.address
            // });
            // await submitUpdatedDetails(email, memberInfo, newPassword);

            const token = getCookie('token');
            const updatedInfo = {
                ...memberInfo
            };
            if (newPassword) {
                updatedInfo.password = newPassword;
                console.log('Sending new password:', newPassword);
            }

            console.log('Sending update request:', updatedInfo);
            await submitUpdatedDetails(user.username, token, updatedInfo);
            alert('Profile updated successfully');

            // Clear the token and redirect
            // document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            // localStorage.removeItem('token');
            // navigate("/login");
        

        //     // Redirect to current page logic same as LogInPage.js
            const storedBookingData = sessionStorage.getItem('bookingForm');
            const hotelListingForm = sessionStorage.getItem('hotelListingForm');
            if (storedBookingData) { //if already click 'search'
                const state = JSON.parse(storedBookingData);
                navigate(`/bookingPageLoggedIn`, {
                    state: state
                });
            } else if(hotelListingForm){
                const state = JSON.parse(hotelListingForm);
                navigate(`/ViewHotelDetails/${state.hotel_id}`, {
                    state: state
                });
            } else{
                const storedData = sessionStorage.getItem('homeForm');
                if (storedData) { //if already click 'search'
                    const state = JSON.parse(storedData);
                    navigate("/hotelListings", {
                        state: state
                    })}
                else { //if have not click 'search'
                    navigate("/");
                }
            }
        } catch (err) {
            console.error(err.message);
            alert('Failed to update profile');
        }
    };
    
    const handleDeleteAccountClick = async () => {
        if (window.confirm("Are you sure you want to delete the account? ")) {
            try {
              const token = getCookie('token');
              await deleteAccount(user.username, token);
              alert('Account deleted successfully');
              navigate("/login");
            } catch (err) {
              console.error(err.message);
              alert('Failed to delete account');
            }
        }
    };
    
    return (
        <div className='UPWholeContainer'> 
            <Navbar />
            <div className='UPContentContainer'>
                <div className='UPContainer'>
                    <div className='UPMessageContainer'>
                        <img className="UPProfileImage" src={profile_image}/>
                        <h2 className='MemberName'> {memberInfo.firstName} {memberInfo.lastName} </h2>

                    </div>
                    
                    <div className='UPInputContainer'>
                        <div className="UPFirstRowBar">
                            <input type="text" id="title" value={memberInfo.title} placeholder="Mr" className="UP_container_box" required onChange={handleChange}/> 
                            <input type="text" id="firstName" value={memberInfo.firstName} placeholder="John" className="UP_container_box" required onChange={handleChange}/> 
                            <input type="text" id="lastName" value={memberInfo.lastName} placeholder="Doe" className="UP_container_box" required onChange={handleChange}/> 
                        </div>
                        <div className="UPSecondRowBar">
                            {/* <input type="text" id="countryCode" value={memberInfo.countryCode} placeholder="+65" className="UP_container_box" required onChange={handleChange}/>  */}
                            <input type="text" id="username" value={memberInfo.username} placeholder="john50" className="UP_container_box" required onChange={handleChange}/> 
                            <input type="text" id="address" value={memberInfo.address} placeholder="Upper Changi" className="UP_container_box" required onChange={handleChange}/> 
                            <input type="text" id="phoneNumber" value={memberInfo.phoneNumber} placeholder="12345677" className="UP_container_box" required onChange={handleChange} /> 
                        </div>
                        <div className="UPThirdRowBar">
                            <input type="text" id="email" value={memberInfo.email} placeholder="johndoe@gmail.com" className="UP_container_box" required onChange={handleChange}/> 
                        </div>
                        <div className="UPFourthRowBar">
                            <input type="text" id="password" placeholder="New Password" className="UP_container_box" onChange={handlePasswordChange}/> 
                        </div>
                        <button type="submit" className="UpdateProfile" onClick={handleClick}>Update Profile</button>
                        <button type="submit" className="DeleteAccount" onClick={handleDeleteAccountClick}>Delete Account</button>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default UpdateProfilePage;