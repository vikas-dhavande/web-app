import React from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaSearch } from 'react-icons/fa';

const Header = ({ onOpenSignin }) => {
    return (
        <header className="site-header">
            <div className="menu-toggle">
                <FaBars />
            </div>

            <div className="header-left">
                <Link to="/" className="logo">MEDPORTAL</Link>
            </div>

            <div className="header-center">
                <nav>
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
        </header>
    );
};

export default Header;
