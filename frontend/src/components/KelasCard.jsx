import React from 'react';

function KelasCard({ kelas, onSelect, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition duration-200 overflow-hidden">
      <div className="bg-linear-to-r from-blue-500 to-blue-600 p-4">
        <h3 className="text-2xl font-bold text-white">Kelas {kelas.nama}</h3>
      </div>
      
      <div className="p-4">
        <div className="mb-4">
          <p className="text-gray-600 text-sm">Jumlah Siswa</p>
          <p className="text-3xl font-bold text-gray-800">{kelas.jumlahSiswa || 0}</p>
        </div>

        <div className="flex flex-col gap-2">
          <button
            onClick={onSelect}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-semibold transition duration-200"
          >
            Lihat Detail
          </button>
          <div className="flex gap-2">
            <button
              onClick={onEdit}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded font-semibold transition duration-200"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded font-semibold transition duration-200"
            >
              Hapus
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default KelasCard;
