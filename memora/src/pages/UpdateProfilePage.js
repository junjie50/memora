import Navbar from '../components/Navbar.js';
import './UpdateProfilePage.css'
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation} from "react-router-dom";
import profile_image from '../assets/profile_image.png';
import axios from 'axios';
import { fetchMemberInfo, submitUpdatedDetails } from '../services/AccountUpdateForm.js';

function UpdateProfilePage(){
    const navigate = useNavigate(); 
    const location = useLocation();
    const email = location.state?.email;

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

    // useEffect(() => { //need integrate as a method call
    //     const token = getCookie('token');
    //     console.log(token);
    //     if (token) {
    //     axios.get(`http://localhost:5001/api/users/${token}`)
    //             .then(response => {
    //                 // console.log('API response:', response.data);
    //                 setMemberInfo(response.data);
    //                 setAuthenticated(true);
    //             })
    //             .catch(error => {
    //                 console.error('Authentication failed', error);
    //                 setAuthenticated(false);
    //             });
    //     }
    // }, []);

    // console.log(memberInfo);
    
    useEffect(() => {
        const fetchInfo = async () => {
            try {
                // const res = await axios.get(`http://localhost:5001/api/users/email/${email}`); //use the email passed from forget password state
                // console.log(res.data);
                // setMemberInfo(res.data); //api return member object

                const data = await fetchMemberInfo(email);
                console.log(data);
                setMemberInfo(data);
            } catch (err) {
                console.error(err.message);
            }
        };
        if (email) {
            fetchInfo();
        }
    }, [email]);

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
            // await axios.put(`http://localhost:5001/api/users/email/${email}`, {
            //     title: memberInfo.title,
            //     username:memberInfo.username,
            //     firstName: memberInfo.firstName,
            //     lastName: memberInfo.lastName,
            //     phoneNumber: memberInfo.phoneNumber,
            //     password: newPassword,
            //     address: memberInfo.address
            // });

            await submitUpdatedDetails(email, memberInfo, newPassword);
            alert('Profile updated successfully');
            navigate("/login")
        } catch (err) {
            console.error(err.message);
            alert('Failed to update profile');
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

                    </div>
                </div>
            </div>
        </div>
    )
}
export default UpdateProfilePage;