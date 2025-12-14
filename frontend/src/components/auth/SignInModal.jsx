import React, { useState } from 'react';
import { FaTimes, FaGoogle, FaFacebookF, FaLinkedinIn, FaApple, FaWindows, FaEye } from 'react-icons/fa';

const SignInModal = ({ isOpen, onClose }) => {
    const [showPassword, setShowPassword] = useState(false);

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target.className === 'modal-overlay') {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="auth-card">
                <span className="close-btn" onClick={onClose}><FaTimes /></span>

                <div className="card-header">
                    <h2>Sign in</h2>
                    <p>Get access to more learning features</p>
                    <div className="register-prompt">
                        <span>Don't have an account?</span>
                        <a href="#" className="signup-link">Register</a>
                    </div>
                </div>

                <div className="social-login-row">
                    <button className="social-btn google-btn"><FaGoogle /></button>
                    <button className="social-btn facebook-btn"><FaFacebookF /></button>
                    <button className="social-btn linkedin-btn"><FaLinkedinIn /></button>
                    <button className="social-btn apple-btn"><FaApple /></button>
                    <button className="social-btn microsoft-btn"><FaWindows /></button>
                </div>

                <div className="divider"><span>or</span></div>

                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <input type="email" placeholder="Email" required />
                    </div>
                    <div className="form-group">
                        <div className="password-input-wrapper" style={{ position: 'relative' }}>
                            <input type={showPassword ? "text" : "password"} placeholder="Password" required />
                            <FaEye
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ position: 'absolute', right: '10px', top: '12px', cursor: 'pointer', color: '#555' }}
                            />
                        </div>
                    </div>
                    <div className="forgot-container" style={{ textAlign: 'right', marginBottom: '10px' }}>
                        <a href="#" className="forgot-link">Forgot your password?</a>
                    </div>
                    <button type="submit" className="primary-btn">
                        <span className="btn-text">Sign In</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignInModal;
