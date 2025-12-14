import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    FaUserCircle, FaTimes, FaStethoscope, FaCalendarCheck,
    FaHospital, FaPills, FaVial, FaFileAlt, FaUniversity,
    FaClipboardList, FaFilePrescription, FaUser, FaBell,
    FaQuestionCircle, FaShieldAlt, FaChevronRight
} from 'react-icons/fa';
import './MobileMenu.css';

const MobileMenu = ({ isOpen, onClose, onOpenSignin }) => {

    // Disable body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target.className === 'mobile-menu-overlay') {
            onClose();
        }
    };

    const menuItems = [
        { icon: <FaStethoscope />, label: 'Doctor Directory', link: '#' },
        { icon: <FaCalendarCheck />, label: 'Book Appointment', link: '#' },
        { icon: <FaHospital />, label: 'Hospitals & Clinics', link: '#' },
        { icon: <FaPills />, label: 'Pharmacy', link: '#' },
        { icon: <FaVial />, label: 'Lab Tests', link: '#' },
        { icon: <FaFileAlt />, label: 'Health Articles', link: '#' },
        { icon: <FaUniversity />, label: 'Medical Colleges', link: '#' },
    ];

    const personalItems = [
        { icon: <FaClipboardList />, label: 'My Appointments', link: '#' },
        { icon: <FaFilePrescription />, label: 'My Prescriptions', link: '#' },
        { icon: <FaUser />, label: 'My Profile', link: '#' },
        { icon: <FaBell />, label: 'Notifications', link: '#' },
    ];

    const supportItems = [
        { icon: <FaQuestionCircle />, label: 'Help & Support', link: '#' },
        { icon: <FaShieldAlt />, label: 'Legal & Privacy', link: '#' },
    ];

    return (
        <div className="mobile-menu-overlay" onClick={handleOverlayClick}>
            <div className={`mobile-menu-drawer ${isOpen ? 'open' : ''}`}>

                {/* 1. User Header Section */}
                <div className="mobile-menu-header">
                    <div className="user-info" onClick={() => { onOpenSignin(); onClose(); }}>
                        <FaUserCircle className="user-avatar" />
                        <div className="user-text">
                            <span className="login-text">Login / Sign Up</span>
                            <span className="sub-text">To view your profile</span>
                        </div>
                    </div>
                    <FaTimes className="close-icon" onClick={onClose} />
                </div>

                {/* 2. Scrollable Menu List */}
                <div className="mobile-menu-content">

                    <div className="menu-section">
                        <h4 className="section-title">Medical Services</h4>
                        {menuItems.map((item, index) => (
                            <Link key={index} to={item.link} className="menu-item" onClick={onClose}>
                                <span className="menu-icon">{item.icon}</span>
                                <span className="menu-label">{item.label}</span>
                            </Link>
                        ))}
                    </div>

                    <div className="menu-divider"></div>

                    <div className="menu-section">
                        <h4 className="section-title">My Account</h4>
                        {personalItems.map((item, index) => (
                            <Link key={index} to={item.link} className="menu-item" onClick={onClose}>
                                <span className="menu-icon">{item.icon}</span>
                                <span className="menu-label">{item.label}</span>
                            </Link>
                        ))}
                    </div>

                    <div className="menu-divider"></div>

                    <div className="menu-section">
                        <h4 className="section-title">Support</h4>
                        {supportItems.map((item, index) => (
                            <Link key={index} to={item.link} className="menu-item" onClick={onClose}>
                                <span className="menu-icon">{item.icon}</span>
                                <span className="menu-label">{item.label}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* 3. Footer Section */}
                <div className="mobile-menu-footer">
                    <button className="footer-btn">English</button>
                    <span className="app-version">v1.0.0</span>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;
