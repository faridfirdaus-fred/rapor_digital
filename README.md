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
- ✅ **Dashboard Interaktif** - Statistik dan overview data sekolah
- 👥 **Manajemen Siswa** - CRUD data siswa lengkap dengan foto
- 📚 **Manajemen Kelas** - Pengelolaan kelas dan wali kelas
- 📖 **Mata Pelajaran** - Daftar mata pelajaran dengan KKM
- 📊 **Input Nilai** - Input nilai pengetahuan, keterampilan, dan sikap
- 📄 **Generate Rapor** - Cetak rapor digital otomatis
- 🔐 **Autentikasi & Otorisasi** - Role-based access control

### 👨‍🎓 Untuk Siswa & Orang Tua
- 📊 **Lihat Nilai** - Akses nilai per mata pelajaran
- 📋 **Lihat Rapor** - Preview rapor semester
- 📥 **Download Rapor** - Download rapor dalam format PDF

## 🚀 Tech Stack

### Frontend
- **React 19.2** - UI Library dengan komponen modern
- **Vite 7.2** - Build tool cepat dan efisien
- **React Router** - Navigasi dan routing
- **Axios** - HTTP client untuk API calls
- **Tailwind CSS** - Utility-first CSS framework
- **React Icons** - Icon library
- **Zustand** - State management (planned)

### Backend
- **Node.js** - JavaScript runtime
- **Express 5.1** - Web framework minimalis dan fleksibel
- **MongoDB** - NoSQL database (planned)
- **Mongoose** - ODM untuk MongoDB (planned)
- **JWT** - Authentication dengan JSON Web Token (planned)
- **Bcrypt** - Password hashing (planned)
- **Nodemon** - Auto-restart saat development

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
│   │   ├── config/            # Konfigurasi (database, env)
│   │   ├── controllers/       # Business logic
│   │   ├── models/            # Database models
│   │   ├── routes/            # API routes
│   │   ├── middlewares/       # Custom middlewares
│   │   └── utils/             # Helper functions
│   ├── .gitignore
│   └── package.json
│
├── frontend/                   # Frontend React
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── assets/            # Images, fonts, etc.
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API services
│   │   ├── store/             # State management
│   │   ├── utils/             # Helper functions
│   │   ├── App.jsx            # Root component
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Global styles
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
- **MongoDB** (v6.0 atau lebih baru) - [Download](https://www.mongodb.com/try/download/community) *(untuk fase development selanjutnya)*
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

#### Backend Configuration

Buat file `.env` di folder `backend/`:

```bash
cd backend
cp .env.example .env
```

Edit file `.env` sesuai kebutuhan:
```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database (MongoDB)
MONGODB_URI=mongodb://localhost:27017/rapor_digital

# JWT Secret
JWT_SECRET=your_super_secret_key_change_in_production
JWT_EXPIRE=7d

# CORS
CLIENT_URL=http://localhost:5173
```

#### Frontend Configuration

Buat file `.env` di folder `frontend/`:

```bash
cd ../frontend
cp .env.example .env
```

Edit file `.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

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

### Default Routes

- `/` - Landing page
- `/login` - Halaman login
- `/dashboard` - Dashboard utama (setelah login)
- `/students` - Manajemen data siswa
- `/classes` - Manajemen kelas
- `/grades` - Input nilai
- `/reports` - Lihat & cetak rapor

### Test API Endpoint

Test backend API dengan curl atau Postman:

```bash
curl http://localhost:5000/api
```

Response:
```json
{
  "message": "Hello from Express API"
}
```

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints (Planned)

#### Authentication
```http
POST   /api/auth/register    # Register user baru
POST   /api/auth/login       # Login user
GET    /api/auth/me          # Get current user
POST   /api/auth/logout      # Logout user
```

#### Students
```http
GET    /api/students         # Get all students
GET    /api/students/:id     # Get student by ID
POST   /api/students         # Create new student
PUT    /api/students/:id     # Update student
DELETE /api/students/:id     # Delete student
```

#### Classes
```http
GET    /api/classes          # Get all classes
GET    /api/classes/:id      # Get class by ID
POST   /api/classes          # Create new class
PUT    /api/classes/:id      # Update class
DELETE /api/classes/:id      # Delete class
```

#### Subjects
```http
GET    /api/subjects         # Get all subjects
GET    /api/subjects/:id     # Get subject by ID
POST   /api/subjects         # Create new subject
PUT    /api/subjects/:id     # Update subject
DELETE /api/subjects/:id     # Delete subject
```

#### Grades
```http
GET    /api/grades           # Get all grades
GET    /api/grades/:id       # Get grade by ID
POST   /api/grades           # Input new grade
PUT    /api/grades/:id       # Update grade
DELETE /api/grades/:id       # Delete grade
GET    /api/grades/student/:studentId  # Get grades by student
```

#### Reports
```http
GET    /api/reports/:studentId/:semester  # Get student report
GET    /api/reports/class/:classId        # Get class reports
POST   /api/reports/generate               # Generate report PDF
```

### Authentication

Semua endpoint (kecuali `/auth/login` dan `/auth/register`) memerlukan JWT token:

```http
Authorization: Bearer <your_jwt_token>
```

## 🗺️ Roadmap

### Phase 1: Foundation ✅ (Current)
- [x] Setup project structure
- [x] Basic Express backend
- [x] Basic React frontend
- [x] npm workspaces configuration

### Phase 2: Core Features 🔄 (In Progress)
- [ ] MongoDB integration
- [ ] User authentication (JWT)
- [ ] CRUD operations untuk semua entities
- [ ] Role-based access control
- [ ] Responsive UI dengan Tailwind CSS

### Phase 3: Advanced Features 🔜
- [ ] Upload foto siswa
- [ ] Generate PDF rapor
- [ ] Dashboard analytics dengan charts
- [ ] Export data ke Excel
- [ ] Email notifications
- [ ] Search & filter data

### Phase 4: Optimization & Scale 📋
- [ ] Unit & integration tests
- [ ] Performance optimization
- [ ] Caching implementation
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Production deployment

### Future Enhancements 💡
- [ ] Mobile app (React Native)
- [ ] Attendance system
- [ ] Payment management (SPP)
- [ ] Parent-teacher messaging
- [ ] Real-time notifications
- [ ] Multi-school support

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
- Email: [your-email@example.com]

---

**Happy Coding! 🚀**

Made with ☕ and 💻 for Indonesian Schools
