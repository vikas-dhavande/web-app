import React, { useEffect, useState } from 'react';
import './Footer.css';
import footerData from '../footer_data.json'; // Simulating API fetch source

const Footer = () => {
    const [data, setData] = useState(null);

    // Simulate fetching data from Backend API
    useEffect(() => {
        // In a real app: fetch('/api/footer').then(res => res.json()).then(setData);
        setData(footerData);
    }, []);

    if (!data) return null;

    return (
        <footer className="medical-footer">
            <div className="footer-content">
                <div className="footer-columns">
                    {data.columns.map((column, index) => (
                        <div key={index} className="footer-column">
                            <h3>{column.title}</h3>
                            <ul>
                                {column.links.map((link, idx) => (
                                    <li key={idx}>
                                        <a href={link.url}>{link.label}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div className="footer-bottom">
                <div className="bottom-container">
                    <div className="brand-info">
                        <i className="fas fa-heartbeat logo-icon"></i>
                        <span className="brand-name">MedPortal</span>
                    </div>

                    <p className="copyright">{data.copyright}</p>

                    <div className="social-icons">
                        {data.socials.map((social, idx) => (
                            <a key={idx} href={social.url} target="_blank" rel="noopener noreferrer" aria-label={social.platform}>
                                <i className={social.icon}></i>
                            </a>
                        ))}
                    </div>
                </div>
                {data.disclaimer && <p className="disclaimer-text">{data.disclaimer}</p>}
            </div>
        </footer>
    );
};

export default Footer;
