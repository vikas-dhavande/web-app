import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { topHospitals } from '../../data/hospitals';

// Helper Component for the Card
const HospitalCard = ({ hospital }) => (
    <div className="group bg-white dark:bg-[#1e293b] rounded-xl border border-gray-100 dark:border-slate-700 p-6 flex flex-col items-center justify-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer h-full">
        <div className="w-20 h-20 mb-4 rounded-full overflow-hidden bg-gray-50 dark:bg-slate-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <img
                src={hospital.image}
                alt={hospital.name}
                className="w-full h-full object-cover"
            />
        </div>

        <p className="text-sm font-bold text-gray-900 dark:text-white mb-1">
            {hospital.countText}
        </p>

        <h3 className="text-xs text-gray-500 dark:text-gray-400 font-medium text-center">
            {hospital.name}
        </h3>
    </div>
);

const TopHospitals = () => {
    const [viewAll, setViewAll] = useState(false);

    // React Slick Settings
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        cssEase: "linear",
        pauseOnHover: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 3 }
            },
            {
                breakpoint: 600,
                settings: { slidesToShow: 1 } // Mobile view 1 column
            }
        ]
    };

    return (
        <section className="py-12 bg-white dark:bg-[#0d1117] overflow-hidden">
            <div className="container mx-auto px-4 max-w-[1440px]">
                {/* Header */}
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Explore Top Hospitals & Compare Healthcare Services
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
                        Find hospitals based on specialties, doctors, facilities, and ratings
                    </p>
                </div>

                {/* Content Area: Either Carousel or Grid */}
                <div className="mb-10">
                    {!viewAll ? (
                        /* CAROUSEL VIEW */
                        <div className="mx-[-12px]">
                            <Slider {...settings}>
                                {topHospitals.map((hospital, index) => (
                                    <div key={index} className="px-3 py-2">
                                        <HospitalCard hospital={hospital} />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    ) : (
                        /* GRID VIEW */
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 animate-fadeIn">
                            {topHospitals.map((hospital, index) => (
                                <HospitalCard key={index} hospital={hospital} />
                            ))}
                        </div>
                    )}
                </div>

                {/* CTA Button */}
                <div className="flex justify-center">
                    <button
                        onClick={() => setViewAll(!viewAll)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-colors flex items-center gap-2"
                    >
                        {viewAll ? 'Show Less' : 'View More Hospitals'}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`h-4 w-4 transition-transform duration-300 ${viewAll ? 'rotate-180' : ''}`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TopHospitals;
