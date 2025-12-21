import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import SignInModal from './components/auth/SignInModal';
import EShop from './pages/EShop';
import ProfileLayout from './components/profile/ProfileLayout';
import BasicProfile from './components/profile/BasicProfile';
import RoleSelection from './components/profile/RoleSelection';
import DoctorForm from './components/profile/verification/DoctorForm';
import HospitalForm from './components/profile/verification/HospitalForm';
import LabForm from './components/profile/verification/LabForm';
import FloatingChat from './components/FloatingChat';
import './App.css';

function App() {
  const [isSigninOpen, setIsSigninOpen] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <Header onOpenSignin={() => setIsSigninOpen(true)} />

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/eshop" element={<EShop />} />

            {/* Profile Routes */}
            <Route path="/profile" element={<ProfileLayout />}>
              <Route index element={<BasicProfile />} />
              <Route path="roles" element={<RoleSelection />} />
              <Route path="verify/doctor" element={<DoctorForm />} />
              <Route path="verify/hospital" element={<HospitalForm />} />
              <Route path="verify/lab" element={<LabForm />} />
              <Route path="settings" element={<div style={{ padding: '20px', color: 'var(--text-color)' }}>Settings Placeholder</div>} />
            </Route>
          </Routes>
        </main>

        <Footer />

        <SignInModal
          isOpen={isSigninOpen}
          onClose={() => setIsSigninOpen(false)}
        />

        {/* Floating Chat - Visible on all pages */}
        <FloatingChat />
      </div>
    </Router>
  );
}

export default App;
