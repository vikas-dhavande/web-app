import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-gray-200 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400 group"
            aria-label="Toggle Dark Mode"
            title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
            {theme === 'light' ? (
                <FaSun className="text-yellow-500 text-lg transition-transform group-hover:rotate-45" />
            ) : (
                <FaMoon className="text-blue-300 text-lg transition-transform group-hover:-rotate-12" />
            )}
        </button>
    );
};

export default ThemeToggle;
