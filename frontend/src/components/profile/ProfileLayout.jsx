import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { FaUser, FaStethoscope, FaCog } from 'react-icons/fa';

const ProfileLayout = () => {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pt-[140px] md:pt-[160px] pb-12 transition-colors duration-300">
            <div className="container mx-auto px-4 max-w-[1440px]">
                {/* Breadcrumbs / Page Header */}
                <div className="flex items-center justify-between mb-8 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
                    <h1 className="text-xl font-bold text-slate-800 dark:text-white">User Profile</h1>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                        <NavLink to="/" className="hover:text-blue-600 transition-colors">Home</NavLink>
                        <span>/</span>
                        <span className="text-blue-600 font-medium">User Profile</span>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-72 flex-shrink-0">
                        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 overflow-hidden">
                            <div className="p-6">
                                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Application</h3>
                                <nav className="space-y-1">
                                    <NavLink
                                        to="/profile"
                                        end
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                                ? 'bg-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-none'
                                                : 'text-slate-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700'
                                            }`
                                        }
                                    >
                                        <FaUser className="text-lg" />
                                        <span className="font-semibold">User Profile</span>
                                    </NavLink>
                                    <NavLink
                                        to="/profile/roles"
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                                ? 'bg-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-none'
                                                : 'text-slate-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700'
                                            }`
                                        }
                                    >
                                        <FaStethoscope className="text-lg" />
                                        <span className="font-semibold">Medical Roles</span>
                                    </NavLink>
                                    <NavLink
                                        to="/profile/settings"
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${isActive
                                                ? 'bg-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-none'
                                                : 'text-slate-600 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-700'
                                            }`
                                        }
                                    >
                                        <FaCog className="text-lg" />
                                        <span className="font-semibold">Settings</span>
                                    </NavLink>
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
