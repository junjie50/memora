import Navbar from '../components/Navbar.js';
import './UpdateProfilePage.css'
import React,{ useState } from 'react';
import { useNavigate } from "react-router-dom";
import profile_image from '../assets/profile_image.png';

function RegisterPage(){
    const navigate = useNavigate(); 
    const handleClick = () => {
        navigate("/bookingPageNotLoggedIn")
    }

    return (
        <div className='UPWholeContainer'> 
            <Navbar />
            <div className='UPContentContainer'>
                <div className='UPContainer'>
                    <div className='UPMessageContainer'>
                        <img className="UPProfileImage" src={profile_image}/>
                        <h2 className='MemberName'> John Doe </h2>

                    </div>
                    
                    <div className='UPInputContainer'>
                        <div class="UPFirstRowBar">
                            <input type="text" id="gender" placeholder="Mr" className="UP_container_box" required/> 
                            <input type="text" id="customerFirstName" placeholder="John" className="UP_container_box" required/> 
                            <input type="text" id="customerLastName" placeholder="Doe" className="UP_container_box" required/> 
                        </div>
                        <div class="UPSecondRowBar">
                            <input type="text" id="areaNo" placeholder="+65" className="UP_container_box" required/> 
                            <input type="text" id="teleNo" placeholder="12345677" className="UP_container_box" required /> 
                        </div>
                        <div class="UPThirdRowBar">
                            <input type="text" id="emailNo" placeholder="johndoe@gmail.com" className="UP_container_box" required/> 
                        </div>
                        <div class="UPFourthRowBar">
                            <input type="text" id="emailNo" placeholder="********" className="UP_container_box" required/> 
                        </div>
                        <button type="submit" className="UpdateProfile" onClick={handleClick}>Update Profile</button>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default RegisterPage;