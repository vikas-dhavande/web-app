import React from 'react';

const Home = () => {
    return (
        <div className="content home-container">
            <section className="hero-section">
                <h1>Welcome to the Global Medical Platform</h1>
                <p>Your unified gateway to Healthcare, Pharma, and Education.</p>
            </section>

            <div className="home-grid">
                <div className="home-card">
                    <h3>Pharma Shop</h3>
                    <p>Buy medicines & equipment.</p>
                </div>
                <div className="home-card">
                    <h3>Hospitals</h3>
                    <p>Find & Book appointments.</p>
                </div>
                <div className="home-card">
                    <h3>Colleges</h3>
                    <p>Explore medical education.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
