import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from "../assets/memora.png";
import profilePage from "../assets/profile_image.png";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import React,{ useState,useEffect } from 'react';
import {
  getCookie,
  useCheckAuthentication
} from '../services/LoginForm.js';

// function getCookie(name) { //need to delete browsing result in google
//   const value = `; ${document.cookie}`; //retrieves all cookies stored in the document as a single string. document.cookie returns a string of all cookies, each separated by a semicolon and a space. By adding a leading semicolon and space (; ), the function ensures that even the first cookie in the list will be matched correctly in the next step.
//   const parts = value.split(`; ${name}=`); // splits the value string into an array of substrings
//   if (parts.length === 2) return parts.pop().split(';').shift(); //If the parts array has exactly two elements, it means the target cookie exists in the document. The length will be 2 if the split operation finds exactly one occurrence of ; 
//   //parts.pop() retrieves the last element of the parts array, which contains the cookie's value and possibly other cookies following it.
//   return null; //if the Cookie is Not Found:
// }


function Navbar () { //handle login redirection
  const navigate = useNavigate(); 
  // const [authenticated, setAuthenticated] = useState(false);
  const { user, authenticated } = useCheckAuthentication();
  // const [user, setUser] = useState(null);

  const handleClick = () => {
    navigate("/login");
  }

  // useCheckAuthentication(setUser, setAuthenticated);

  // console.log(authenticated);
  // console.log(user);
  // useEffect(() => {
  //     const token = getCookie('token');
  //     if (token) {
  //       axios.get(`/api/users/${token}`)
  //           .then(response => {
  //               setUser(response.data);
  //               setAuthenticated(true);
  //           })
  //           .catch(error => {
  //               console.error('Authentication failed', error);
  //               setAuthenticated(false);
  //           });
  //     }
  // }, []);

  return (
    <div className="navbar-content">
       <nav className="navbar">
          <div className="navbar-left">
            <Link to="/"> 
            <img src={logo} alt="Logo" className="navbar-logo" />
            </Link>
          </div>
          <div className="space"></div>
          <div className="navbar-center">
            <ul className="nav-links">
              <li>
                <a href="/products">Recommendation</a>
              </li>
              <li>
                <a href="/about">Your Bookings</a>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
              <li>
                {/* <button onClick={handleClick} className="login">Login</button> */}
                {authenticated && user ? (
                    <img src={profilePage} alt="User" className="user-picture" />
                ) : (
                    <button onClick={handleClick} className="login">Login</button>
                )}
              </li>
            </ul>
          </div>
      </nav>
    </div>
  );  
};

export default Navbar;