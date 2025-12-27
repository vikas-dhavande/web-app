import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useAuth, AuthProvider } from './context/AuthContext';
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
import BlogLayout from './components/blog/BlogLayout';
import BlogList from './pages/blog/BlogList';
import BlogDetail from './pages/blog/BlogDetail';
import BlogEditor from './pages/blog/BlogEditor';
import './App.css';

// --- Temporary Placeholder Components ---
const Placeholder = ({ title }) => (
  <div className="p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700">
    <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">{title}</h2>
    <p className="text-gray-500 dark:text-gray-400">This section is currently under development. Stay tuned!</p>
  </div>
);

const LogoutAction = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  React.useEffect(() => {
    logout().then(() => navigate('/'));
  }, [logout, navigate]);
  return (
    <div className="flex items-center justify-center p-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  );
};

function App() {
  const [isSigninOpen, setIsSigninOpen] = useState(false);

  return (
    <AuthProvider>
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
                <Route path=":userId" element={<BasicProfile />} />
                <Route path="roles" element={<RoleSelection />} />
                <Route path="verify/doctor" element={<DoctorForm />} />
                <Route path="verify/hospital" element={<HospitalForm />} />
                <Route path="verify/lab" element={<LabForm />} />
                <Route path="settings" element={<Placeholder title="Settings" />} />
                <Route path="orders" element={<Placeholder title="Your Orders" />} />
                <Route path="medical-records" element={<Placeholder title="Medical Records" />} />
                <Route path="subscriptions" element={<Placeholder title="Subscriptions & Packs" />} />
                <Route path="vouchers" element={<Placeholder title="Redeem Voucher" />} />
                <Route path="payment" element={<Placeholder title="Payment Methods" />} />
                <Route path="address" element={<Placeholder title="My Addresses" />} />
                <Route path="support" element={<Placeholder title="Customer Support" />} />
                <Route path="logout" element={<LogoutAction />} />
              </Route>

              {/* Blog Routes */}
              <Route path="/blog" element={<BlogLayout />}>
                <Route index element={<BlogList />} />
                <Route path="create" element={<BlogEditor />} />
                <Route path=":id" element={<BlogDetail />} />
                <Route path=":id/edit" element={<BlogEditor />} />
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
    </AuthProvider>
  );
}

export default App;
