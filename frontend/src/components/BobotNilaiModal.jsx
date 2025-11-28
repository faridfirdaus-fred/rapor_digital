import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BobotNilaiModal({ kelas, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    bobotHarian: 40,
    bobotUas: 60
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadBobotNilai();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [kelas.id]);

  const loadBobotNilai = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/bobot-nilai/${kelas.id}`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      setFormData({
        bobotHarian: response.data.bobotHarian,
        bobotUas: response.data.bobotUas
      });
    } catch (err) {
      console.error('Error loading bobot nilai:', err);
    } finally {
      setInitialLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseInt(value) || 0
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.bobotHarian + formData.bobotUas !== 100) {
      setError('Total bobot harus 100%');
      return;
    }

    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('token');
      await axios.post(
        `${import.meta.env.VITE_API_URL}/bobot-nilai/${kelas.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );

      alert('Bobot nilai berhasil diperbarui untuk semua siswa di kelas ini');
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.error || 'Gagal menyimpan bobot nilai');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            ⚙️ Pengaturan Bobot Nilai
          </h2>
          <p className="text-gray-600 mt-1">Kelas {kelas.nama}</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800 mb-2">
              <strong>ℹ️ Catatan:</strong> Pengaturan ini akan diterapkan ke semua nilai siswa di kelas ini.
            </p>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Bobot Nilai Harian (%)
            </label>
            <input
              type="number"
              name="bobotHarian"
              value={formData.bobotHarian}
              onChange={handleChange}
              min="0"
              max="100"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Bobot Nilai UAS (%)
            </label>
            <input
              type="number"
              name="bobotUas"
              value={formData.bobotUas}
              onChange={handleChange}
              min="0"
              max="100"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6 p-4 rounded-lg" style={{
            backgroundColor: formData.bobotHarian + formData.bobotUas === 100 ? '#d1fae5' : '#fee2e2',
            borderColor: formData.bobotHarian + formData.bobotUas === 100 ? '#059669' : '#dc2626',
            borderWidth: '2px'
          }}>
            <p className="font-bold text-lg" style={{
              color: formData.bobotHarian + formData.bobotUas === 100 ? '#059669' : '#dc2626'
            }}>
              Total: {formData.bobotHarian + formData.bobotUas}%
              {formData.bobotHarian + formData.bobotUas === 100 ? ' ✓' : ' (harus 100%)'}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2.5 px-4 rounded-lg font-semibold transition duration-200"
              disabled={loading}
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-semibold transition duration-200 disabled:bg-gray-400"
              disabled={loading || formData.bobotHarian + formData.bobotUas !== 100}
            >
              {loading ? '⏳ Menyimpan...' : '💾 Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default BobotNilaiModal;
