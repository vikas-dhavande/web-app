import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaSearch, FaTimes } from 'react-icons/fa';

const Header = ({ onOpenSignin }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className="site-header">
            <div className="header-inner">
                <div className="menu-toggle" onClick={toggleMenu}>
                    {isMenuOpen ? <FaTimes /> : <FaBars />}
                </div>

                <div className="header-left">
                    <Link to="/" className="logo">MEDPORTAL</Link>
                </div>

                <div className={`header-center ${isMenuOpen ? 'active' : ''}`}>
                    <nav>
                        <ul className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                            <li className="nav-item">
                                <Link to="#" className="nav-link" onClick={() => setIsMenuOpen(false)}>Main Portal</Link>
                                <ul className="dropdown-menu">
                                    <li><Link to="#" className="dropdown-link">Dashboard</Link></li>
                                    <li><Link to="#" className="dropdown-link">Profile</Link></li>
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link to="#" className="nav-link" onClick={() => setIsMenuOpen(false)}>Pharma</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="#" className="nav-link" onClick={() => setIsMenuOpen(false)}>Hospitals</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="#" className="nav-link" onClick={() => setIsMenuOpen(false)}>Colleges</Link>
                            </li>
                            {/* Mobile Only: Search & Auth options could move here if needed, 
                                 but for now we keep the layout similar to legacy demo logic where 
                                 mobile menu is just the nav links.
                             */}
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
        </header>
    );
};

export default Header;
