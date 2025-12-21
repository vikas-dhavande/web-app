import React, { useState } from 'react';
import TopHeader from './TopHeader';
import NavHeader from './NavHeader';
import MobileMenu from './MobileMenu';

const Header = ({ onOpenSignin }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(true);
    };

    return (
        // Sticky Wrapper
        <header className="fixed top-0 left-0 w-full z-50 shadow-sm transition-all duration-300 bg-white dark:bg-[#1e293b] border-b dark:border-slate-700">
            {/* 1. Main Top Bar (Logo, Search, User) */}
            <TopHeader onOpenSignin={onOpenSignin} toggleMenu={toggleMenu} />

            {/* 2. Navigation Bar (Menu, Contact) - Hidden on Mobile */}
            <NavHeader />

            {/* 3. Mobile Navigation Drawer */}
            <MobileMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                onOpenSignin={onOpenSignin}
            />
        </header>
    );
};

export default Header;
