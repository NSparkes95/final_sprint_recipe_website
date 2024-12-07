import React from 'react';
import './Footer.css'; // Import the CSS for styling

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="social-links">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
                </div>
                <p className="copyright">© 2024 What's For Dinner? All rights reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;