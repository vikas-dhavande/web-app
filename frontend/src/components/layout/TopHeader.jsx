import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaUser, FaShoppingCart, FaBell, FaBars } from 'react-icons/fa';
import { headerConfig } from '../../config/headerConfig';
import ThemeToggle from '../common/ThemeToggle';
import { useAuth } from '../../context/AuthContext';

const TopHeader = ({ onOpenSignin, toggleMenu }) => {
    const { user } = useAuth();
    const [placeholderIndex, setPlaceholderIndex] = useState(0);

    // Rotating Placeholder Logic
    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % headerConfig.search.placeholders.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-white dark:bg-[#1e293b] py-3 border-b border-gray-100 dark:border-slate-700 transition-colors duration-300">
            <div className="container mx-auto px-4 max-w-[1440px] flex items-center justify-between gap-4">

                {/* 1. Logo Section */}
                <div className="flex items-center gap-4">
                    <button className="lg:hidden text-gray-600 text-xl" onClick={toggleMenu}>
                        <FaBars />
                    </button>
                    <Link to={headerConfig.logo.href} className="flex flex-col leading-none group">
                        <span className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight group-hover:text-blue-600 transition-colors">
                            {headerConfig.logo.text}
                        </span>
                        <span className="text-[10px] font-semibold text-blue-500 tracking-widest uppercase">
                            {headerConfig.logo.subtext}
                        </span>
                    </Link>
                </div>

                {/* 2. Search Bar (Center) */}
                <div className="flex-1 max-w-2xl hidden md:block">
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder={headerConfig.search.placeholders[placeholderIndex]}
                            className="w-full bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-200 py-2.5 pl-5 pr-12 rounded-full border border-transparent focus:bg-white dark:focus:bg-slate-800 focus:border-blue-200 focus:ring-2 focus:ring-blue-50 outline-none transition-all duration-300 placeholder-gray-400 dark:placeholder-gray-500"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-md">
                            <FaSearch className="text-sm" />
                        </button>
                    </div>
                </div>

                {/* 3. Right Actions */}
                <div className="flex items-center gap-4 md:gap-6">
                    {/* Theme Toggle */}
                    <div className="hidden sm:block">
                        <ThemeToggle />
                    </div>

                    {/* Notification Icon */}
                    <button className="relative text-gray-500 hover:text-blue-600 transition-colors">
                        <FaBell className="text-xl" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>

                    {/* User Profile / Login */}
                    {user ? (
                        <div className="flex items-center gap-3 pl-2 border-l border-gray-100 dark:border-slate-700">
                            <Link to="/profile" className="flex items-center gap-3 group">
                                <div className="hidden md:block text-right">
                                    <p className="text-sm font-bold text-slate-800 dark:text-white leading-none mb-1 group-hover:text-blue-600">
                                        {user.name}
                                    </p>
                                    <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                                        {user.prefs?.role || 'Patient'}
                                    </p>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-slate-700 overflow-hidden ring-2 ring-transparent group-hover:ring-blue-500 transition-all">
                                    {user.prefs?.avatarUrl ? (
                                        <img src={user.prefs.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-blue-600 font-bold">
                                            {user.name.charAt(0)}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        </div>
                    ) : (
                        <div
                            className="flex items-center gap-2 cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            onClick={onOpenSignin}
                        >
                            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-slate-700 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <FaUser />
                            </div>
                            <div className="hidden lg:block">
                                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Account</p>
                                <p className="text-sm font-semibold text-slate-800 dark:text-white">Login / Signup</p>
                            </div>
                        </div>
                    )}

                    {/* Cart */}
                    <Link to="/cart" className="relative text-gray-500 hover:text-blue-600 transition-colors hidden sm:block">
                        <FaShoppingCart className="text-xl" />
                        <span className="absolute -top-2 -right-2 w-5 h-5 bg-blue-600 text-white text-[10px] flex items-center justify-center rounded-full font-bold shadow-sm">0</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default TopHeader;
