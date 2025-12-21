import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaMoon, FaSun, FaBell, FaSearch, FaShoppingCart, FaUser, FaStore } from 'react-icons/fa';
import MobileMenu from './MobileMenu';

const Header = ({ onOpenSignin }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const navigate = useNavigate();

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
        setIsMenuOpen(true);
    };

    const toggleTheme = () => {
        const newMode = !darkMode;
        setDarkMode(newMode);
        const theme = newMode ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50 bg-[#4169E1] shadow-md h-[70px]">
            <div className="container mx-auto px-4 h-full flex items-center justify-between gap-6 max-w-[1400px]">

                {/* 1. Logo Section */}
                <div className="flex items-center gap-3">
                    <div className="text-white text-xl cursor-pointer lg:hidden" onClick={toggleMenu}>
                        <FaBars />
                    </div>
                    <Link to="/" className="text-white text-2xl font-bold italic tracking-wider flex flex-col leading-none">
                        <span>MEDPORTAL</span>
                        <span className="text-[10px] font-normal not-italic text-yellow-300 tracking-widest">+ EXPLORE PLUS</span>
                    </Link>
                </div>

                {/* 2. Search Bar (Hidden on mobile, large on desktop) */}
                <div className="flex-1 max-w-2xl hidden lg:block relative">
                    <input
                        type="text"
                        placeholder="Search for medicines, hospitals, and more"
                        className="w-full h-10 pl-4 pr-10 rounded-[2px] border-none outline-none text-gray-800 text-sm shadow-sm"
                    />
                    <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#4169E1] text-lg cursor-pointer" />
                </div>

                {/* 3. Action Links */}
                <div className="flex items-center gap-6 md:gap-8">

                    {/* Login Button (White Box) */}
                    <button
                        onClick={onOpenSignin}
                        className="bg-white text-[#4169E1] font-semibold px-8 py-1 rounded-[2px] transition-transform hover:bg-gray-50 hidden md:block"
                    >
                        Login
                    </button>

                    <Link to="/eshop" className="text-white font-semibold text-base whitespace-nowrap hidden md:block hover:text-gray-100">
                        Become a Seller
                    </Link>

                    {/* Navigation Dropdown Placeholder (e.g. More) */}
                    <div className="relative group cursor-pointer hidden md:block text-white font-semibold">
                        <span>More</span>
                        {/* Dropdown Content would go here */}
                    </div>

                    {/* Cart */}
                    <Link to="/cart" className="flex items-center gap-2 text-white font-semibold group">
                        <FaShoppingCart className="text-xl" />
                        <span className="hidden md:block">Cart</span>
                        <div className="absolute -top-1 -right-2 md:hidden bg-yellow-400 text-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">2</div>
                    </Link>

                    {/* Dark Mode Toggle (Optional in this premium layout, keeping small) */}
                    <button onClick={toggleTheme} className="text-white text-lg opacity-80 hover:opacity-100">
                        {darkMode ? <FaSun /> : <FaMoon />}
                    </button>
                </div>
            </div>

            {/* Mobile Search Bar (Visible only on mobile below header if needed, or in drawer) - Keeping simple for now */}

            <MobileMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                onOpenSignin={onOpenSignin}
            />
        </header>
    );
};

export default Header;
