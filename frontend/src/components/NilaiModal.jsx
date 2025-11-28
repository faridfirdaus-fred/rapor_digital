import React, { useState, useEffect } from 'react';
import { nilaiAPI } from '../services/api';
import NilaiForm from './NilaiForm';

function NilaiModal({ siswa, onClose }) {
  const [nilaiList, setNilaiList] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingNilai, setEditingNilai] = useState(null);

  const loadNilai = async () => {
    try {
      setLoading(true);
      const [nilai, sum] = await Promise.all([
        nilaiAPI.getAll(siswa.id),
        nilaiAPI.getSummary(siswa.id)
      ]);
      setNilaiList(nilai);
      setSummary(sum);
    } catch (error) {
      console.error('Error loading nilai:', error);
      alert('Gagal memuat data nilai');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNilai();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [siswa.id]);

  const handleAddNilai = () => {
    setEditingNilai(null);
    setShowForm(true);
  };

  const handleEditNilai = (nilai) => {
    setEditingNilai(nilai);
    setShowForm(true);
  };

  const handleDeleteNilai = async (id) => {
    if (!confirm('Apakah Anda yakin ingin menghapus nilai ini?')) {
      return;
    }

    try {
      await nilaiAPI.delete(id);
      await loadNilai();
      alert('Nilai berhasil dihapus');
    } catch (error) {
      console.error('Error deleting nilai:', error);
      alert('Gagal menghapus nilai');
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingNilai(null);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingNilai(null);
    loadNilai();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Nilai - {siswa.nama}
              </h2>
              <p className="text-gray-600">NISN: {siswa.nisn}</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 text-2xl"
            >
              ×
            </button>
          </div>
        </div>

        <div className="p-6">
          {summary && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Jumlah Mata Pelajaran</p>
                  <p className="text-2xl font-bold text-blue-600">{summary.details?.length || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Nilai</p>
                  <p className="text-2xl font-bold text-blue-600">{summary.jumlah?.toFixed(2) || '0.00'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Rata-rata</p>
                  <p className="text-2xl font-bold text-blue-600">{summary.rataRata?.toFixed(2) || '0.00'}</p>
                </div>
              </div>
            </div>
          )}

          <div className="mb-4 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-700">Daftar Nilai</h3>
            <button
              onClick={handleAddNilai}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-semibold transition duration-200"
            >
              + Tambah Nilai
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Loading...</p>
            </div>
          ) : nilaiList.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">Belum ada nilai. Tambahkan nilai baru.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Mata Pelajaran</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nilai Harian</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">UAS</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Bobot</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nilai Akhir</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {nilaiList.map((nilai) => {
                    const avgHarian = nilai.nilaiHarian?.length > 0 
                      ? (nilai.nilaiHarian.reduce((sum, n) => sum + n, 0) / nilai.nilaiHarian.length).toFixed(2)
                      : '0.00';
                    
                    return (
                      <tr key={nilai.id} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-gray-800 font-semibold">{nilai.mataPelajaran}</td>
                        <td className="px-4 py-3 text-gray-800">
                          {nilai.nilaiHarian?.length > 0 ? (
                            <div>
                              <span className="text-sm">{nilai.nilaiHarian.join(', ')}</span>
                              <br />
                              <span className="text-xs text-gray-500">Avg: {avgHarian}</span>
                            </div>
                          ) : '-'}
                        </td>
                        <td className="px-4 py-3 text-gray-800">{nilai.uas || 0}</td>
                        <td className="px-4 py-3 text-xs text-gray-600">
                          {nilai.bobotHarian}% : {nilai.bobotUas}%
                        </td>
                        <td className="px-4 py-3 font-bold text-lg text-blue-600">
                          {nilai.nilaiAkhir?.toFixed(2) || '0.00'}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditNilai(nilai)}
                              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm font-semibold transition duration-200"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteNilai(nilai.id)}
                              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold transition duration-200"
                            >
                              Hapus
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {showForm && (
          <NilaiForm
            nilai={editingNilai}
            siswaId={siswa.id}
            kelasId={siswa.kelasId}
            onClose={handleFormClose}
            onSuccess={handleFormSuccess}
          />
        )}
      </div>
    </div>
  );
}

export default NilaiModal;
