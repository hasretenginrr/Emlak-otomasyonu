import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EvListele from './Evler/EvListele';
import EvIcerik from './Evler/EvIcerik';
import Login from './Login/Login';
import EvEkle from './Evler/EvEkle';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        {loggedIn ? (
          <>
            <Route path="/" element={<EvListele onLogout={handleLogout} />} />
            <Route path="/ev-listele" element={<EvListele onLogout={handleLogout} />} />
            <Route path="/ev-ekle" element={<EvEkle />} />
            <Route path="/ev/:id" element={<EvIcerik />} />
            <Route path="*" element={<Navigate to="/" />} /> {/* Tanımsız rotalar için yönlendirme */}
          </>
        ) : (
          <>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="*" element={<Navigate to="/login" />} /> {/* Tanımsız rotalar için yönlendirme */}
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
