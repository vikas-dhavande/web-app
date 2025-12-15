import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaMoon, FaSun, FaBell } from 'react-icons/fa';
import MobileMenu from './MobileMenu';

const Header = ({ onOpenSignin }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setDarkMode(true);
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            setDarkMode(false);
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(true); // Always open drawer
    };

    const toggleTheme = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        const theme = newMode ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };

    const openNotifications = () => {
        console.log("Notifications clicked");
    };

    return (
        <header className="site-header">
            <div className="header-inner">
                <div className="header-left">
                    <div className="menu-toggle" onClick={toggleMenu}>
                        <FaBars />
                    </div>
                    <Link to="/" className="logo">MEDPORTAL</Link>
                </div>

                <div className="header-center">
                    <nav>
                        {/* Desktop Menu - Hidden on Mobile via CSS */}
                        <ul className="nav-menu">
                            <li className="nav-item">
                                <Link to="#" className="nav-link">Hospitals</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="#" className="nav-link">Pharma</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="#" className="nav-link">Colleges</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="#" className="nav-link">Blog</Link>
                            </li>
                        </ul>
                    </nav>


                </div>

                <div className="header-right">
                    <button
                        className="action-btn icon-btn"
                        onClick={toggleTheme}
                        aria-label="Toggle Dark Mode"
                    >
                        {darkMode ? <FaSun /> : <FaMoon />}
                    </button>

                    <button
                        className="action-btn icon-btn"
                        onClick={openNotifications}
                        aria-label="Notifications"
                    >
                        <FaBell />
                        <span className="notification-dot"></span>
                    </button>

                    <button className="btn-login" onClick={onOpenSignin}>
                        Sign In
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            <MobileMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                onOpenSignin={onOpenSignin}
            />
        </header>
    );
};

export default Header;
