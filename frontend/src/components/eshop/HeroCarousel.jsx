import React from 'react';
import Slider from 'react-slick';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Custom Arrow Components
const NextArrow = ({ onClick }) => {
    return (
        <div
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-24 bg-white/30 hover:bg-white/50 flex items-center justify-center cursor-pointer transition-colors rounded-l-md"
            onClick={onClick}
        >
            <FaChevronRight className="text-gray-800 text-xl" />
        </div>
    );
};

const PrevArrow = ({ onClick }) => {
    return (
        <div
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-24 bg-white/30 hover:bg-white/50 flex items-center justify-center cursor-pointer transition-colors rounded-r-md"
            onClick={onClick}
        >
            <FaChevronLeft className="text-gray-800 text-xl" />
        </div>
    );
};

// Mock Banner Data
const banners = [
    { id: 1, image: 'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/aa1b237568600f62.jpg?q=20', title: 'Big Savings', subtitle: 'On Medical Supplies' },
    { id: 2, image: 'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/4cd6690ef44559cf.jpg?q=20', title: 'New Arrivals', subtitle: 'Healthcare Equipment' },
    { id: 3, image: 'https://rukminim1.flixcart.com/fk-p-flap/1600/270/image/354c243868078512.jpg?q=20', title: 'Best Sellers', subtitle: 'Trusted Brands' },
];

const HeroCarousel = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        appendDots: dots => (
            <div style={{ bottom: '10px' }}>
                <ul style={{ margin: '0px' }}> {dots} </ul>
            </div>
        ),
    };

    return (
        <div className="w-full relative shadow-sm mb-4">
            <Slider {...settings}>
                {banners.map((banner) => (
                    <div key={banner.id} className="relative outline-none">
                        <img
                            src={banner.image}
                            alt={banner.title}
                            className="w-full h-[280px] object-cover"
                        />
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default HeroCarousel;
