import React from 'react';

const Home = () => {
    return (
        <div className="content" style={{ paddingTop: '100px', textAlign: 'center', minHeight: '60vh' }}>
            <h1>Welcome to the Global Medical Platform</h1>
            <p>Your unified gateway to Healthcare, Pharma, and Education.</p>
            <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
                <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', width: '200px' }}>
                    <h3>Pharma Shop</h3>
                    <p>Buy medicines & equipment.</p>
                </div>
                <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', width: '200px' }}>
                    <h3>Hospitals</h3>
                    <p>Find & Book appointments.</p>
                </div>
                <div style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', width: '200px' }}>
                    <h3>Colleges</h3>
                    <p>Explore medical education.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
