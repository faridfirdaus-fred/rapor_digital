import React, { useState } from 'react';
import { kelasAPI } from '../services/api';

function KelasForm({ kelas, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    nama: kelas?.nama || '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nama) {
      alert('Pilih kelas terlebih dahulu');
      return;
    }

    try {
      setLoading(true);
      if (kelas) {
        await kelasAPI.update(kelas.id, formData);
        alert('Kelas berhasil diupdate');
      } else {
        await kelasAPI.create(formData);
        alert('Kelas berhasil ditambahkan');
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving kelas:', error);
      alert('Gagal menyimpan kelas: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {kelas ? 'Edit Kelas' : 'Tambah Kelas Baru'}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Kelas
            </label>
            <select
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Pilih Kelas</option>
              <option value="1">Kelas 1</option>
              <option value="2">Kelas 2</option>
              <option value="3">Kelas 3</option>
              <option value="4">Kelas 4</option>
              <option value="5">Kelas 5</option>
              <option value="6">Kelas 6</option>
            </select>
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

export default KelasForm;
