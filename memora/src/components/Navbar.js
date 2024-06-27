import './Navbar.css';

function Navbar () {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <a href="/" className="logo" >
          Memora
        </a>
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
            <button href="/contact" className="login">Login</button>
          </li>
        </ul>
      </div>
  </nav>
);
};

export default Navbar;