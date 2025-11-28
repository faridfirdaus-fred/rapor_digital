import React, { useState } from 'react';
import NilaiModal from './NilaiModal';

function SiswaTable({ siswaList, onEdit, onDelete, showRanking }) {
  const [selectedSiswa, setSelectedSiswa] = useState(null);
  const [showNilaiModal, setShowNilaiModal] = useState(false);

  const handleViewNilai = (siswa) => {
    setSelectedSiswa(siswa);
    setShowNilaiModal(true);
  };

  const handleCloseModal = () => {
    setShowNilaiModal(false);
    setSelectedSiswa(null);
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              {showRanking && (
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Rank</th>
              )}
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">No. Absen</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">NISN</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Nama</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Jumlah Nilai</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Rata-rata</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {siswaList.map((siswa) => (
              <tr key={siswa.id} className="hover:bg-gray-50">
                {showRanking && (
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold">
                      {siswa.ranking}
                    </span>
                  </td>
                )}
                <td className="px-4 py-3 text-gray-800">{siswa.noAbsen}</td>
                <td className="px-4 py-3 text-gray-800">{siswa.nisn}</td>
                <td className="px-4 py-3 text-gray-800 font-semibold">{siswa.nama}</td>
                <td className="px-4 py-3 text-gray-800">{siswa.totalNilai?.toFixed(2) || '0.00'}</td>
                <td className="px-4 py-3 text-gray-800">{siswa.rataRata?.toFixed(2) || '0.00'}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewNilai(siswa)}
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm font-semibold transition duration-200"
                    >
                      Nilai
                    </button>
                    <button
                      onClick={() => onEdit(siswa)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm font-semibold transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(siswa.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold transition duration-200"
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showNilaiModal && selectedSiswa && (
        <NilaiModal
          siswa={selectedSiswa}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}

export default SiswaTable;
