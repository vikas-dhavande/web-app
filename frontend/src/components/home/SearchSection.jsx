import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';

const PLACEHOLDERS = [
    "Search hospitals near you",
    "Search doctors by specialty",
    "Search medicines & pharmacy",
    "Search medical colleges",
    "Search health blogs & articles"
];

const TYPING_SPEED = 100;
const DELETING_SPEED = 50;
const PAUSE_DURATION = 2000;

const SearchSection = () => {
    const [placeholder, setPlaceholder] = useState('');
    const [isTyping, setIsTyping] = useState(true);
    const [textRequest, setTextRequest] = useState(''); // The text we want to display
    const [index, setIndex] = useState(0); // Index of current placeholder
    const [charIndex, setCharIndex] = useState(0); // Current character position
    const [isDeleting, setIsDeleting] = useState(false);
    const inputRef = useRef(null);
    const timeoutRef = useRef(null);

    // Animation Logic
    useEffect(() => {
        if (!isTyping) return;

        const currentText = PLACEHOLDERS[index];

        const handleTyping = () => {
            if (isDeleting) {
                // Deleting
                if (charIndex > 0) {
                    setPlaceholder(currentText.substring(0, charIndex - 1));
                    setCharIndex(charIndex - 1);
                    timeoutRef.current = setTimeout(handleTyping, DELETING_SPEED);
                } else {
                    // Done deleting, switch to next text
                    setIsDeleting(false);
                    setIndex((prev) => (prev + 1) % PLACEHOLDERS.length);
                    timeoutRef.current = setTimeout(handleTyping, 500); // Small pause before typing next
                }
            } else {
                // Typing
                if (charIndex < currentText.length) {
                    setPlaceholder(currentText.substring(0, charIndex + 1));
                    setCharIndex(charIndex + 1);
                    timeoutRef.current = setTimeout(handleTyping, TYPING_SPEED);
                } else {
                    // Done typing, pause
                    setIsDeleting(true);
                    timeoutRef.current = setTimeout(handleTyping, PAUSE_DURATION);
                }
            }
        };

        timeoutRef.current = setTimeout(handleTyping, isDeleting ? DELETING_SPEED : TYPING_SPEED);

        return () => clearTimeout(timeoutRef.current);
    }, [charIndex, isDeleting, index, isTyping]);


    const handleFocus = () => {
        setIsTyping(false);
        setPlaceholder(PLACEHOLDERS[index]); // Show full text or keep current? User said "stops immediately". Let's show empty or keep current.
        // Requirement: "Animation stops immediately when User clicks the input".
        // Requirement: "Animation resumes when Input loses focus".
        // Let's clear it to allow typing easily.
        setPlaceholder('');
    };

    const handleBlur = (e) => {
        if (!e.target.value) {
            setIsTyping(true);
            setIndex((prev) => (prev + 1) % PLACEHOLDERS.length); // Start with next one likely
            setCharIndex(0);
            setIsDeleting(false);
        }
    };

    return (
        <section className="search-section">
            <h1 className="search-heading">Hello, What Do You Want To Learn?</h1>
            <div className="search-wrapper">
                <input
                    ref={inputRef}
                    type="text"
                    className="animated-search-input"
                    placeholder={!isTyping && !placeholder ? "Start typing..." : placeholder}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                <FaSearch className="search-input-icon" />
            </div>

            {/* Quick Link Buttons as per visual reference - optional but adds flair */}
            <div className="quick-links">
                <button className="quick-chip bg-green">Price Drop: DSA Course</button>
                <button className="quick-chip">Master DS & ML</button>
                <button className="quick-chip">Master DevOps</button>
            </div>
        </section>
    );
};

export default SearchSection;
