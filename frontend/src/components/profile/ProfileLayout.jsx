import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
    FaUser, FaShoppingBag, FaFileMedical, FaCrown,
    FaTicketAlt, FaCog, FaHeadset, FaSignOutAlt,
    FaHeartbeat
} from 'react-icons/fa';

const ProfileLayout = () => {
    const navItems = [
        { to: "/profile/orders", icon: <FaShoppingBag />, label: "Orders" },
        {
            to: "/profile/medical-records",
            icon: <FaHeartbeat />,
            label: "Medical Records",
            className: "text-[#ff3b6b]",
            subItems: [
                { to: "/profile/consultations", label: "Consultations" },
                { to: "/profile/diagnostic-tests", label: "Diagnostic Tests" },
                { to: "/profile/health-checkups", label: "Health Checkups" },
            ]
        },
        { to: "/profile/subscriptions", icon: <FaCrown />, label: "Active Packs and Subscription" },
        { to: "/profile/vouchers", icon: <FaTicketAlt />, label: "Redeem Voucher" },
        { to: "/profile", icon: <FaCog />, label: "Account", end: true },
        { to: "/profile/support", icon: <FaHeadset />, label: "Support" },
        { to: "/profile/logout", icon: <FaSignOutAlt />, label: "Logout" },
    ];

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-[140px] md:pt-[160px] pb-12 transition-colors duration-300">
            <div className="container mx-auto px-4 max-w-[1440px]">
                {/* Breadcrumbs */}
                <div className="flex items-center justify-between mb-8 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                    <h1 className="text-xl font-bold text-slate-800 dark:text-white">User Profile</h1>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <NavLink to="/" className="hover:text-blue-600 transition-colors">Home</NavLink>
                        <span>/</span>
                        <span className="text-blue-600 font-medium tracking-tight">User Profile</span>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-80 flex-shrink-0">
                        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.02)] border border-gray-100 dark:border-slate-700/50 overflow-hidden sticky top-[180px]">
                            <div className="p-4 py-8">
                                <nav className="space-y-4">
                                    {navItems.map((item, idx) => (
                                        <div key={idx}>
                                            <NavLink
                                                to={item.to}
                                                end={item.end}
                                                className={({ isActive }) =>
                                                    `flex items-center justify-between px-6 py-3.5 rounded-2xl transition-all duration-300 group ${isActive
                                                        ? 'bg-blue-50/50 dark:bg-blue-900/10 text-blue-600'
                                                        : 'text-slate-600 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-700/30'
                                                    } ${item.className || ''}`
                                                }
                                            >
                                                <span className={`font-semibold text-base transition-colors`}>
                                                    {item.label}
                                                </span>
                                                <span className={`text-xl transition-transform group-hover:scale-110`}>
                                                    {item.icon}
                                                </span>
                                            </NavLink>

                                            {item.subItems && (
                                                <div className="mt-4 ml-6 space-y-4 mb-4">
                                                    {item.subItems.map((sub, sIdx) => (
                                                        <NavLink
                                                            key={sIdx}
                                                            to={sub.to}
                                                            className={({ isActive }) =>
                                                                `block text-sm font-bold transition-all duration-200 ${isActive
                                                                    ? 'text-blue-600'
                                                                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
                                                                }`
                                                            }
                                                        >
                                                            {sub.label}
                                                        </NavLink>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </aside>

                    {/* Content Area */}
                    <main className="flex-1 min-w-0">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default ProfileLayout;
