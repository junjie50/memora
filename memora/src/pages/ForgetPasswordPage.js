import Navbar from '../components/Navbar.js';
import './ForgetPasswordPage.css'
import React,{ useState } from 'react';
import { useNavigate } from "react-router-dom";
import loginRegisterImage from '../assets/login_register_image.png';


function ForgetPasswordPage(){
    const navigate = useNavigate(); 
    const handleLogin = () => {
        navigate("/test")
    }

    return (
        <div className='FPWholeContainer'> 
            <Navbar />
            <div className='ContentContainer'>
                <div className='FPLeftContainer'>
                    <div className='FPMessageContainer'>
                        <h2 className='FPSpecialMessage'> Forget Password? Don’t </h2>
                        <h2 className='FPSpecialMessage'> worry! </h2>
                        <p> Enter your email and we will send the instructions to </p>
                        <p> reset password to your registered email </p>
                    </div>
                    
                    <div className='InputContainer'>
                        <div>
                            <input type="text" id="email" placeholder="Your Email" className="FP_container_box" required/>
                            <input type="text" id="password" placeholder="Your Password" className="FP_container_box" required/>  
                            <button type="submit" className="LILogIn" onClick={handleLogin}>Reset Password</button>
                            
                        </div>
                    </div>
                </div>

                <div className='FPRightContainer'>
                    <img className="FPRegisterImage" src={loginRegisterImage} alt="View of the amazing Santorini."/>
                    <p> Book your travel hotels easily with “NAME”. Enjoy </p>
                    <p> Special Rates and fuss-free booking process, partial </p>
                    <p> refunds for cancellation 3 days before your check-in. </p>
                </div>
        </div>
            
        </div>
    )
}
export default ForgetPasswordPage;