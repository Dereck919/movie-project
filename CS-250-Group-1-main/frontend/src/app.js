import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// --- Use standard, static imports ---
import Navbar from './components/layout/Navbar.js';
import Footer from './components/layout/Footer.js';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage.js';
import RegisterPage from './pages/RegisterPage';
import SeatSelectionPage from './pages/SeatSelectionPage';
import SnackOrderingPage from './pages/SnackOrderingPage';
import ConfirmationPage from './pages/ConfirmationPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="container" style={{ paddingBottom: '60px' }}> {/* Added padding to prevent footer overlap */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/select-seats/:showtimeId" element={<SeatSelectionPage />} />
            <Route path="/order-snacks" element={<SnackOrderingPage />} />
            <Route path="/confirmation/:bookingId" element={<ConfirmationPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

