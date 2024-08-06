//github main's
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home.js';
import BookingPageLoggedIn from './pages/BookingPageLoggedIn.js';
import BookingConfirmed from './pages/BookingConfirmed.js';
import BookingCompleted from './pages/BookingCompleted.js';
import TestBookingCompleted from './pages/TestBookingCompleted.js';
import HotelListings from './pages/HotelListings.js';
import ViewHotelDetails from './pages/ViewHotelDetails';
import LogInPage from './pages/LogInPage.js';
import ForgetPasswordPage from './pages/ForgetPasswordPage.js';
import RegisterPage from './pages/RegisterPage.js';
import UpdateProfilePage from './pages/UpdateProfilePage.js';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function App() {
  const clearCacheData = () => {
    caches.keys().then((names) => {
        names.forEach((name) => {
            caches.delete(name);
        });
      });
  };

  useEffect(() => {
    clearCacheData();
  })

  clearCacheData();
  return (
    <BrowserRouter>
      <Routes>
        
        <Route exact path="/" element={<Home />} />
        <Route path="/hotelListings" element={<HotelListings />} />
        <Route path="/ViewHotelDetails/:hotelId?" element={<ViewHotelDetails />} />
   
        <Route path="/bookingPageLoggedIn" element={<BookingPageLoggedIn />} />
        <Route path="/bookingConfirmed" element={<BookingConfirmed />} />
        <Route path="/bookingCompleted" element={<BookingCompleted />} />
        <Route path="/testBookingCompleted" element={<TestBookingCompleted />} />

        <Route path="/login" element={<LogInPage />} />
        <Route path="/forgetPasswordPage" element={<ForgetPasswordPage />} />
        <Route path="/registerPage" element={<RegisterPage />} />
        <Route path="/updateProfilePage" element={<UpdateProfilePage />} />

      </Routes>
    </BrowserRouter>
  );
}


export default App;
