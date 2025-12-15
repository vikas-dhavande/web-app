import React, { useState } from 'react';

const DoctorForm = () => {
    const [formData, setFormData] = useState({
        regNumber: '',
        specialization: '',
        experience: '',
        degree: null,
        idProof: null
    });

    const handleChange = (e) => {
        if (e.target.type === 'file') {
            setFormData({ ...formData, [e.target.name]: e.target.files[0] });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitting Doctor Verification:", formData);
        // API submit logic
    };

    return (
        <div className="verification-form">
            <h2 style={{ color: 'var(--text-color)', marginTop: 0 }}>Doctor Verification</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-color)' }}>Medical Council Registration Number</label>
                    <input type="text" name="regNumber" onChange={handleChange} className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-color)' }} required />
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-color)' }}>Specialization</label>
                    <select name="specialization" onChange={handleChange} className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-color)' }}>
                        <option value="">Select Specialization</option>
                        <option value="General Physician">General Physician</option>
                        <option value="Cardiologist">Cardiologist</option>
                        <option value="Dermatologist">Dermatologist</option>
                    </select>
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-color)' }}>Years of Experience</label>
                    <input type="number" name="experience" onChange={handleChange} className="form-control" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid var(--border-color)', background: 'var(--input-bg)', color: 'var(--text-color)' }} />
                </div>
                <div className="form-group" style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-color)' }}>Upload Medical Degree (PDF/Image)</label>
                    <input type="file" name="degree" onChange={handleChange} className="form-control" style={{ color: 'var(--text-color)' }} />
                </div>

                <button type="submit" className="btn-primary" style={{ padding: '10px 20px', borderRadius: '5px', background: 'var(--primary-color)', color: '#fff', border: 'none', cursor: 'pointer' }}>Submit for Verification</button>
            </form>
        </div>
    );
};

export default DoctorForm;
