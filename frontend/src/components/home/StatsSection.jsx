import React, { useState, useEffect } from 'react';
import { LuBuilding2, LuActivity, LuPill, LuGraduationCap, LuStethoscope } from 'react-icons/lu';

const StatsSection = () => {
    const [stats, setStats] = useState([
        { id: 1, label: "Hospitals", value: 5000, suffix: "+", icon: "hospital" },
        { id: 2, label: "Clinics", value: 600, suffix: "+", icon: "clinic" },
        { id: 3, label: "Pharma & Suppliers", value: 900, suffix: "+", icon: "pharma" },
        { id: 4, label: "Medical Colleges", value: 600, suffix: "+", icon: "college" },
        { id: 5, label: "Doctors Connected", value: 800, suffix: "+", icon: "doctor" }
    ]);

    const getIcon = (iconName) => {
        const icons = {
            hospital: LuBuilding2,
            clinic: LuActivity,
            pharma: LuPill,
            college: LuGraduationCap,
            doctor: LuStethoscope
        };
        return icons[iconName] || LuActivity;
    };

    return (
        <section className="bg-white py-16">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                    {stats.map((stat) => {
                        const Icon = getIcon(stat.icon);
                        return (
                            <div key={stat.id} className="text-center">
                                {/* Icon */}
                                <div className="flex justify-center mb-4">
                                    <Icon className="w-16 h-16 text-blue-600" strokeWidth={1.5} />
                                </div>

                                {/* Number */}
                                <h3 className="text-4xl font-bold text-gray-900 mb-2">
                                    {stat.value}{stat.suffix}
                                </h3>

                                {/* Label */}
                                <p className="text-sm text-gray-600 font-medium">
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
