import Navbar from '../components/Navbar.js';
import './RegisterPage.css'
import React,{ useState } from 'react';
import axios from 'axios';

function RegisterPage(){
    // const navigate = useNavigate(); 
    const [formData, setFormData] = useState({
        title: '',
        firstName: '',
        lastName: '',
        countryCode: '',
        phoneNumber: '',
        email: '',
        password: '',

        over21: false,
        agreeToTerms: false
    });
    
    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [id]: type === 'checkbox' ? checked : value
        });
        // setFormData({
        //     ...formData,
        //     [e.target.id]: e.target.value
        // });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5001/api/register', formData); ///api/register is a backend route defined in Express server, responsible for handling registration data submission.
            console.log(res.data);
        } catch (err) {
            console.error(err.response ? err.response.data : err.message);
        }

        // try {
        //     const response = await fetch('http://localhost:5001/api/register', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(formData)
        //     });
            
        //     if (response.ok) {
        //         console.log('Registration successful');
        //     } else {
        //         console.error('Registration failed');
        //     }
        // } catch (error) {
        //     console.error('Error:', error);
        // }
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
                            <div class="RFirstRowBar">
                                <input type="text" id="title" placeholder="Title" className="R_container_box" required value={formData.title} onChange={handleChange}/> 
                                <input type="text" id="firstName" placeholder="First Name" className="R_container_box" required value={formData.firstName} onChange={handleChange}/> 
                                <input type="text" id="lastName" placeholder="Last Name" className="R_container_box" required value={formData.lastName} onChange={handleChange}/> 
                            </div>
                            <div class="RSecondRowBar">
                                <input type="text" id="countryCode" placeholder="Country Code" className="R_container_box" required value={formData.countryCode} onChange={handleChange}/> 
                                <input type="text" id="phoneNumber" placeholder="Your Phone Number" className="R_container_box" required value={formData.phoneNumber} onChange={handleChange} /> 
                            </div>
                            <div class="RThirdRowBar">
                                <input type="text" id="email" placeholder="Your Email Address" className="R_container_box" required value={formData.email} onChange={handleChange}/> 
                            </div>
                            <div class="RFourthRowBar">
                                <input type="text" id="password" placeholder="Your Password" className="R_container_box" required value={formData.password} onChange={handleChange}/> 
                            </div>
                        </div>

                        <div className="RAgreementPolicyBar"> 
                            <div className='agreement-item'>
                                <input className='RAgeAgreementBar' id="over21" type="checkbox" checked={formData.over21} onChange={handleChange}/>
                                I confirm that I am over the age of 21.
                            </div>
                            <div className='agreement-item'>
                                <input className='RReadPolicyAgreementBar' id="agreeToTerms" type="checkbox" checked={formData.agreeToTerms} onChange={handleChange}/>
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