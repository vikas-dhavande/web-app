import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { medicalSpecialties } from '../../data/specialties';

// Helper Component for the Card
const SpecialtyCard = ({ specialty }) => {
    const Icon = specialty.icon;
    if (!Icon) return null;

    return (
        <div className="group relative bg-[#F4F6F8] dark:bg-[#1e293b] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer flex flex-col items-center pt-8 pb-4 h-full">
            {/* Background Icon (Watermark style) */}
            <div className="absolute top-3 left-4 text-gray-500/20 dark:text-gray-400/10 text-3xl z-0 transition-transform group-hover:scale-110 duration-300">
                <Icon />
            </div>

            {/* Doctor Image Container */}
            <div className="relative z-10 w-full flex justify-center mb-3">
                <div className="h-32 w-32 relative">
                    <div className="w-full h-full rounded-full bg-white dark:bg-slate-700 border-4 border-white dark:border-slate-600 shadow-sm flex items-center justify-center overflow-hidden">
                        <img
                            src={`https://ui-avatars.com/api/?name=${specialty.name.replace(/ /g, '+')}&background=random&color=fff&size=128`}
                            alt={specialty.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Specialty Name */}
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-200 text-center px-2 z-10">
                {specialty.name}
            </h3>
        </div>
    );
};

const AllSpecialties = () => {
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
        pauseOnHover: true, // Allow pausing on hover for better UX
        responsive: [
            {
                breakpoint: 1024,
                settings: { slidesToShow: 3 }
            },
            {
                breakpoint: 600,
                settings: { slidesToShow: 2 }
            }
        ]
    };

    return (
        <section className="py-10 bg-white dark:bg-[#0d1117] overflow-hidden">
            <div className="container mx-auto px-4 max-w-[1440px]">
                {/* Heading */}
                <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-white">All Specialities</h2>

                {/* Content Area: Either Carousel or Grid */}
                <div className="mb-8">
                    {!viewAll ? (
                        /* CAROUSEL VIEW */
                        <div className="mx-[-12px]">
                            <Slider {...settings}>
                                {medicalSpecialties.map((specialty, index) => (
                                    <div key={index} className="px-3 py-2">
                                        <SpecialtyCard specialty={specialty} />
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    ) : (
                        /* GRID VIEW */
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 animate-fadeIn">
                            {medicalSpecialties.map((specialty, index) => (
                                <SpecialtyCard key={index} specialty={specialty} />
                            ))}
                        </div>
                    )}
                </div>

                {/* View All Button */}
                <div className="flex justify-center">
                    <button
                        onClick={() => setViewAll(!viewAll)}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-colors flex items-center gap-2"
                    >
                        {viewAll ? 'Show Less' : 'View All Specialities'}
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

export default AllSpecialties;
