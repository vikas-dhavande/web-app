import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

const ProfileLayout = () => {
    return (
        <div className="profile-layout" style={{ display: 'flex', maxWidth: '1200px', margin: '100px auto 40px', gap: '30px', padding: '0 20px' }}>
            <aside className="profile-sidebar" style={{ width: '250px', flexShrink: 0 }}>
                <div className="sidebar-card" style={{ background: 'var(--surface-color)', padding: '20px', borderRadius: '12px', boxShadow: 'var(--card-shadow)' }}>
                    <h3 style={{ marginTop: 0, color: 'var(--text-color)' }}>My Profile</h3>
                    <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <NavLink
                            to="/profile"
                            end
                            className={({ isActive }) => isActive ? 'profile-link active' : 'profile-link'}
                            style={{ padding: '10px', textDecoration: 'none', color: 'var(--text-color)', borderRadius: '8px', transition: '0.2s' }}
                        >
                            Basic Details
                        </NavLink>
                        <NavLink
                            to="/profile/roles"
                            className={({ isActive }) => isActive ? 'profile-link active' : 'profile-link'}
                            style={{ padding: '10px', textDecoration: 'none', color: 'var(--text-color)', borderRadius: '8px', transition: '0.2s' }}
                        >
                            My Medical Roles
                        </NavLink>
                        <NavLink
                            to="/profile/settings"
                            className={({ isActive }) => isActive ? 'profile-link active' : 'profile-link'}
                            style={{ padding: '10px', textDecoration: 'none', color: 'var(--text-color)', borderRadius: '8px', transition: '0.2s' }}
                        >
                            Settings
                        </NavLink>
                    </nav>
                </div>
            </aside>
            <main className="profile-content" style={{ flex: 1, background: 'var(--surface-color)', padding: '30px', borderRadius: '12px', boxShadow: 'var(--card-shadow)' }}>
                <Outlet />
            </main>
        </div>
    );
};

export default ProfileLayout;
