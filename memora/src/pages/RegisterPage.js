import Navbar from '../components/Navbar.js';
import './RegisterPage.css'
import React,{ useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import {
    submitMemberDetails,
    validateMemberDetails,
    validationFailed,
    displaySuccessfulMessage,
    displayUnsuccessfulMessage
} from '../services/RegistrationForm.js';

function RegisterPage(){
    const navigate = useNavigate(); 
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        email: '',
        password: '',
        username:'',
        address:'',

        over21: false,
        agreeToTerms: false
    });
    
    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [id]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //previously
            // const res = await axios.post('http://localhost:5001/api/users', formData);
            // console.log(res.data);
            // alert('Registration successful'); // Alert on successful registration
            // navigate("/login") //back to login page

            //newly added
            if (validateMemberDetails(formData)) {
                submitMemberDetails(formData, navigate);
            } else {
                validationFailed();
            }
        } catch (err) {
            console.error(err.response ? err.response.data : err.message);
            alert('Registration failed: ' + (err.response ? err.response.data.message : err.message)); // Alert on registration failure
        }

    };

    // document.getElementById('registerForm').addEventListener('submit', handleSubmit);

    return (
        <div className='RWholeContainer'> 
            <Navbar />
            <div className='RContentContainer'>
                <div className='RLeftContainer'>
                    <div className='RMessageContainer'>
                        <h2> Sign up to save your information and streamline your </h2>
                        <h2> hotel booking process. </h2>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className='RInputContainer'>
                            <div className="RFirstRowBar">
                                <input type="text" id="title" data-testid="title" placeholder="Title" className="R_container_box" required value={formData.title} onChange={handleChange}/> 
                                <input type="text" id="firstName" data-testid="firstName" placeholder="First Name" className="R_container_box" required value={formData.firstName} onChange={handleChange}/> 
                                <input type="text" id="lastName" data-testid="lastName" placeholder="Last Name" className="R_container_box" required value={formData.lastName} onChange={handleChange}/> 
                            </div>
                            <div className="RSecondRowBar">
                                {/* <input type="text" id="countryCode" placeholder="Country Code" className="R_container_box" required value={formData.countryCode} onChange={handleChange}/>*/}
                                <input type="text" id="username" data-testid="username" placeholder="Username" className="R_container_box" required value={formData.username} onChange={handleChange}/> 
                                <input type="text" id="address" data-testid="address" placeholder="Your Address" className="R_container_box" required value={formData.address} onChange={handleChange}/> 
                                <input type="text" id="phoneNumber" data-testid="phoneNumber" placeholder="Your Phone Number" className="R_container_box" required value={formData.phoneNumber} onChange={handleChange} /> 
                            </div>
                            <div className="RThirdRowBar">
                                <input type="email" id="email" data-testid="email" placeholder="Your Email Address" className="R_container_box" required value={formData.email} onChange={handleChange}/> 
                            </div>
                            <div className="RFourthRowBar">
                                <input type="password" id="password" data-testid="password" placeholder="Your Password" className="R_container_box" required value={formData.password} onChange={handleChange}/> 
                            </div>
                        </div>

                        <div className="RAgreementPolicyBar"> 
                            <div className='agreement-item'>
                                <input className='RAgeAgreementBar' id="over21" type="checkbox" checked={formData.over21} required onChange={handleChange}/>
                                I confirm that I am over the age of 21.
                            </div>
                            <div className='agreement-item'>
                                <input className='RReadPolicyAgreementBar' id="agreeToTerms" type="checkbox" checked={formData.agreeToTerms} required onChange={handleChange}/>
                                I have read and agree to Memora's Terms of Use and Privacy Policy.
                            </div>

                            {/* <button type="submit" className="ConfirmRegister" onClick={handleClick}>Register</button> */}
                            <button type="submit" className="ConfirmRegister">Register</button>

                        </div>
                    </form>
                </div>            
            </div>
        </div>
    );
};

export default RegisterPage;