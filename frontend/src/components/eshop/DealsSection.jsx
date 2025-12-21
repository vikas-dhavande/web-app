import React from 'react';
import Slider from 'react-slick';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// Custom Arrow Components for Cards
const NextArrow = ({ onClick, style, className }) => (
    <div
        className={`absolute right-0 top-[40%] z-10 w-10 h-20 bg-white shadow-md flex items-center justify-center cursor-pointer rounded-l-md hover:shadow-lg transition-all ${className}`}
        style={{ ...style, display: 'flex', background: 'white', opacity: 1 }} // Override default slick styles
        onClick={onClick}
    >
        <FaChevronRight className="text-gray-500 text-lg" />
    </div>
);

const PrevArrow = ({ onClick, style, className }) => (
    <div
        className={`absolute left-0 top-[40%] z-10 w-10 h-20 bg-white shadow-md flex items-center justify-center cursor-pointer rounded-r-md hover:shadow-lg transition-all ${className}`}
        style={{ ...style, display: 'flex', background: 'white', opacity: 1 }}
        onClick={onClick}
    >
        <FaChevronLeft className="text-gray-500 text-lg" />
    </div>
);

const products = [
    { id: 1, name: 'BP Monitors', price: 'From ₹1,299', image: 'https://rukminim1.flixcart.com/image/416/416/xif0q/blood-pressure-monitor/y/c/y/digital-bp-monitor-upper-arm-fully-automatic-bp-machine-for-home-original-imagh7g4jhfzghgz.jpeg?q=70' },
    { id: 2, name: 'Glucometers', price: 'From ₹599', image: 'https://rukminim1.flixcart.com/image/416/416/xif0q/glucometer-strip/q/p/b/50-contour-plus-blood-glucose-test-strips-50-strips-1-ascensia-original-imah7v3zyggz8f7c.jpeg?q=70' },
    { id: 3, name: 'Thermometers', price: 'From ₹299', image: 'https://rukminim1.flixcart.com/image/416/416/xif0q/thermometer/w/w/v/digital-thermometer-white-dr-morepen-original-imagj5h8yggz8f7c.jpeg?q=70' },
    { id: 4, name: 'Nebulizers', price: 'From ₹1,499', image: 'https://rukminim1.flixcart.com/image/416/416/l0sgyvk0/nebulizer/o/d/h/nebulizer-machine-kit-for-kids-and-adults-compressor-nebulizer-original-imagcgnp4yzxgxzr.jpeg?q=70' },
    { id: 5, name: 'Oximeters', price: 'From ₹499', image: 'https://rukminim1.flixcart.com/image/416/416/xif0q/pulse-oximeter/e/h/a/fingertip-pulse-oximeter-blood-oxygen-saturation-monitor-heart-original-imagj5h8yggz8f7c.jpeg?q=70' },
    { id: 6, name: 'Weighing Scales', price: 'From ₹899', image: 'https://rukminim1.flixcart.com/image/416/416/xif0q/weighing-scale/j/u/y/digital-personal-body-weighing-scale-weight-machine-step-on-original-imagj5h8yggz8f7c.jpeg?q=70' },
    { id: 7, name: 'Supports', price: 'From ₹199', image: 'https://rukminim1.flixcart.com/image/416/416/xif0q/body-support/k/l/m/knee-support-cap-with-patella-ring-for-pain-relief-joint-original-imagj5h8yggz8f7c.jpeg?q=70' },
];

const DealsSection = () => {
    const settings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1, // Mobile swipe
                    arrows: false, // Hide arrows on mobile
                    swipe: true,
                }
            }
        ]
    };

    return (
        <div className="bg-white p-4 shadow-sm mb-4">
            <div className="flex justify-between items-center mb-4 border-b pb-2">
                <h2 className="text-xl font-bold text-gray-800">Top Deals on Healthcare</h2>
                <button className="bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded shadow hover:bg-blue-700 transition-colors">
                    VIEW ALL
                </button>
            </div>

            <Slider {...settings} className="px-2"> {/* Added padding for arrows */}
                {products.map((product) => (
                    <div key={product.id} className="p-2 outline-none">
                        <div className="flex flex-col items-center p-4 border rounded-md hover:shadow-lg transition-shadow cursor-pointer h-full group text-center">
                            <div className="w-32 h-32 mb-4 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                            <h3 className="text-sm font-medium text-gray-900 mb-1">{product.name}</h3>
                            <p className="text-green-600 font-bold">{product.price}</p>
                            <p className="text-gray-500 text-xs mt-1">Hot Deal</p>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default DealsSection;
