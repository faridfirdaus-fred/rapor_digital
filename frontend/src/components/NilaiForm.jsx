import React, { useState } from 'react';
import { nilaiAPI } from '../services/api';

function NilaiForm({ nilai, siswaId, kelasId, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    siswaId: nilai?.siswaId || siswaId,
    kelasId: nilai?.kelasId || kelasId,
    mataPelajaran: nilai?.mataPelajaran || '',
    nilaiHarian: nilai?.nilaiHarian || [],
    uas: nilai?.uas || '',
    bobotHarian: nilai?.bobotHarian || 40,
    bobotUas: nilai?.bobotUas || 60,
  });
  const [nilaiHarianInput, setNilaiHarianInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'uas' ? parseFloat(value) || '' : 
              name === 'bobotHarian' || name === 'bobotUas' ? parseInt(value) || '' : 
              value
    }));
  };

  const handleAddNilaiHarian = () => {
    const nilai = parseFloat(nilaiHarianInput);
    if (!isNaN(nilai) && nilai >= 0 && nilai <= 100) {
      setFormData(prev => ({
        ...prev,
        nilaiHarian: [...prev.nilaiHarian, nilai]
      }));
      setNilaiHarianInput('');
    } else {
      alert('Masukkan nilai antara 0-100');
    }
  };

  const handleRemoveNilaiHarian = (index) => {
    setFormData(prev => ({
      ...prev,
      nilaiHarian: prev.nilaiHarian.filter((_, i) => i !== index)
    }));
  };

  const avgNilaiHarian = formData.nilaiHarian.length > 0 
    ? formData.nilaiHarian.reduce((sum, n) => sum + n, 0) / formData.nilaiHarian.length 
    : 0;

  const nilaiAkhir = formData.nilaiHarian.length > 0
    ? ((avgNilaiHarian * formData.bobotHarian) + ((formData.uas || 0) * formData.bobotUas)) / 100
    : ((formData.uas || 0) * formData.bobotUas) / 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.mataPelajaran) {
      alert('Mata pelajaran harus diisi');
      return;
    }

    if (formData.bobotHarian + formData.bobotUas !== 100) {
      alert('Total bobot harus 100%');
      return;
    }

    try {
      setLoading(true);
      if (nilai) {
        await nilaiAPI.update(nilai.id, formData);
        alert('Nilai berhasil diupdate');
      } else {
        await nilaiAPI.create(formData);
        alert('Nilai berhasil ditambahkan');
      }
      onSuccess();
    } catch (error) {
      console.error('Error saving nilai:', error);
      alert('Gagal menyimpan nilai: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {nilai ? '📝 Edit Nilai' : '➕ Tambah Nilai Baru'}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Mata Pelajaran *
            </label>
            <input
              type="text"
              name="mataPelajaran"
              value={formData.mataPelajaran}
              onChange={handleChange}
              placeholder="Contoh: Matematika, Bahasa Indonesia"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <label className="block text-gray-700 font-semibold mb-2">
              📚 Nilai Harian ({formData.nilaiHarian.length} nilai)
            </label>
            
            <div className="flex gap-2 mb-3">
              <input
                type="number"
                value={nilaiHarianInput}
                onChange={(e) => setNilaiHarianInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddNilaiHarian())}
                placeholder="Masukkan nilai (0-100)"
                min="0"
                max="100"
                step="0.01"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleAddNilaiHarian}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition"
              >
                + Tambah
              </button>
            </div>

            {formData.nilaiHarian.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.nilaiHarian.map((n, index) => (
                  <div key={index} className="flex items-center gap-2 bg-blue-100 px-3 py-1 rounded-full">
                    <span className="font-semibold text-blue-800">{n}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveNilaiHarian(index)}
                      className="text-red-600 hover:text-red-800 font-bold"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            {formData.nilaiHarian.length > 0 && (
              <p className="text-sm text-gray-600 mt-2">
                Rata-rata: <span className="font-bold text-blue-600">{avgNilaiHarian.toFixed(2)}</span>
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              📝 Nilai UAS
            </label>
            <input
              type="number"
              name="uas"
              value={formData.uas}
              onChange={handleChange}
              placeholder="0-100"
              min="0"
              max="100"
              step="0.01"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <label className="block text-blue-800 font-semibold mb-3">
              ⚖️ Pengaturan Bobot Penilaian
            </label>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Bobot Harian (%)
                </label>
                <input
                  type="number"
                  name="bobotHarian"
                  value={formData.bobotHarian}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Bobot UAS (%)
                </label>
                <input
                  type="number"
                  name="bobotUas"
                  value={formData.bobotUas}
                  onChange={handleChange}
                  min="0"
                  max="100"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-3 text-sm">
              <p className={`font-semibold ${formData.bobotHarian + formData.bobotUas === 100 ? 'text-green-600' : 'text-red-600'}`}>
                Total: {formData.bobotHarian + formData.bobotUas}% 
                {formData.bobotHarian + formData.bobotUas !== 100 && ' (harus 100%)'}
              </p>
            </div>
          </div>

          <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-sm text-gray-700 mb-1">Nilai Akhir:</p>
            <p className="text-3xl font-bold text-green-600">
              {nilaiAkhir.toFixed(2)}
            </p>
            {formData.nilaiHarian.length > 0 && formData.uas && (
              <p className="text-xs text-gray-500 mt-2">
                ({avgNilaiHarian.toFixed(2)} × {formData.bobotHarian}%) + ({formData.uas} × {formData.bobotUas}%)
              </p>
            )}
          </div>

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
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-semibold transition duration-200"
              disabled={loading}
            >
              {loading ? '⏳ Menyimpan...' : '💾 Simpan'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NilaiForm;
