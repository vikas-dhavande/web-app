import React, { useState, useEffect, useRef } from 'react';
import { FaHospital, FaClinicMedical, FaPills, FaUniversity, FaUserMd } from 'react-icons/fa';
import { statsConfig } from '../../config/statsConfig';

// Icon mapping helper
const iconMap = {
    FaHospital: FaHospital,
    FaClinicMedical: FaClinicMedical,
    FaPills: FaPills,
    FaUniversity: FaUniversity,
    FaUserMd: FaUserMd
};

const CountUp = ({ end, duration = 2000 }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );

        if (countRef.current) {
            observer.observe(countRef.current);
        }

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!isVisible) return;

        let startTime = null;
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            const percentage = Math.min(progress / duration, 1);

            setCount(Math.floor(end * percentage));

            if (progress < duration) {
                window.requestAnimationFrame(animate);
            }
        };

        window.requestAnimationFrame(animate);
    }, [isVisible, end, duration]);

    return <span ref={countRef}>{count}</span>;
};

const StatsSection = () => {
    return (
        <section className="bg-white dark:bg-slate-800 py-12 border-b border-gray-100 dark:border-slate-700 shadow-sm relative z-20 transition-colors duration-300">
            <div className="container mx-auto px-4 max-w-[1440px]">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-4">
                    {statsConfig.map((stat) => {
                        const IconComponent = iconMap[stat.icon];
                        return (
                            <div
                                key={stat.id}
                                className="flex flex-col items-center justify-center p-4 hover:-translate-y-1 transition-transform duration-300 group"
                                data-aos="fade-up"
                                data-aos-delay={stat.id * 100}
                            >
                                <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-3xl text-blue-600 dark:text-blue-400 mb-4 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/40 transition-colors">
                                    {IconComponent && <IconComponent />}
                                </div>
                                <h2 className="text-3xl lg:text-4xl font-bold text-slate-800 dark:text-white mb-2">
                                    <CountUp end={stat.value} />{stat.suffix}
                                </h2>
                                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide text-center">
                                    {stat.label}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
