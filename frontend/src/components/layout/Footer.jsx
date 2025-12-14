import React from 'react';
import { FaHeartbeat, FaLinkedin, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
// Note: In real app, might fetch data from API or JSON
// For now static based on previous demo

const Footer = () => {
    return (
        <footer className="medical-footer">
            <div className="footer-content">
                <div className="footer-columns">
                    <div className="footer-column">
                        <h3>Platform</h3>
                        <ul>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Our Mission</a></li>
                            <li><a href="#">Medical Ethics</a></li>
                            <li><a href="#">Careers</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Medical Services</h3>
                        <ul>
                            <li><a href="#">Hospitals</a></li>
                            <li><a href="#">Clinics</a></li>
                            <li><a href="#">Doctors Directory</a></li>
                            <li><a href="#">Telemedicine</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>For Users</h3>
                        <ul>
                            <li><a href="#">Patient Dashboard</a></li>
                            <li><a href="#">Book Appointment</a></li>
                            <li><a href="#">Health Articles</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Legal & Policies</h3>
                        <ul>
                            <li><a href="#">Privacy Policy</a></li>
                            <li><a href="#">Terms of Service</a></li>
                        </ul>
                    </div>
                    <div className="footer-column">
                        <h3>Support</h3>
                        <ul>
                            <li><a href="#">Help Center</a></li>
                            <li><a href="#">Contact Support</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="bottom-container">
                    <div className="brand-info">
                        <FaHeartbeat className="logo-icon" />
                        <span className="brand-name">MedPortal</span>
                    </div>

                    <p className="copyright">© 2025 MedPortal. All rights reserved.</p>

                    <div className="social-icons">
                        <a href="#"><FaLinkedin /></a>
                        <a href="#"><FaTwitter /></a>
                        <a href="#"><FaInstagram /></a>
                        <a href="#"><FaYoutube /></a>
                    </div>
                </div>
                <p className="disclaimer-text">For educational purposes only. Consult a doctor for medical advice.</p>
            </div>
        </footer>
    );
};

export default Footer;
