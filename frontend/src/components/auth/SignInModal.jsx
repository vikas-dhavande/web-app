import React, { useState } from 'react';
import { FaTimes, FaGoogle, FaFacebookF, FaLinkedinIn, FaApple, FaWindows, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const SignInModal = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target.className === 'modal-overlay') {
            onClose();
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await login({ email, password });
            onClose();
            navigate('/profile');
        } catch (err) {
            setError(err.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
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

                {error && <div style={{ color: '#ff6b6b', marginBottom: '10px', fontSize: '14px' }}>{error}</div>}

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <div className="password-input-wrapper" style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
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
                    <button type="submit" className="primary-btn" disabled={loading}>
                        <span className="btn-text">{loading ? 'Signing In...' : 'Sign In'}</span>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignInModal;
