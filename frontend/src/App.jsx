import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import SignInModal from './components/auth/SignInModal';
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
          </Routes>
        </main>

        <Footer />

        <SignInModal
          isOpen={isSigninOpen}
          onClose={() => setIsSigninOpen(false)}
        />
      </div>
    </Router>
  );
}

export default App;
