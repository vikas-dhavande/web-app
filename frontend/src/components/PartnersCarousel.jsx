import React, { useState, useEffect, useRef } from 'react';
import './PartnersCarousel.css';

/**
 * PartnersCarousel Component
 * Displays partner/trusted organization logos in a horizontal auto-scrolling carousel
 * Features: smooth continuous auto-scroll (right-to-left), navigation arrows, pause on hover, infinite loop, grayscale-to-color effect
 */
const PartnersCarousel = ({
    title = "Trusted By Leading Healthcare Organizations",
    autoScrollSpeed = 3000, // milliseconds per slide (used for manual navigation timing)
    logos = [] // Will come from API
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [visibleLogos, setVisibleLogos] = useState(4); // Default for desktop
    const carouselRef = useRef(null);
    const autoScrollRef = useRef(null);

    // Duplicate logos for seamless infinite loop
    const duplicatedLogos = logos.length > 0 ? [...logos, ...logos, ...logos] : [];

    // Responsive logo count based on screen width
    useEffect(() => {
        const updateVisibleLogos = () => {
            const width = window.innerWidth;
            if (width < 640) {
                setVisibleLogos(2); // Mobile
            } else if (width < 1024) {
                setVisibleLogos(3); // Tablet
            } else {
                setVisibleLogos(4); // Desktop
            }
        };

        updateVisibleLogos();
        window.addEventListener('resize', updateVisibleLogos);
        return () => window.removeEventListener('resize', updateVisibleLogos);
    }, []);

    // Auto-scroll functionality with smooth continuous movement
    useEffect(() => {
        if (!isHovered && logos.length > 0) {
            autoScrollRef.current = setInterval(() => {
                handleNext();
            }, autoScrollSpeed);
        }

        return () => {
            if (autoScrollRef.current) {
                clearInterval(autoScrollRef.current);
            }
        };
    }, [isHovered, currentIndex, logos.length, autoScrollSpeed]);

    // Navigation handlers
    const handleNext = () => {
        setCurrentIndex((prevIndex) => {
            // Infinite loop: move to next, reset when reaching the duplicate set
            const nextIndex = prevIndex + 1;
            if (nextIndex >= logos.length) {
                // Reset to beginning seamlessly
                setTimeout(() => setCurrentIndex(0), 600); // Match transition duration
                return logos.length;
            }
            return nextIndex;
        });
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => {
            // Infinite loop: move to previous
            if (prevIndex <= 0) {
                return logos.length - 1;
            }
            return prevIndex - 1;
        });
    };

    // Keyboard navigation
    const handleKeyDown = (e) => {
        if (e.key === 'ArrowLeft') {
            handlePrev();
        } else if (e.key === 'ArrowRight') {
            handleNext();
        }
    };

    // Touch support for mobile swipe
    const [touchStart, setTouchStart] = useState(0);
    const [touchEnd, setTouchEnd] = useState(0);

    const handleTouchStart = (e) => {
        setTouchStart(e.targetTouches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (touchStart - touchEnd > 75) {
            // Swiped left (move right-to-left)
            handleNext();
        }

        if (touchStart - touchEnd < -75) {
            // Swiped right (move left-to-right)
            handlePrev();
        }
    };

    // Calculate transform for carousel sliding
    const getTransform = () => {
        const logoWidth = 100 / visibleLogos; // Percentage width per logo
        return `translateX(-${currentIndex * logoWidth}%)`;
    };

    // If no logos provided, don't render anything
    if (!logos || logos.length === 0) {
        return null;
    }

    return (
        <section className="partners-carousel-section" aria-label="Our trusted partners">
            <div className="partners-carousel-container">

                {/* Section Title */}
                <div className="partners-carousel-header">
                    <h2 className="partners-carousel-title">{title}</h2>
                    <div className="partners-carousel-divider"></div>
                </div>

                {/* Carousel Wrapper */}
                <div
                    className="partners-carousel-wrapper"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    onKeyDown={handleKeyDown}
                    tabIndex="0"
                    role="region"
                    aria-roledescription="carousel"
                    aria-label="Partner logos carousel"
                >

                    {/* Left Arrow */}
                    <button
                        className="partners-carousel-arrow partners-carousel-arrow-left"
                        onClick={handlePrev}
                        aria-label="View previous partners"
                        tabIndex="0"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>

                    {/* Logo Track */}
                    <div className="partners-carousel-track-container" ref={carouselRef}>
                        <div
                            className="partners-carousel-track"
                            style={{
                                transform: getTransform(),
                                gridTemplateColumns: `repeat(${duplicatedLogos.length}, ${100 / visibleLogos}%)`
                            }}
                        >
                            {duplicatedLogos.map((partner, index) => (
                                <div
                                    key={`${partner.id}-${index}`}
                                    className="partners-carousel-logo-wrapper"
                                    aria-label={partner.name}
                                >
                                    <img
                                        src={partner.logoUrl}
                                        alt={partner.altText || `${partner.name} logo`}
                                        className="partners-carousel-logo"
                                        loading="lazy"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right Arrow */}
                    <button
                        className="partners-carousel-arrow partners-carousel-arrow-right"
                        onClick={handleNext}
                        aria-label="View next partners"
                        tabIndex="0"
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>

                {/* Pagination Dots - Show only original logos count */}
                <div className="partners-carousel-pagination" role="tablist">
                    {logos.map((_, index) => (
                        <button
                            key={index}
                            className={`partners-carousel-dot ${index === (currentIndex % logos.length) ? 'active' : ''}`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to slide ${index + 1}`}
                            aria-selected={index === (currentIndex % logos.length)}
                            role="tab"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PartnersCarousel;
