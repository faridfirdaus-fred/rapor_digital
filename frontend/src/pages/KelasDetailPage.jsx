import React, { useState, useEffect } from 'react';
import { siswaAPI } from '../services/api';
import SiswaTable from '../components/SiswaTable';
import SiswaForm from '../components/SiswaForm';
import ImportSiswaModal from '../components/ImportSiswaModal';
import BobotNilaiModal from '../components/BobotNilaiModal';

function KelasDetailPage({ kelas, onBack }) {
  const [siswaList, setSiswaList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showBobotModal, setShowBobotModal] = useState(false);
  const [editingSiswa, setEditingSiswa] = useState(null);
  const [sortBy, setSortBy] = useState('absen');

  const loadSiswa = async () => {
    try {
      setLoading(true);
      const data = await siswaAPI.getAll(kelas.id, sortBy);
      setSiswaList(data);
    } catch (error) {
      console.error('Error loading siswa:', error);
      alert('Gagal memuat data siswa');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSiswa();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kelas.id, sortBy]);

  const handleAddSiswa = () => {
    setEditingSiswa(null);
    setShowForm(true);
  };

  const handleEditSiswa = (siswa) => {
    setEditingSiswa(siswa);
    setShowForm(true);
  };

  const handleDeleteSiswa = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus siswa ini? Semua nilai akan terhapus.')) {
      return;
    }

    try {
      await siswaAPI.delete(id);
      await loadSiswa();
      alert('Siswa berhasil dihapus');
    } catch (error) {
      console.error('Error deleting siswa:', error);
      alert('Gagal menghapus siswa');
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingSiswa(null);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingSiswa(null);
    loadSiswa();
  };

  const handleSortChange = (newSort) => {
    setSortBy(newSort);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <button
          onClick={onBack}
          className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2 mb-4"
        >
          ← Kembali ke Beranda
        </button>
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Kelas {kelas.nama}</h1>
            <p className="text-gray-600 mt-2">{siswaList.length} Siswa</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowBobotModal(true)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition duration-200"
            >
              ⚙️ Pengaturan Bobot
            </button>
            <button
              onClick={() => setShowImport(true)}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition duration-200"
            >
              📥 Import CSV
            </button>
            <button
              onClick={handleAddSiswa}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold shadow-md transition duration-200"
            >
              + Tambah Siswa
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-700">Daftar Siswa</h2>
          <div className="flex gap-2">
            <span className="text-gray-600 mr-2">Urutkan:</span>
            <button
              onClick={() => handleSortChange('absen')}
              className={`px-3 py-1 rounded ${sortBy === 'absen' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Absen
            </button>
            <button
              onClick={() => handleSortChange('nama')}
              className={`px-3 py-1 rounded ${sortBy === 'nama' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Abjad
            </button>
            <button
              onClick={() => handleSortChange('ranking')}
              className={`px-3 py-1 rounded ${sortBy === 'ranking' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Ranking
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Loading...</p>
          </div>
        ) : siswaList.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Belum ada siswa. Tambahkan siswa baru.</p>
          </div>
        ) : (
          <SiswaTable
            siswaList={siswaList}
            onEdit={handleEditSiswa}
            onDelete={handleDeleteSiswa}
            showRanking={sortBy === 'ranking'}
          />
        )}
      </div>

      {showForm && (
        <SiswaForm
          siswa={editingSiswa}
          kelasId={kelas.id}
          onClose={handleFormClose}
          onSuccess={handleFormSuccess}
        />
      )}

      {showImport && (
        <ImportSiswaModal
          kelas={kelas}
          onClose={() => setShowImport(false)}
          onSuccess={loadSiswa}
        />
      )}

      {showBobotModal && (
        <BobotNilaiModal
          kelas={kelas}
          onClose={() => setShowBobotModal(false)}
          onSuccess={loadSiswa}
        />
      )}
    </div>
  );
}

export default KelasDetailPage;
