import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import DBService from '../../services/db.service';

const BasicProfile = () => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            if (user) {
                setLoading(true);
                try {
                    const profileData = await DBService.getProfile(user.$id);
                    setFormData({
                        fullName: profileData.fullName || user.name, // Fallback to auth name
                        email: user.email,
                        phone: profileData.phoneNumber || '',
                        address: profileData.address || ''
                    });
                } catch (error) {
                    console.error("Failed to load profile", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchProfile();
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await DBService.updateProfile(user.$id, {
                fullName: formData.fullName,
                phoneNumber: formData.phone,
                address: formData.address
            });
            alert('Profile updated successfully!');
        } catch (error) {
            console.error("Profile update failed", error);
            alert('Failed to update profile.');
        }
    };

    if (loading) return <div>Loading Profile...</div>;

    return (
        <div className="basic-profile">
            <h2 style={{ color: 'var(--text-color)', marginTop: 0 }}>Basic Information</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-color)' }}>Full Name</label>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="form-control"
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-color)' }}
                    />
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-color)' }}>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        readOnly
                        className="form-control"
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-secondary)', cursor: 'not-allowed' }}
                    />
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-color)' }}>Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="+1 234 567 8900"
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-color)' }}
                    />
                </div>
                <div className="form-group" style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-color)' }}>Address</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="form-control"
                        rows="3"
                        style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-color)' }}
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    style={{ background: 'var(--secondary-color)', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default BasicProfile;
