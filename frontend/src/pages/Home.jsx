import React, { useState, useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import StatsSection from '../components/home/StatsSection';
import PartnersCarousel from '../components/PartnersCarousel';
import ContentService from '../services/content.service';

const Home = () => {
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch partners from Service (Appwrite/Mock)
    useEffect(() => {
        const fetchPartners = async () => {
            try {
                setLoading(true);
                const data = await ContentService.getPartners();
                setPartners(data);
            } catch (err) {
                console.error('Error fetching partners:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPartners();
    }, []);

    return (
        <div className="bg-[#f1f3f6] dark:bg-[#0d1117] min-h-screen pt-[130px] md:pt-[120px]">
            {/* 1. New Hero Section */}
            <HeroSection />

            {/* 2. Stats Section */}
            <StatsSection />

            {/* 3. Partners Carousel */}
            {!loading && partners.length > 0 && (
                <PartnersCarousel
                    title="Trusted By Leading Healthcare Organizations"
                    autoScrollSpeed={3000}
                    logos={partners}
                />
            )}

            {/* 4. Feature Cards (Existing/Refined) */}
            <div className="container mx-auto px-4 max-w-[1440px] py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Pharma Card */}
                    <div className="bg-white dark:bg-[#1e293b] p-8 rounded-2xl shadow-sm border border-transparent hover:border-blue-100 transition-all hover:shadow-md group cursor-pointer">
                        <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/30 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Pharma Shop</h3>
                        <p className="text-gray-500 dark:text-gray-400">Buy genuine medicines & medical equipment online.</p>
                    </div>

                    {/* Hospitals Card */}
                    <div className="bg-white dark:bg-[#1e293b] p-8 rounded-2xl shadow-sm border border-transparent hover:border-blue-100 transition-all hover:shadow-md group cursor-pointer">
                        <div className="w-14 h-14 bg-teal-50 dark:bg-teal-900/30 rounded-xl flex items-center justify-center text-teal-600 mb-6 group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Hospitals</h3>
                        <p className="text-gray-500 dark:text-gray-400">Find nearest hospitals and book appointments instantly.</p>
                    </div>

                    {/* Colleges Card */}
                    <div className="bg-white dark:bg-[#1e293b] p-8 rounded-2xl shadow-sm border border-transparent hover:border-blue-100 transition-all hover:shadow-md group cursor-pointer">
                        <div className="w-14 h-14 bg-indigo-50 dark:bg-indigo-900/30 rounded-xl flex items-center justify-center text-indigo-600 mb-6 group-hover:scale-110 transition-transform">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2">Medical Colleges</h3>
                        <p className="text-gray-500 dark:text-gray-400">Explore top medical colleges and admission info.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
