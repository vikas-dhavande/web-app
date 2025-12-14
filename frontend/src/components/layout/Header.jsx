import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaSearch } from 'react-icons/fa';
import MobileMenu from './MobileMenu';

const Header = ({ onOpenSignin }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(true); // Always open drawer
    };

    return (
        <header className="site-header">
            <div className="header-inner">
                <div className="menu-toggle" onClick={toggleMenu}>
                    <FaBars />
                </div>

                <div className="header-left">
                    <Link to="/" className="logo">MEDPORTAL</Link>
                </div>

                <div className="header-center">
                    <nav>
                        {/* Desktop Menu - Hidden on Mobile via CSS */}
                        <ul className="nav-menu">
                            <li className="nav-item">
                                <Link to="#" className="nav-link">Main Portal</Link>
                                <ul className="dropdown-menu">
                                    <li><Link to="#" className="dropdown-link">Dashboard</Link></li>
                                    <li><Link to="#" className="dropdown-link">Profile</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link to="#" className="nav-link">Pharma</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="#" className="nav-link">Hospitals</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="#" className="nav-link">Colleges</Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="search-container">
                        <input type="text" className="search-input" placeholder="Search..." />
                        <FaSearch className="search-icon" />
                    </div>
                </div>

                <div className="header-right">
                    <Link to="#" className="icon-link">Spaces</Link>
                    <Link to="#" className="icon-link">For Doctors</Link>
                    <button className="btn-login" onClick={onOpenSignin}>Sign In</button>
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
