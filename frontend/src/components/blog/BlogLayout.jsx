import React from 'react';
import { Outlet } from 'react-router-dom';

const BlogLayout = () => {
    return (
        <div className="bg-gray-50 dark:bg-slate-900 min-h-screen pb-20">
            {/* 
                We could add a Blog-specific secondary header here if needed, 
                resembling the 'nav' in the reference implementation 
                (Home, Dashboard, My Profile, Logout).
                For now, the main App Header handles most of this.
            */}
            <div className="container mx-auto px-4 py-8 max-w-7xl animate-fadeIn">
                <Outlet />
            </div>
        </div>
    );
};

export default BlogLayout;
