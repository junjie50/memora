import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from "../assets/memora.png";

function Navbar () {
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
                <Link to="/login"> 
                <button href="/contact" className="login">Login</button>
                </Link>
              </li>
            </ul>
          </div>
      </nav>
    </div>
  );  
};

export default Navbar;