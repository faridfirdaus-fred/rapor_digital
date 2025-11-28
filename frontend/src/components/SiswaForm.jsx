import React, { useState } from 'react';
import { siswaAPI } from '../services/api';

function SiswaForm({ siswa, kelasId, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    kelasId: siswa?.kelasId || kelasId,
    nisn: siswa?.nisn || '',
    nama: siswa?.nama || '',
    noAbsen: siswa?.noAbsen || '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'noAbsen' ? parseInt(value) || '' : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nisn || !formData.nama || !formData.noAbsen) {
      alert('Semua field harus diisi');
      return;
    }

    try {
      setLoading(true);
      if (siswa) {
        await siswaAPI.update(siswa.id, formData);
        alert('Siswa berhasil diupdate');
      } else {
        await siswaAPI.create(formData);
        alert('Siswa berhasil ditambahkan');
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving siswa:', error);
      alert('Gagal menyimpan siswa: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {siswa ? 'Edit Siswa' : 'Tambah Siswa Baru'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              NISN
            </label>
            <input
              type="text"
              name="nisn"
              value={formData.nisn}
              onChange={handleChange}
              placeholder="Nomor Induk Siswa Nasional"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Nama lengkap siswa"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Nomor Absen
            </label>
            <input
              type="number"
              name="noAbsen"
              value={formData.noAbsen}
              onChange={handleChange}
              placeholder="Nomor urut absen"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded font-semibold transition duration-200"
              disabled={loading}
            >
              Batal
            </button>
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-semibold transition duration-200"
              disabled={loading}
            >
              {loading ? 'Menyimpan...' : 'Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SiswaForm;
