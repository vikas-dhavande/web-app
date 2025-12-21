import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import { heroConfig } from '../../config/heroConfig';

const HeroSection = () => {
    const [placeholderIndex, setPlaceholderIndex] = useState(0);

    // Rotating Placeholder Logic
    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholderIndex((prev) => (prev + 1) % heroConfig.searchPlaceholders.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative bg-gradient-to-r from-blue-50 to-white dark:from-[#0f172a] dark:to-[#1e293b] py-16 lg:py-24 overflow-hidden transition-colors duration-300">
            <div className="container mx-auto px-4 max-w-[1440px]">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

                    {/* 1. Left Content Side */}
                    <div className="flex-1 max-w-2xl z-10">
                        <h1 className="text-4xl lg:text-5xl font-bold text-slate-800 dark:text-white leading-tight mb-6">
                            {heroConfig.headline}
                        </h1>
                        <p className="text-lg text-slate-600 dark:text-gray-300 mb-8 max-w-lg leading-relaxed">
                            {heroConfig.subtext}
                        </p>

                        {/* Search Bar */}
                        <div className="relative max-w-xl mb-10 shadow-lg group">
                            <input
                                type="text"
                                placeholder={heroConfig.searchPlaceholders[placeholderIndex]}
                                className="w-full h-16 pl-8 pr-20 rounded-full border-2 border-transparent focus:border-blue-500 bg-white dark:bg-slate-800 text-gray-700 dark:text-white outline-none transition-all duration-300 text-lg placeholder-gray-400"
                            />
                            <button className="absolute right-2 top-2 h-12 w-12 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors shadow-md">
                                <FaSearch className="text-xl" />
                            </button>
                        </div>

                        {/* Call to Actions */}
                        <div className="flex flex-wrap gap-4">
                            {heroConfig.ctas.map((cta, index) => (
                                <Link
                                    key={index}
                                    to={cta.link}
                                    className={`px-8 py-3 rounded-full font-semibold transition-transform hover:-translate-y-1 shadow-sm ${cta.variant}`}
                                >
                                    {cta.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* 2. Right Illustration Side */}
                    <div className="flex-1 w-full flex justify-center lg:justify-end relative">
                        {/* Blob Background for effect */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl -z-10"></div>

                        {/* Illustration Container */}
                        <div className="relative w-full max-w-lg">
                            {/* Placeholder for Illustration - Using a div with medical icons if image fails or for generic feel */}
                            <div className="w-full aspect-[4/3] bg-white/50 dark:bg-white/5 backdrop-blur-sm rounded-3xl border border-white/50 dark:border-white/10 shadow-xl flex items-center justify-center overflow-hidden p-6 relative">
                                {/* Simple composition if no image, or img tag if url is valid */}
                                {heroConfig.illustration ? (
                                    <img
                                        src={heroConfig.illustration}
                                        alt="Medical Healthcare"
                                        className="w-full h-full object-cover rounded-2xl animate-fade-in"
                                        onError={(e) => e.target.style.display = 'none'}
                                    />
                                ) : (
                                    <div className="text-center">
                                        <p className="text-blue-200 text-6xl font-bold opacity-20">Healthcare</p>
                                    </div>
                                )}
                            </div>

                            {/* Floating Badge Example */}
                            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-700 flex items-center gap-3 animate-bounce-slow hidden md:flex">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 font-bold">Verified Doctors</p>
                                    <p className="text-sm font-bold text-slate-800 dark:text-white">10,000+</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default HeroSection;
