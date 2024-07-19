import Navbar from '../components/Navbar.js';
import './LoginPage.css'
import React,{ useState } from 'react';
import { useNavigate } from "react-router-dom";
// import { useHistory } from 'react-router-dom';
import loginRegisterImage from '../assets/login_register_image.png';
import axios from 'axios';

//original booking-page
function LogInPage(){
    const navigate = useNavigate(); 
    // const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // const handleLogin = () => {
    //     navigate("/home")
    // }

    const handleSubmit = async (e) => {
        // navigate('/home');

        //original booking-page
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5001/api/login', {email, password}); ///api/register is a backend route defined in Express server, responsible for handling registration data submission.
            // console.log(res.data);
            localStorage.setItem('token', res.data.token); // store token in local storage
            // history.push('/home'); // navigate to home page
            navigate('/');
        } catch (err) {
            console.error(err.response.data.message);
            alert('Login failed: ' + (err.response ? err.response.data.message : err.message) + ', please reenter your information.'); // Alert on registration failure

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
                                <input type="email" id="email" placeholder="Your Email" value={email} className="LI_container_box" required onChange={(e)=>setEmail(e.target.value)}/>
                                <input type="password" id="password" placeholder="Your Password" value={password} className="LI_container_box" required onChange={(e)=>setPassword(e.target.value)}/>  
                                <button type="submit" className="LILogIn">Login</button>
                            </form>
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

//main
// function LogInPage(){
//     const navigate = useNavigate(); 
//     const handleLogin = () => {
//         navigate("/home")
//     }

//     return (
//         <div className='LIWholeContainer'> 
//             <Navbar />
//             <div className='ContentContainer'>
//                 <div className='LILeftContainer'>
//                     <div className='LIMessageContainer'>
//                         <h2> Welcome Back! Login </h2>
//                         <h2> for personalized </h2>
//                         <h2> recommendations. </h2>
//                     </div>
                    
//                     <div className='InputContainer'>
//                         <div>
//                             <input type="text" id="email" placeholder="Your Email" className="LI_container_box" required/>
//                             <input type="text" id="password" placeholder="Your Password" className="LI_container_box" required/>  
//                             <button type="submit" className="LILogIn" onClick={handleLogin}>Login</button>

//                             <div className='LIForgetPassword'>
//                                 <a href="http://localhost:3000/forgetPasswordPage"> Forget Password? </a>
//                             </div>
//                             <div className='LIRegisterAccount'>
//                                 No account yet? Register for<a href="http://localhost:3000/registerPage"> one </a> here!
//                             </div>
                            
//                         </div>
//                     </div>
//                 </div>

//                 <div className='LIRightContainer'>
//                     <img className="LIRegisterImage" src={loginRegisterImage} alt="View of the amazing Santorini."/>
//                     <p> Book your travel hotels easily with “NAME”. Enjoy </p>
//                     <p> Special Rates and fuss-free booking process, partial </p>
//                     <p> refunds for cancellation 3 days before your check-in. </p>
//                 </div>
//         </div>
            
//         </div>
//     )
// }

export default LogInPage;