import React, { useState } from 'react';

const HospitalForm = () => {
    const [formData, setFormData] = useState({
        hospitalName: '',
        type: 'Hospital',
        regNumber: '',
        facilities: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting Hospital Verification:", formData);
    };

    return (
        <div className="verification-form">
            <h2 style={{ color: 'var(--text-color)', marginTop: 0 }}>Hospital / Clinic Verification</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-color)' }}>Hospital / Clinic Name</label>
                    <input type="text" name="hospitalName" onChange={handleChange} className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-color)' }} required />
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-color)' }}>Registration Number</label>
                    <input type="text" name="regNumber" onChange={handleChange} className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-color)' }} required />
                </div>

                <button type="submit" className="btn-primary" style={{ padding: '10px 20px', borderRadius: '5px', background: 'var(--primary-color)', color: '#fff', border: 'none', cursor: 'pointer' }}>Submit</button>
            </form>
        </div>
    );
};

export default HospitalForm;
