import React from 'react';
import { FaHeartbeat, FaLinkedin, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import { headerConfig } from '../../config/headerConfig';

const Footer = () => {
    return (
        <footer className="bg-[#172337] text-white pt-16 pb-8 border-t border-slate-700 font-sans">
            <div className="container mx-auto px-4 max-w-[1440px]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-2xl font-bold italic tracking-wider">MEDPORTAL</span>
                        </div>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                            Your trusted partner in healthcare. Connecting patients, doctors, and institutions seamlessly.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center hover:bg-blue-600 transition-colors"><FaLinkedin className="text-sm" /></a>
                            <a href="#" className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center hover:bg-blue-400 transition-colors"><FaTwitter className="text-sm" /></a>
                            <a href="#" className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center hover:bg-pink-600 transition-colors"><FaInstagram className="text-sm" /></a>
                        </div>
                    </div>

                    {/* Quick Link Columns */}
                    <div>
                        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4">Platform</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-sm text-gray-300 hover:text-white hover:underline transition-colors">About Us</a></li>
                            <li><a href="#" className="text-sm text-gray-300 hover:text-white hover:underline transition-colors">Careers</a></li>
                            <li><a href="#" className="text-sm text-gray-300 hover:text-white hover:underline transition-colors">Medical Ethics</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4">Services</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-sm text-gray-300 hover:text-white hover:underline transition-colors">Hospitals</a></li>
                            <li><a href="#" className="text-sm text-gray-300 hover:text-white hover:underline transition-colors">Clinics</a></li>
                            <li><a href="#" className="text-sm text-gray-300 hover:text-white hover:underline transition-colors">Doctors</a></li>
                            <li><a href="#" className="text-sm text-gray-300 hover:text-white hover:underline transition-colors">Pharmacy</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-sm text-gray-300 hover:text-white hover:underline transition-colors">Help Center</a></li>
                            <li><a href="#" className="text-sm text-gray-300 hover:text-white hover:underline transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="text-sm text-gray-300 hover:text-white hover:underline transition-colors">Privacy Policy</a></li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="lg:col-span-1 border-l border-slate-700 pl-0 lg:pl-8 border-none lg:border-solid">
                        <h3 className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-4">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-sm text-gray-300">
                                <FaMapMarkerAlt className="mt-1 text-blue-500" />
                                <span>{headerConfig?.contactInfo?.location || "MedTech Park, Bangalore"}</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-300">
                                <FaPhone className="text-blue-500" />
                                <span>{headerConfig?.contactInfo?.phone || "+91-1234567890"}</span>
                            </li>
                            <li className="flex items-center gap-3 text-sm text-gray-300">
                                <FaEnvelope className="text-blue-500" />
                                <span>{headerConfig?.contactInfo?.email || "support@medportal.com"}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>© 2025 MedPortal. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-white transition-colors">Advertise</a>
                        <a href="#" className="hover:text-white transition-colors">Gift Cards</a>
                        <a href="#" className="hover:text-white transition-colors">Help Center</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
