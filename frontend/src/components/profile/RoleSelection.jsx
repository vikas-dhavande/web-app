import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserMd, FaHospital, FaFlask, FaUser } from 'react-icons/fa';

const RoleCard = ({ icon, title, description, onClick, isSelected }) => (
    <div
        onClick={onClick}
        style={{
            background: isSelected ? 'rgba(65, 105, 225, 0.1)' : 'var(--surface-color)',
            border: `2px solid ${isSelected ? 'var(--primary-color)' : 'var(--border-color)'}`,
            borderRadius: '12px',
            padding: '20px',
            cursor: 'pointer',
            textAlign: 'center',
            transition: 'all 0.3s'
        }}
    >
        <div style={{ fontSize: '2rem', color: 'var(--primary-color)', marginBottom: '10px' }}>{icon}</div>
        <h4 style={{ margin: '10px 0', color: 'var(--text-color)' }}>{title}</h4>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{description}</p>
    </div>
);

const RoleSelection = () => {
    const navigate = useNavigate();

    const handleRoleSelect = (role) => {
        // Navigate to specific verification form
        if (role === 'Doctor') navigate('/profile/verify/doctor');
        if (role === 'Hospital') navigate('/profile/verify/hospital');
        if (role === 'Lab') navigate('/profile/verify/lab');
    };

    return (
        <div className="role-selection">
            <h2 style={{ color: 'var(--text-color)', marginTop: 0 }}>Select Your Medical Role</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>
                Join as a medical professional or entity to access platform features.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                <RoleCard
                    icon={<FaUser />}
                    title="Patient"
                    description="Standard user account for appointments and orders."
                    isSelected={true} // Default
                    onClick={() => { }}
                />
                <RoleCard
                    icon={<FaUserMd />}
                    title="Doctor"
                    description="For medical practitioners."
                    onClick={() => handleRoleSelect('Doctor')}
                />
                <RoleCard
                    icon={<FaHospital />}
                    title="Hospital / Clinic"
                    description="Manage your institution."
                    onClick={() => handleRoleSelect('Hospital')}
                />
                <RoleCard
                    icon={<FaFlask />}
                    title="Diagnostic Lab"
                    description="Laboratory services."
                    onClick={() => handleRoleSelect('Lab')}
                />
            </div>
        </div>
    );
};

export default RoleSelection;
