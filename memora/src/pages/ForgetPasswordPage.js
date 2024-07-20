import Navbar from '../components/Navbar.js';
import './ForgetPasswordPage.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import loginRegisterImage from '../assets/login_register_image.png';
import axios from 'axios';


function ForgetPasswordPage(){
    const navigate = useNavigate(); 
    // const handleLogin = () => {
    //     navigate("/test")
    // }
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5001/api/users/forgotPassword', {email}); //pass email to db,and navigate to updateProfilePage
            navigate('/updateProfilePage',{ state: { email } }); //pass email to updateProfilePage also
        } catch (err) {
            console.error(err.response.data.message);
            alert('Failed: ' + (err.response ? err.response.data.message : err.message));

        }
    };

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
                            <form onSubmit={handleSubmit}>
                                <input type="email" id="email" placeholder="Your Email" className="FP_container_box" required onChange={(e)=>setEmail(e.target.value)}/>
                                {/* <input type="password" id="password" placeholder="Your Password" className="FP_container_box"/>   */}
                                <button type="submit" className="LILogIn" >Reset Password</button>
                            </form>                            
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