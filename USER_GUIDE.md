# User Guide - Rapor Digital

## Panduan Penggunaan Aplikasi

### Memulai Aplikasi

1. Pastikan backend dan frontend sudah berjalan
2. Buka browser dan akses `http://localhost:5173`

---

## 1. Mengelola Kelas

### Menambah Kelas Baru

1. Di halaman utama, klik tombol **"+ Tambah Kelas"**
2. Isi form yang muncul:
   - **Nama Kelas**: Contoh "4A", "4B", "5A"
   - **Tingkat**: Angka tingkat kelas, contoh 4, 5, 6
3. Klik tombol **"Simpan"**
4. Kelas baru akan muncul sebagai card di halaman utama

### Mengedit Kelas

1. Pada card kelas yang ingin diedit, klik tombol **"Edit"** (warna kuning)
2. Ubah data yang diperlukan
3. Klik **"Simpan"**

### Menghapus Kelas

1. Pada card kelas yang ingin dihapus, klik tombol **"Hapus"** (warna merah)
2. Konfirmasi penghapusan
3. **Perhatian**: Semua siswa dan nilai dalam kelas tersebut akan terhapus

---

## 2. Mengelola Siswa

### Melihat Daftar Siswa

1. Klik card kelas atau tombol **"Lihat Detail"** pada kelas
2. Anda akan dibawa ke halaman detail kelas dengan tabel siswa

### Menambah Siswa Baru

1. Di halaman detail kelas, klik **"+ Tambah Siswa"**
2. Isi form:
   - **NISN**: Nomor Induk Siswa Nasional (10 digit)
   - **Nama Lengkap**: Nama siswa
   - **Nomor Absen**: Nomor urut absen dalam kelas
3. Klik **"Simpan"**

### Mengedit Data Siswa

1. Di tabel siswa, klik tombol **"Edit"** pada siswa yang ingin diubah
2. Update data yang diperlukan
3. Klik **"Simpan"**

### Menghapus Siswa

1. Di tabel siswa, klik tombol **"Hapus"** pada siswa
2. Konfirmasi penghapusan
3. **Perhatian**: Semua nilai siswa tersebut akan terhapus

---

## 3. Mengelola Nilai

### Membuka Modal Nilai

1. Di tabel siswa, klik tombol **"Nilai"** (warna hijau) pada siswa
2. Modal nilai akan terbuka menampilkan:
   - Summary nilai (jumlah mata pelajaran, total nilai, rata-rata)
   - Daftar nilai per mata pelajaran

### Menambah Nilai

1. Di modal nilai, klik **"+ Tambah Nilai"**
2. Isi form:
   - **Mata Pelajaran**: Contoh "Matematika", "Bahasa Indonesia"
   - **Nilai Harian**: 0-100
   - **UAS**: Nilai Ujian Akhir Semester 0-100
3. Klik **"Simpan"**
4. Total nilai akan otomatis dihitung (Nilai Harian + UAS)

### Mengedit Nilai

1. Di tabel nilai, klik tombol **"Edit"** pada nilai yang ingin diubah
2. Update nilai harian atau UAS
3. Klik **"Simpan"**

### Menghapus Nilai

1. Di tabel nilai, klik tombol **"Hapus"**
2. Konfirmasi penghapusan

---

## 4. Sorting dan Ranking

### Mengurutkan Siswa

Di halaman detail kelas, Anda dapat mengurutkan siswa dengan 3 cara:

#### 1. Berdasarkan Absen
- Klik tombol **"Absen"**
- Siswa diurutkan dari nomor absen terkecil ke terbesar

#### 2. Berdasarkan Abjad
- Klik tombol **"Abjad"**
- Siswa diurutkan berdasarkan nama A-Z

#### 3. Berdasarkan Ranking
- Klik tombol **"Ranking"**
- Siswa diurutkan berdasarkan rata-rata nilai (tertinggi ke terendah)
- Kolom ranking akan muncul dengan badge nomor
- **Catatan**: Ranking dihitung otomatis di backend

---

## 5. Memahami Perhitungan Nilai

### Total Nilai Per Mata Pelajaran
```
Total = Nilai Harian + UAS
```
Contoh: Nilai Harian 85 + UAS 90 = Total 175

### Jumlah Total Nilai Siswa
```
Jumlah = Total semua mata pelajaran
```
Contoh:
- Matematika: 175
- Bahasa Indonesia: 180
- IPA: 170
- **Jumlah Total: 525**

### Rata-rata Nilai
```
Rata-rata = Jumlah Total / Jumlah Mata Pelajaran
```
Contoh: 525 / 3 = 175

---

## Tips Penggunaan

### Workflow Recommended

1. **Setup Kelas**
   - Buat semua kelas yang Anda kelola di awal
   
2. **Input Data Siswa**
   - Masukkan data semua siswa per kelas
   - Pastikan NISN dan nomor absen benar
   
3. **Input Nilai Bertahap**
   - Nilai dapat ditambahkan kapan saja
   - Tidak perlu menambahkan semua nilai sekaligus
   - Bisa input per mata pelajaran sesuai jadwal ujian
   
4. **Monitoring Performa**
   - Gunakan mode ranking untuk melihat performa siswa
   - Monitor siswa dengan nilai rendah untuk tindak lanjut

### Best Practices

- **NISN**: Pastikan NISN unik dan benar
- **Nomor Absen**: Gunakan nomor urut yang konsisten
- **Nama Mata Pelajaran**: Gunakan nama yang konsisten (contoh: "Matematika" bukan "MTK" atau "Mat")
- **Backup Data**: Karena menggunakan in-memory database, data akan hilang saat server restart. Catat data penting atau upgrade ke database persistent

---

## Troubleshooting

### Data Hilang Setelah Restart
**Penyebab**: Backend menggunakan in-memory database  
**Solusi**: Data akan reset setiap kali server restart. Untuk production, upgrade ke PostgreSQL/MongoDB

### Nilai Tidak Muncul
**Kemungkinan**:
1. Refresh halaman
2. Pastikan nilai sudah tersimpan (cek console error)
3. Restart backend dan frontend

### Ranking Tidak Sesuai
**Catatan**: Ranking dihitung berdasarkan rata-rata nilai  
**Solusi**: Pastikan semua nilai sudah diinput dengan benar

---

## Keyboard Shortcuts

- `Esc` - Tutup modal yang terbuka
- `Enter` - Submit form (saat focus di input)

---

## Support

Jika mengalami masalah:
1. Cek console browser (F12) untuk error
2. Cek terminal backend untuk error server
3. Restart aplikasi
4. Buat issue di GitHub repository
