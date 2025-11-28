import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import HomePage from './HomePage';
import KelasDetailPage from './KelasDetailPage';

function Dashboard() {
  const navigate = useNavigate();
  const [selectedKelas, setSelectedKelas] = useState(null);

  const handleSelectKelas = (kelas) => {
    setSelectedKelas(kelas);
    navigate(`/kelas/${kelas.id}`);
  };

  const handleBackToHome = () => {
    setSelectedKelas(null);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route 
          path="/" 
          element={<HomePage onSelectKelas={handleSelectKelas} />} 
        />
        <Route 
          path="/kelas/:id" 
          element={
            selectedKelas ? (
              <KelasDetailPage kelas={selectedKelas} onBack={handleBackToHome} />
            ) : (
              <div className="container mx-auto px-4 py-8">
                <button 
                  onClick={() => navigate('/')}
                  className="text-blue-600 hover:text-blue-800"
                >
                  ← Back to Home
                </button>
                <p className="mt-4">Loading...</p>
              </div>
            )
          } 
        />
      </Routes>
    </div>
  );
}

export default Dashboard;
