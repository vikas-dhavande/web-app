import React from 'react';

const SideBanner = () => {
    return (
        <div className="bg-white p-2 shadow-sm h-full hidden lg:block">
            <div className="relative w-full h-[360px] overflow-hidden rounded-md group cursor-pointer">
                <img
                    src="https://rukminim1.flixcart.com/fk-p-flap/464/708/image/4cd6690ef44559cf.jpg?q=70"
                    alt="Side Promotion"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white text-2xl font-bold mb-2">Health Plus</h3>
                    <p className="text-white/90 mb-4">Exclusive Member Benefits</p>
                    <button className="bg-yellow-400 text-black font-bold py-2 px-4 rounded shadow-md hover:bg-yellow-500 transition-colors self-start">
                        Explore
                    </button>
                 </div> */}
            </div>
        </div>
    );
};

export default SideBanner;
