# 🎓 Rapor Digital - Sistem Informasi Rapor Sekolah

[![React](https://img.shields.io/badge/React-19.2.0-blue.svg)](https://reactjs.org/)
[![Express](https://img.shields.io/badge/Express-5.1.0-green.svg)](https://expressjs.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![License: ISC](https://img.shields.io/badge/License-ISC-yellow.svg)](https://opensource.org/licenses/ISC)

Aplikasi web modern untuk mengelola rapor digital di lingkungan sekolah. Sistem ini memudahkan guru dalam menginput nilai siswa, mengelola data akademik, dan mencetak rapor secara digital.

## 📋 Daftar Isi

- [Fitur Utama](#-fitur-utama)
- [Tech Stack](#-tech-stack)
- [Struktur Project](#-struktur-project)
- [Prerequisites](#-prerequisites)
- [Instalasi](#-instalasi)
- [Menjalankan Aplikasi](#-menjalankan-aplikasi)
- [Penggunaan](#-penggunaan)
- [API Documentation](#-api-documentation)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Fitur Utama

### 🎯 Untuk Admin & Guru
- ✅ **Dashboard Interaktif** - Tampilan card untuk setiap kelas dengan jumlah siswa
- 👥 **Manajemen Siswa** - CRUD data siswa lengkap dengan NISN, nama, dan nomor absen
- 📚 **Manajemen Kelas** - Pengelolaan kelas dengan tingkat
- 📊 **Input Nilai** - Input nilai harian dan UAS untuk berbagai mata pelajaran
- 🔢 **Perhitungan Otomatis** - Total nilai dan rata-rata dihitung otomatis
- 📋 **Sorting Fleksibel** - Urutkan siswa berdasarkan absen, abjad, atau ranking
- 🏆 **Ranking Otomatis** - Ranking dihitung di backend berdasarkan rata-rata nilai

### 📊 Fitur Detail
- **CRUD Kelas**: Buat, edit, dan hapus kelas
- **CRUD Siswa**: Kelola data siswa dengan atribut NISN, nama, dan nomor absen
- **CRUD Nilai**: 
  - Kelola nilai per mata pelajaran
  - Kolom nilai harian dan UAS
  - Dapat menambahkan nilai kapan saja
  - Tampilkan total dan rata-rata
- **Sorting Multi-mode**:
  - Berdasarkan nomor absen
  - Berdasarkan nama (A-Z)
  - Berdasarkan ranking (rata-rata nilai tertinggi)
- **Perhitungan Otomatis**:
  - Jumlah total nilai per siswa
  - Rata-rata nilai per siswa
  - Ranking berdasarkan performa akademik

## 🚀 Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express 5.1** - Web framework minimalis dan fleksibel
- **In-memory Database** - Data storage sementara (dapat di-upgrade ke MongoDB/PostgreSQL)
- **Nodemon** - Auto-restart saat development

### Frontend
- **React 19.2** - UI Library dengan komponen modern
- **Vite 7.2** - Build tool cepat dan efisien
- **Tailwind CSS 4.1** - Utility-first CSS framework
- **Axios-like fetch** - HTTP client untuk API calls

### DevOps & Tools
- **ESLint** - Code linting
- **Git** - Version control
- **npm workspaces** - Monorepo management

## 📁 Struktur Project

```
rapor_digital/
├── backend/                    # Backend Express.js
│   ├── src/
│   │   ├── index.js           # Entry point backend
│   │   ├── models/            # Database models (Kelas, Siswa, Nilai)
│   │   │   ├── database.js    # In-memory database
│   │   │   ├── Kelas.js       # Model Kelas
│   │   │   ├── Siswa.js       # Model Siswa
│   │   │   └── Nilai.js       # Model Nilai
│   │   └── routes/            # API routes
│   │       ├── kelas.js       # Routes untuk kelas
│   │       ├── siswa.js       # Routes untuk siswa
│   │       └── nilai.js       # Routes untuk nilai
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
│
├── frontend/                   # Frontend React
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── assets/            # Images, fonts, etc.
│   │   ├── components/        # Reusable components
│   │   │   ├── KelasCard.jsx       # Card component untuk kelas
│   │   │   ├── KelasForm.jsx       # Form CRUD kelas
│   │   │   ├── SiswaTable.jsx      # Tabel siswa
│   │   │   ├── SiswaForm.jsx       # Form CRUD siswa
│   │   │   ├── NilaiModal.jsx      # Modal untuk nilai
│   │   │   └── NilaiForm.jsx       # Form CRUD nilai
│   │   ├── pages/             # Page components
│   │   │   ├── HomePage.jsx        # Homepage dengan card kelas
│   │   │   └── KelasDetailPage.jsx # Detail kelas dengan tabel siswa
│   │   ├── services/          # API services
│   │   │   └── api.js         # API calls ke backend
│   │   ├── App.jsx            # Root component
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Global styles
│   ├── .env
│   ├── .env.example
│   ├── index.html
│   ├── vite.config.js
│   ├── .gitignore
│   └── package.json
│
├── .gitignore
├── package.json               # Root package.json (workspaces)
└── README.md
```

## 📦 Prerequisites

Sebelum memulai, pastikan Anda telah menginstall:

- **Node.js** (v18.0.0 atau lebih baru) - [Download](https://nodejs.org/)
- **npm** (v9.0.0 atau lebih baru) - Terinstall otomatis dengan Node.js
- **Git** - [Download](https://git-scm.com/)
- **Text Editor** - Disarankan [VS Code](https://code.visualstudio.com/)

Cek versi yang terinstall:
```bash
node --version
npm --version
git --version
```

## 🔧 Instalasi

### 1️⃣ Clone Repository

```bash
git clone <repository-url>
cd rapor_digital
```

### 2️⃣ Install Dependencies

Project ini menggunakan **npm workspaces** untuk mengelola monorepo. Install semua dependencies dengan satu perintah:

```bash
npm install
```

Perintah di atas akan menginstall dependencies untuk:
- Root project
- Backend (`/backend`)
- Frontend (`/frontend`)

### 3️⃣ Konfigurasi Environment Variables

#### Frontend Configuration

File `.env` sudah dibuat. Pastikan isinya sesuai:
```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# App Configuration
VITE_APP_NAME=Rapor Digital
VITE_APP_VERSION=1.0.0
```

> **Note**: Backend menggunakan in-memory database, tidak perlu konfigurasi database.

## 🚀 Menjalankan Aplikasi

### Development Mode

#### Opsi 1: Menjalankan dari Root (Recommended)

Menggunakan npm workspaces, Anda bisa menjalankan backend dan frontend dari root folder:

**Terminal 1 - Backend:**
```bash
npm run dev:backend
```

**Terminal 2 - Frontend:**
```bash
npm run dev:frontend
```

#### Opsi 2: Menjalankan Terpisah

**Backend:**
```bash
cd backend
npm run dev
```
Backend berjalan di: `http://localhost:5000`

**Frontend:**
```bash
cd frontend
npm run dev
```
Frontend berjalan di: `http://localhost:5173`

### Production Mode

#### Build Frontend
```bash
cd frontend
npm run build
npm run preview
```

#### Run Backend
```bash
cd backend
npm start
```

## 📖 Penggunaan

### Akses Aplikasi

1. **Frontend**: Buka browser dan akses `http://localhost:5173`
2. **Backend API**: `http://localhost:5000/api`

### Alur Penggunaan

#### 1. Buat Kelas
- Di homepage, klik tombol "**+ Tambah Kelas**"
- Isi form dengan nama kelas (contoh: "4A") dan tingkat (contoh: 4)
- Klik "**Simpan**"
- Kelas akan muncul sebagai card di homepage

#### 2. Tambah Siswa
- Klik card kelas atau tombol "**Lihat Detail**" pada kelas yang ingin dikelola
- Di halaman detail kelas, klik "**+ Tambah Siswa**"
- Isi form dengan:
  - **NISN**: Nomor Induk Siswa Nasional
  - **Nama**: Nama lengkap siswa
  - **No. Absen**: Nomor urut absen
- Klik "**Simpan**"
- Siswa akan muncul di tabel

#### 3. Input Nilai
- Di tabel siswa, klik tombol "**Nilai**" pada siswa yang ingin diinput nilainya
- Modal nilai akan terbuka
- Klik "**+ Tambah Nilai**"
- Isi form dengan:
  - **Mata Pelajaran**: Nama pelajaran (contoh: "Matematika")
  - **Nilai Harian**: Nilai 0-100
  - **UAS**: Nilai Ujian Akhir Semester 0-100
- Klik "**Simpan**"
- Nilai akan ditampilkan dengan total otomatis

#### 4. Lihat Ranking
- Di halaman detail kelas, klik tombol sorting "**Ranking**"
- Siswa akan diurutkan berdasarkan rata-rata nilai (tertinggi ke terendah)
- Ranking akan ditampilkan dengan badge nomor

#### 5. Sorting Lainnya
- **Absen**: Urutkan berdasarkan nomor absen
- **Abjad**: Urutkan berdasarkan nama A-Z

### Test API Endpoint

Test backend API dengan curl atau Postman:

```bash
curl http://localhost:5000/api
```

Response:
```json
{
  "message": "Rapor Digital API - Backend Ready"
}
```

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Kelas
```http
GET    /api/kelas           # Get all kelas with jumlah siswa
GET    /api/kelas/:id       # Get kelas by ID with jumlah siswa
POST   /api/kelas           # Create new kelas
                            # Body: { nama: string, tingkat: number }
PUT    /api/kelas/:id       # Update kelas
                            # Body: { nama: string, tingkat: number }
DELETE /api/kelas/:id       # Delete kelas (cascade delete siswa & nilai)
```

#### Siswa
```http
GET    /api/siswa                    # Get all siswa
GET    /api/siswa?kelasId=:id        # Get siswa by kelas
GET    /api/siswa?kelasId=:id&sort=nama     # Sort by nama (A-Z)
GET    /api/siswa?kelasId=:id&sort=absen    # Sort by nomor absen
GET    /api/siswa?kelasId=:id&sort=ranking  # Sort by ranking (avg nilai)
GET    /api/siswa/:id                # Get siswa by ID with nilai summary
POST   /api/siswa                    # Create new siswa
                                     # Body: { kelasId, nisn, nama, noAbsen }
PUT    /api/siswa/:id                # Update siswa
                                     # Body: { nisn, nama, noAbsen, kelasId }
DELETE /api/siswa/:id                # Delete siswa (cascade delete nilai)
```

#### Nilai
```http
GET    /api/nilai                    # Get all nilai
GET    /api/nilai?siswaId=:id        # Get nilai by siswa
GET    /api/nilai/:id                # Get nilai by ID
GET    /api/nilai/summary/:siswaId   # Get summary (jumlah & rata-rata)
POST   /api/nilai                    # Create new nilai
                                     # Body: { siswaId, mataPelajaran, nilaiHarian, uas }
PUT    /api/nilai/:id                # Update nilai
                                     # Body: { mataPelajaran, nilaiHarian, uas }
DELETE /api/nilai/:id                # Delete nilai
```

### Response Examples

#### GET /api/kelas
```json
[
  {
    "id": 1,
    "nama": "4A",
    "tingkat": 4,
    "jumlahSiswa": 30,
    "createdAt": "2025-11-28T...",
    "updatedAt": "2025-11-28T..."
  }
]
```

#### GET /api/siswa?kelasId=1&sort=ranking
```json
[
  {
    "id": 1,
    "kelasId": 1,
    "nisn": "1234567890",
    "nama": "Ahmad Zaki",
    "noAbsen": 1,
    "totalNilai": 850.5,
    "rataRata": 85.05,
    "jumlahNilai": 10,
    "ranking": 1
  }
]
```

#### GET /api/nilai/summary/1
```json
{
  "jumlah": 850.5,
  "rataRata": 85.05,
  "details": [
    {
      "mataPelajaran": "Matematika",
      "nilaiHarian": 85,
      "uas": 90,
      "total": 175
    }
  ]
}
```

## 🗺️ Roadmap

### Phase 1: Core Features ✅ (Completed)
- [x] Setup project structure
- [x] Basic Express backend with in-memory database
- [x] Basic React frontend with Tailwind CSS
- [x] CRUD Kelas
- [x] CRUD Siswa
- [x] CRUD Nilai dengan kolom harian dan UAS
- [x] Perhitungan jumlah dan rata-rata nilai
- [x] Sorting: Absen, Abjad, Ranking
- [x] Ranking calculation di backend
- [x] UI dengan card untuk kelas
- [x] UI dengan table untuk siswa
- [x] Modal untuk manajemen nilai

### Phase 2: Database & Persistence 🔜 (Next)
- [ ] Migrasi ke PostgreSQL/MongoDB
- [ ] Setup Prisma/Mongoose ORM
- [ ] Data persistence
- [ ] Database migration scripts

### Phase 3: Authentication & Authorization 📋
- [ ] User authentication (JWT)
- [ ] Role-based access (Guru, Siswa, Admin)
- [ ] Login/Register pages
- [ ] Protected routes

### Phase 4: Advanced Features 💡
- [ ] Upload foto siswa
- [ ] Generate PDF rapor
- [ ] Export data ke Excel
- [ ] Dashboard analytics dengan charts
- [ ] Search & filter advanced

### Phase 5: Optimization & Scale ⚡
- [ ] Unit & integration tests
- [ ] Performance optimization
- [ ] Caching implementation
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Production deployment

### Future Enhancements 🚀
- [ ] Mobile app (React Native)
- [ ] Attendance system
- [ ] Parent-teacher messaging
- [ ] Real-time notifications
- [ ] Multi-semester support

## 🛠️ Development

### Folder Structure Best Practices

**Backend:**
```
backend/src/
├── config/          # Environment & database config
├── controllers/     # Route controllers (business logic)
├── models/          # Mongoose models
├── routes/          # Express routes
├── middlewares/     # Custom middlewares (auth, validation)
├── utils/           # Helper functions
└── index.js         # Entry point
```

**Frontend:**
```
frontend/src/
├── components/      # Reusable components
├── pages/           # Page components (routes)
├── services/        # API service layer
├── store/           # State management (Zustand)
├── hooks/           # Custom React hooks
├── utils/           # Helper functions
├── assets/          # Images, fonts, etc.
└── App.jsx          # Root component
```

### Code Style

- **ESLint** untuk linting JavaScript
- **Prettier** untuk formatting (optional, recommended)
- Follow **Airbnb Style Guide** untuk JavaScript/React

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/nama-fitur

# Commit changes
git add .
git commit -m "feat: tambah fitur nama-fitur"

# Push to remote
git push origin feature/nama-fitur

# Create Pull Request di GitHub
```

### Commit Message Convention

Gunakan conventional commits:
- `feat:` - Fitur baru
- `fix:` - Bug fix
- `docs:` - Update dokumentasi
- `style:` - Format code (tidak mengubah logic)
- `refactor:` - Refactoring code
- `test:` - Menambah tests
- `chore:` - Update dependencies, config, dll

## 🤝 Contributing

Contributions are welcome! Ikuti langkah berikut:

1. Fork repository ini
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 🐛 Bug Reports

Jika menemukan bug, silakan buat issue dengan detail:
- Deskripsi bug
- Steps to reproduce
- Expected behavior
- Screenshots (jika ada)
- Environment (OS, Node version, dll)

## 📝 License

This project is licensed under the **ISC License**.

## 👨‍💻 Authors

- **Developer** - Initial work

## 🙏 Acknowledgments

- Terima kasih kepada komunitas open source
- Inspired by modern school management systems
- Built with ❤️ for education

## 📞 Contact & Support

Jika ada pertanyaan atau butuh bantuan:
- Create an issue di GitHub
- Email: [kelempat@gmail.com]

---

**Happy Coding! 🚀**

Made with ☕ and 💻 for Indonesian Schools
