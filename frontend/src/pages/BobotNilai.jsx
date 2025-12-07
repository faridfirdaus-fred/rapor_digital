import React, { useState } from "react";
import CustomAlert from "../components/CustomAlert";

const BobotNilai = () => {
  const [bobotHarian, setBobotHarian] = useState(40);
  const [bobotUAS, setBobotUAS] = useState(60);
  const [isEditing, setIsEditing] = useState(false);
  const [alert, setAlert] = useState({
    isOpen: false,
    type: "info",
    title: "",
    message: "",
  });

  const handleSave = () => {
    // Validasi total bobot harus 100%
    if (bobotHarian + bobotUAS !== 100) {
      setAlert({
        isOpen: true,
        type: "warning",
        title: "Peringatan",
        message: "Total bobot harus 100%!",
      });
      return;
    }
    setIsEditing(false);
    setAlert({
      isOpen: true,
      type: "success",
      title: "Berhasil!",
      message: "Bobot nilai berhasil disimpan!",
    });
  };

  const handleReset = () => {
    setBobotHarian(40);
    setBobotUAS(60);
  };

  return (
    <div className="p-8 min-h-screen bg-green-50">
      <h2 className="text-2xl font-semibold mb-6">Pengaturan Bobot Nilai</h2>

      <div className="bg-white rounded-lg shadow p-8 max-w-2xl mx-auto">
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-4">Atur Bobot Penilaian</h3>
          <p className="text-gray-600 mb-6">
            Tentukan persentase bobot untuk setiap komponen penilaian. Total
            harus 100%.
          </p>
        </div>

        <div className="space-y-6">
          {/* Bobot Nilai Harian */}
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">📝</span>
              </div>
              <div>
                <h4 className="font-semibold text-lg">Nilai Harian</h4>
                <p className="text-gray-600 text-sm">
                  Tugas, kuis, dan penilaian harian
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {isEditing ? (
                <input
                  type="text"
                  inputMode="numeric"
                  value={bobotHarian}
                  onChange={(e) => {
                    const value = e.target.value.replace(/^0+/, "") || "0";
                    const numValue = parseInt(value);
                    if (value === "" || (numValue >= 0 && numValue <= 100)) {
                      setBobotHarian(value === "" ? 0 : numValue);
                    }
                  }}
                  onBlur={(e) => {
                    if (e.target.value === "") setBobotHarian(0);
                  }}
                  className="w-20 px-3 py-2 border-2 border-green-500 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-green-600"
                  maxLength="3"
                />
              ) : (
                <span className="text-2xl font-bold text-green-600">
                  {bobotHarian}
                </span>
              )}
              <span className="text-lg font-medium">%</span>
            </div>
          </div>

          {/* Bobot UAS */}
          <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">📊</span>
              </div>
              <div>
                <h4 className="font-semibold text-lg">
                  Ujian Akhir Semester (UAS)
                </h4>
                <p className="text-gray-600 text-sm">
                  Penilaian akhir semester
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              {isEditing ? (
                <input
                  type="text"
                  inputMode="numeric"
                  value={bobotUAS}
                  onChange={(e) => {
                    const value = e.target.value.replace(/^0+/, "") || "0";
                    const numValue = parseInt(value);
                    if (value === "" || (numValue >= 0 && numValue <= 100)) {
                      setBobotUAS(value === "" ? 0 : numValue);
                    }
                  }}
                  onBlur={(e) => {
                    if (e.target.value === "") setBobotUAS(0);
                  }}
                  className="w-20 px-3 py-2 border-2 border-green-500 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-green-600"
                  maxLength="3"
                />
              ) : (
                <span className="text-2xl font-bold text-green-600">
                  {bobotUAS}
                </span>
              )}
              <span className="text-lg font-medium">%</span>
            </div>
          </div>

          {/* Total Bobot */}
          <div className="p-4 bg-gray-100 rounded-lg border-2 border-dashed">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-lg">Total Bobot</h4>
              <div className="flex items-center space-x-3">
                <span
                  className={`text-2xl font-bold ${
                    bobotHarian + bobotUAS === 100
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {bobotHarian + bobotUAS}
                </span>
                <span className="text-lg font-medium">%</span>
              </div>
            </div>
            {bobotHarian + bobotUAS !== 100 && (
              <p className="text-red-600 text-sm mt-2">
                ⚠️ Total bobot harus 100%
              </p>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 mt-8">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Batal
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
              >
                Reset
              </button>
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Simpan
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Edit Bobot
            </button>
          )}
        </div>
      </div>

      {/* Custom Alert */}
      <CustomAlert
        isOpen={alert.isOpen}
        onClose={() => setAlert({ ...alert, isOpen: false })}
        type={alert.type}
        title={alert.title}
        message={alert.message}
      />
    </div>
  );
};

export default BobotNilai;
