import Navbar from '../components/Navbar.js';
import './LoginPage.css'
import React,{ useState } from 'react';
import { useNavigate } from "react-router-dom";
import loginRegisterImage from '../assets/login_register_image.png';


function LogInPage(){
    const navigate = useNavigate(); 
    const handleLogin = () => {
        navigate("/home")
    }

    return (
        <div className='LIWholeContainer'> 
            <Navbar />
            <div className='ContentContainer'>
                <div className='LILeftContainer'>
                    <div className='LIMessageContainer'>
                        <h2> Welcome Back! Login </h2>
                        <h2> for personalized </h2>
                        <h2> recommendations. </h2>
                    </div>
                    
                    <div className='InputContainer'>
                        <div>
                            <input type="text" id="email" placeholder="Your Email" className="LI_container_box" required/>
                            <input type="text" id="password" placeholder="Your Password" className="LI_container_box" required/>  
                            <button type="submit" className="LILogIn" onClick={handleLogin}>Login</button>

                            <div className='LIForgetPassword'>
                                <a href="http://localhost:3000/forgetPasswordPage"> Forget Password? </a>
                            </div>
                            <div className='LIRegisterAccount'>
                                No account yet? Register for<a href="http://localhost:3000/registerPage"> one </a> here!
                            </div>
                            
                        </div>
                    </div>
                </div>

                <div className='LIRightContainer'>
                    <img className="LIRegisterImage" src={loginRegisterImage} alt="View of the amazing Santorini."/>
                    <p> Book your travel hotels easily with “NAME”. Enjoy </p>
                    <p> Special Rates and fuss-free booking process, partial </p>
                    <p> refunds for cancellation 3 days before your check-in. </p>
                </div>
        </div>
            
        </div>
    )
}
export default LogInPage;