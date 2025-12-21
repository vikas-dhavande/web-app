import React, { useState, useEffect } from 'react';
import PartnersCarousel from '../components/PartnersCarousel';

/**
 * Example Usage: Partners Carousel Integration
 * This shows how to integrate the PartnersCarousel component into your homepage
 */

function HomePage() {
    const [partners, setPartners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch partners from API
    useEffect(() => {
        const fetchPartners = async () => {
            try {
                setLoading(true);
                const response = await fetch('/api/partners');
                const data = await response.json();

                if (data.success && data.enabled) {
                    setPartners(data.data);
                } else {
                    // Section is disabled or no data
                    setPartners([]);
                }
            } catch (err) {
                console.error('Error fetching partners:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPartners();
    }, []);

    return (
        <div className="homepage">
            {/* Hero Section */}
            <section className="hero">
                <h1>Welcome to MedPortal</h1>
                <p>Your trusted medical ecosystem</p>
            </section>

            {/* Stats Section */}
            <section className="stats">
                {/* Your stats content */}
            </section>

            {/* Partners Carousel - Only render if we have partners and no error */}
            {!loading && !error && partners.length > 0 && (
                <PartnersCarousel
                    title="Trusted By Leading Healthcare Organizations"
                    autoScrollSpeed={3000}
                    logos={partners}
                />
            )}

            {/* Other Sections */}
            <section className="features">
                {/* Your features */}
            </section>

            {/* Footer */}
            <footer>
                {/* Your footer */}
            </footer>
        </div>
    );
}

export default HomePage;
