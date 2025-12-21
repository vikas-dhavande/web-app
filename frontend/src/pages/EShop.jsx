import React, { useEffect } from 'react';
// import EShopHeader from '../components/eshop/EShopHeader'; // Removed in favor of global header
import CategoryBar from '../components/eshop/CategoryBar';
import HeroCarousel from '../components/eshop/HeroCarousel';
import DealsSection from '../components/eshop/DealsSection';
import SideBanner from '../components/eshop/SideBanner';
import AOS from 'aos';
import 'aos/dist/aos.css';

const EShop = () => {
    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    return (
        <div className="bg-[#f1f3f6] min-h-screen pt-[70px]"> {/* Adjusted background and top padding for sticky header */}
            {/* 1. Top Header is Global now */}

            {/* 2. Category Navigation Bar */}

            {/* 2. Category Navigation Bar */}
            <CategoryBar />

            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col lg:flex-row gap-4">
                    {/* Main Content Area */}
                    <div className="flex-1 w-full overflow-hidden">
                        {/* 3. Hero Banner / Carousel */}
                        <HeroCarousel />

                        {/* 4. Deals Section (Horizontal Scroll) */}
                        <DealsSection />

                        {/* Additional Section Example provided as placeholder for future */}
                        <div className="bg-white p-4 shadow-sm h-64 flex items-center justify-center rounded-md">
                            <p className="text-gray-400">More Collections Coming Soon...</p>
                        </div>
                    </div>

                    {/* 5. Side Promotional Banner (Right side on Desktop) */}
                    <div className="w-full lg:w-[300px] flex-shrink-0">
                        <SideBanner />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EShop;
