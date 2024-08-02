import Navbar from '../components/Navbar.js';
import './LoginPage.css'
import React,{ useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
// import { useHistory } from 'react-router-dom';
import loginRegisterImage from '../assets/login_register_image.png';
import axios from 'axios';
import {
    getCookie,
    submitLoginDetails,
    validateLoginDetails,
    // validationFailed,
    displaySuccessfulMessage,
    displayUnsuccessfulMessage,
    useCheckAuthentication
} from '../services/LoginForm.js';

// function getCookie(name) { //need to put in service
//     const value = `; ${document.cookie}`; //retrieves all cookies stored in the document as a single string. document.cookie returns a string of all cookies, each separated by a semicolon and a space. By adding a leading semicolon and space (; ), the function ensures that even the first cookie in the list will be matched correctly in the next step.
//     const parts = value.split(`; ${name}=`); // splits the value string into an array of substrings
//     if (parts.length === 2) return parts.pop().split(';').shift(); //If the parts array has exactly two elements, it means the target cookie exists in the document. The length will be 2 if the split operation finds exactly one occurrence of ; 
//     //parts.pop() retrieves the last element of the parts array, which contains the cookie's value and possibly other cookies following it.
//     return null; //if the Cookie is Not Found:
// }


//original booking-page
function LogInPage(){ //redirect back to the original page after login
    const navigate = useNavigate(); 
    // const [user, setUser] = useState(null);
    // const [authenticated, setAuthenticated] = useState(false);
    // const [username, setUsername] = useState(''); //use username instead of email to login
    // const [password, setPassword] = useState('');

    const { user, authenticated, error } = useCheckAuthentication();

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    // useEffect(() => { //need integrate as a method call
    //     const token = getCookie('token');
    //     if (token) {
    //         axios.get(`/api/users/${token}`)
    //             .then(response => {
    //                 setUser(response.data);
    //                 setAuthenticated(true);
    //                 // navigate("/"); // Navigate to the home page if authenticated
    //             })
    //             .catch(error => {
    //                 console.error('Authentication failed', error);
    //                 setAuthenticated(false);
    //             });
    //     }
    // }, []);

    // useCheckAuthentication(setUser, setAuthenticated);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //origin
            // const res = await axios.post('http://localhost:5001/api/users/login', {username, password}); ///api/register is a backend route defined in Express server, responsible for handling registration data submission.
            const res = await submitLoginDetails(formData);
            document.cookie = `token=${res.data.token}; path=/`; // Set token as a cookie
            localStorage.setItem('token', res.data.token); // store token in local storage

            // //newly added
            // if (validateLoginDetails(formData)) {
            //     submitLoginDetails(formData);
            // } else {
            //     // validationFailed();
            // }
            // console.log(user);
            // console.log(authenticated);

            const storedBookingData = sessionStorage.getItem('bookingForm');
            const hotelListingForm = sessionStorage.getItem('hotelListingForm');
            console.log('storeDBookingData',storedBookingData);
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
            }
            else {
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
        } catch (error) {
            // console.error(err.response.data.message);
            alert('Login failed: ' + (error.response ? error.response.data.message : error.message) + ', please reenter your information.'); // Alert on registration failure
            console.error('Login failed', error);
        }
    };

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
                            <form onSubmit={handleSubmit}>
                                {/* <input type="email" id="email" placeholder="Your Email" value={email} className="LI_container_box" required onChange={(e)=>setEmail(e.target.value)}/> */}
                                <input type="text" id="username" placeholder="Your Username" value={formData.username} className="LI_container_box" required onChange={handleChange}/>
                                <input type="password" id="password" placeholder="Your Password" value={formData.password} className="LI_container_box" required onChange={handleChange}/>  
                                <button type="submit" className="LILogIn">Login</button>
                            </form>
                            <div className='LIForgetPassword'>
                                <a href="http://localhost:3000/forgetPasswordPage"> Forget Password? </a>
                            </div>
                            <div className='LIRegisterAccount'>
                                No account yet? Register for<a href="http://localhost:3000/registerPage"> one </a> here!
                            </div>

                            {error && <div role="alert">{error}</div>} {}
                            
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