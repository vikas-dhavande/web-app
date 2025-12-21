import React from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { headerConfig } from '../../config/headerConfig';

const NavHeader = () => {
    return (
        <div className="bg-white dark:bg-[#1e293b] border-b border-gray-200 dark:border-slate-700 hidden md:block transition-colors duration-300">
            <div className="container mx-auto px-4 max-w-[1440px] flex items-center justify-between h-[50px]">

                {/* 1. Main Navigation */}
                <nav className="h-full">
                    <ul className="flex items-center h-full gap-8">
                        {headerConfig.menu.map((item) => (
                            <li key={item.id} className="h-full relative group">
                                <Link
                                    to={item.link}
                                    className="flex items-center h-full text-slate-600 dark:text-gray-300 font-medium text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors relative"
                                >
                                    {item.label}
                                    {/* Active/Hover Indicator */}
                                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-t-sm"></span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* 2. Contact Info Bar */}
                <div className="flex items-center gap-6 text-xs font-medium text-gray-500">
                    <div className="flex items-center gap-2 hover:text-blue-600 transition-colors cursor-pointer">
                        <FaPhoneAlt className="text-blue-500" />
                        <span>{headerConfig.contactInfo.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 hover:text-blue-600 transition-colors cursor-pointer hidden lg:flex">
                        <FaMapMarkerAlt className="text-blue-500" />
                        <span>{headerConfig.contactInfo.location}</span>
                    </div>
                    {/* Email optional if space is tight */}
                </div>
            </div>
        </div>
    );
};

export default NavHeader;
