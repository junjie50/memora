import './footer.css'

const Footer = () => {
    return (
    <footer className="footer">
        <div className="footer-container">
            <div className="footer-section">
                <h3>About Us</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
            <div className="footer-section">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/">Services</a></li>
                    <li><a href="/">Contact</a></li>
                </ul>
            </div>
            <div className="footer-section">
                <h3>Contact Us</h3>
                <p>Email: info@example.com</p>
                <p>Phone: +123 456 7890</p>
            </div>
        </div>
        <div className="footer-bottom">
            &copy; 2024 YourCompany | All Rights Reserved
        </div>
    </footer>
    )}
  
export default Footer