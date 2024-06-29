//github main's
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home.js';
import Test from './pages/Test.js';
import BookingPageNotLoggedIn from './pages/BookingPageNotLoggedIn.js';
import BookingPageLoggedIn from './pages/BookingPageLoggedIn.js';
import BookingConfirmed from './pages/BookingConfirmed.js';
import BookingCompleted from './pages/BookingCompleted.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/bookingNotLoggedIn" element={<BookingPageNotLoggedIn />} />
        <Route path="/bookingPageLoggedIn" element={<BookingPageLoggedIn />} />
        <Route path="/bookingConfirmed" element={<BookingConfirmed />} />
        <Route path="/bookingCompleted" element={<BookingCompleted />} />
        
      </Routes>
    </BrowserRouter>
  );
}


export default App;

