import React, { useState, useEffect } from 'react';
import { kelasAPI } from '../services/api';
import KelasCard from '../components/KelasCard';
import KelasForm from '../components/KelasForm';

function HomePage({ onSelectKelas }) {
  const [kelasList, setKelasList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingKelas, setEditingKelas] = useState(null);

  const loadKelas = async () => {
    try {
      setLoading(true);
      const data = await kelasAPI.getAll();
      setKelasList(data);
    } catch (error) {
      console.error('Error loading kelas:', error);
      alert('Gagal memuat data kelas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadKelas();
  }, []);

  const handleAddKelas = () => {
    setEditingKelas(null);
    setShowForm(true);
  };

  const handleEditKelas = (kelas) => {
    setEditingKelas(kelas);
    setShowForm(true);
  };

  const handleDeleteKelas = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus kelas ini? Semua siswa dan nilai akan terhapus.')) {
      return;
    }

    try {
      await kelasAPI.delete(id);
      await loadKelas();
      alert('Kelas berhasil dihapus');
    } catch (error) {
      console.error('Error deleting kelas:', error);
      alert('Gagal menghapus kelas');
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingKelas(null);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingKelas(null);
    loadKelas();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Classes</h1>
          <p className="text-gray-600 mt-2">Manage your classes and students</p>
        </div>
        <button
          onClick={handleAddKelas}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition duration-200"
        >
          + Tambah Kelas
        </button>
      </div>

      {kelasList.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Belum ada kelas. Mulai dengan menambahkan kelas baru.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {kelasList.map((kelas) => (
            <KelasCard
              key={kelas.id}
              kelas={kelas}
              onSelect={() => onSelectKelas(kelas)}
              onEdit={() => handleEditKelas(kelas)}
              onDelete={() => handleDeleteKelas(kelas.id)}
            />
          ))}
        </div>
      )}

      {showForm && (
        <KelasForm
          kelas={editingKelas}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}
    </div>
  );
}

export default HomePage;
