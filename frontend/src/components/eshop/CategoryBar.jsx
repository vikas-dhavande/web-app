import React from 'react';

// Example category data
const categories = [
    { id: 1, label: 'Top Offers', icon: 'https://rukminim1.flixcart.com/flap/128/128/image/f15c02bfeb02d15d.png?q=100' },
    { id: 2, label: 'Mobiles', icon: 'https://rukminim1.flixcart.com/flap/128/128/image/22fddf3c7da4c4f4.png?q=100' },
    { id: 3, label: 'Electronics', icon: 'https://rukminim1.flixcart.com/flap/128/128/image/69c6589653afdb9a.png?q=100', hasDropdown: true },
    { id: 4, label: 'TVs & Appliances', icon: 'https://rukminim1.flixcart.com/flap/128/128/image/ab7e2b022a4587dd.jpg?q=100', hasDropdown: true },
    { id: 5, label: 'Fashion', icon: 'https://rukminim1.flixcart.com/flap/128/128/image/82b3ca5fb2301045.png?q=100', hasDropdown: true },
    { id: 6, label: 'Beauty', icon: 'https://rukminim1.flixcart.com/flap/128/128/image/dff3f7adcf3a90c6.png?q=100' },
    { id: 7, label: 'Home & Kitchen', icon: 'https://rukminim1.flixcart.com/flap/128/128/image/ee162bad964c46ae.png?q=100' },
    { id: 8, label: 'Furniture', icon: 'https://rukminim1.flixcart.com/flap/128/128/image/ab7e2b022a4587dd.jpg?q=100' }, // Reused image as placeholder
    { id: 9, label: 'Grocery', icon: 'https://rukminim1.flixcart.com/flap/128/128/image/29327f40e9c4d26b.png?q=100' },
];

const CategoryBar = () => {
    return (
        <div className="bg-white shadow-sm py-3 mb-2 border-b border-gray-200">
            <div className="container mx-auto px-4 max-w-[1400px]">
                <div className="flex justify-center overflow-x-auto no-scrollbar gap-8 md:gap-12">
                    {categories.map((cat) => (
                        <div key={cat.id} className="flex flex-col items-center cursor-pointer group min-w-[64px] relative">
                            <div className="w-16 h-16 mb-1 overflow-hidden transition-transform group-hover:scale-105">
                                <img src={cat.icon} alt={cat.label} className="w-full h-full object-contain" />
                            </div>
                            <span className="text-sm font-semibold text-gray-700 whitespace-nowrap group-hover:text-blue-600">
                                {cat.label}
                            </span>

                            {/* Dropdown Indicator (Simulated) */}
                            {cat.hasDropdown && (
                                <div className="hidden group-hover:block absolute top-full left-1/2 transform -translate-x-1/2 bg-white shadow-xl rounded-md border border-gray-100 py-2 w-48 z-40 mt-2">
                                    <div className="w-4 h-4 bg-white transform rotate-45 absolute -top-2 left-1/2 -translate-x-1/2 border-t border-l border-gray-100"></div>
                                    <ul className="text-sm text-gray-700">
                                        <li className="px-4 py-2 hover:bg-gray-50 hover:text-blue-600">Popular Brands</li>
                                        <li className="px-4 py-2 hover:bg-gray-50 hover:text-blue-600">New Arrivals</li>
                                        <li className="px-4 py-2 hover:bg-gray-50 hover:text-blue-600">Best Sellers</li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CategoryBar;
