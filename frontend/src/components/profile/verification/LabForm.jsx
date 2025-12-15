import React, { useState } from 'react';

const LabForm = () => {
    const [formData, setFormData] = useState({
        labName: '',
        labType: 'Pathology',
        accreditation: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting Lab Verification:", formData);
    };

    return (
        <div className="verification-form">
            <h2 style={{ color: 'var(--text-color)', marginTop: 0 }}>Diagnostic Lab Verification</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-color)' }}>Lab Name</label>
                    <input type="text" name="labName" onChange={handleChange} className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-color)' }} required />
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-color)' }}>Accreditation (NABL / Others)</label>
                    <input type="text" name="accreditation" onChange={handleChange} className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-color)' }} />
                </div>

                <button type="submit" className="btn-primary" style={{ padding: '10px 20px', borderRadius: '5px', background: 'var(--primary-color)', color: '#fff', border: 'none', cursor: 'pointer' }}>Submit</button>
            </form>
        </div>
    );
};

export default LabForm;
