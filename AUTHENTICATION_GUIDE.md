# Authentication Guide - Rapor Digital

## Overview

Sistem Rapor Digital sekarang dilengkapi dengan fitur authentication lengkap:
- **Register**: Buat akun baru dengan email dan password
- **Login**: Masuk ke aplikasi dengan kredensial
- **Forgot Password**: Reset password melalui email verification
- **Protected Routes**: Hanya user yang login dapat mengakses aplikasi

## Backend Features

### Security
- **Password Hashing**: Menggunakan bcryptjs (10 salt rounds)
- **JWT Authentication**: Token berlaku 7 hari
- **Secure Middleware**: Semua routes utama dilindungi
- **Email Verification**: Reset password token berlaku 1 jam

### API Endpoints

#### 1. Register
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "john@example.com",
    "name": "John Doe",
    "createdAt": "2025-11-28T..."
  }
}
```

#### 2. Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "john@example.com",
    "name": "John Doe"
  }
}
```

#### 3. Forgot Password
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "john@example.com"
}
```

**Response:**
```json
{
  "message": "If the email exists, a reset link has been sent",
  "resetToken": "abc123..." // Only in test mode
}
```

#### 4. Reset Password
```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "abc123...",
  "newPassword": "newpassword123"
}
```

**Response:**
```json
{
  "message": "Password reset successful"
}
```

### Protected Routes

Semua routes berikut memerlukan authentication:
```http
Authorization: Bearer <your_jwt_token>
```

- `GET /api/kelas` - Get all classes
- `POST /api/kelas` - Create class
- `PUT /api/kelas/:id` - Update class
- `DELETE /api/kelas/:id` - Delete class
- `GET /api/siswa` - Get all students
- `POST /api/siswa` - Create student
- `PUT /api/siswa/:id` - Update student
- `DELETE /api/siswa/:id` - Delete student
- `GET /api/nilai` - Get all grades
- `POST /api/nilai` - Create grade
- `PUT /api/nilai/:id` - Update grade
- `DELETE /api/nilai/:id` - Delete grade

## Frontend Features

### Pages

#### 1. Login Page (`/login`)
- Email & password input
- Remember me checkbox
- Link ke forgot password
- Link ke register page
- Auto redirect ke dashboard setelah login

#### 2. Register Page (`/register`)
- Full name input
- Email input
- Password input (min 6 characters)
- Confirm password
- Link ke login page
- Auto login dan redirect setelah register

#### 3. Forgot Password Page (`/forgot-password`)
- Two-step process:
  1. **Request Reset**: Input email untuk minta reset token
  2. **Reset Password**: Input token dan password baru
- Dapat switch antara kedua mode
- Support URL parameter `?token=xxx` untuk langsung ke reset mode

#### 4. Dashboard (Protected)
- Hanya dapat diakses setelah login
- Navbar dengan user info dan logout button
- Semua fitur kelas, siswa, nilai

### Auth Flow

```
┌─────────────┐
│   Landing   │
│    /login   │
└──────┬──────┘
       │
       ├──[Not Logged In]──────────────────┐
       │                                   │
       ▼                                   ▼
┌─────────────┐                    ┌──────────────┐
│Login Page   │                    │Register Page │
│             │◄───────────────────│              │
└──────┬──────┘                    └──────┬───────┘
       │                                   │
       │         ┌──────────────┐          │
       │         │Forgot Pass   │          │
       └────────►│              │          │
                 └──────────────┘          │
                                           │
       ┌───────────────────────────────────┘
       │
       ▼
┌─────────────┐
│ Set Token   │
│ in Storage  │
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Dashboard  │
│  (Protected)│
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Logout    │
│Clear Storage│
└──────┬──────┘
       │
       └──► Back to Login
```

### Authentication Context

#### Provider
```jsx
import { AuthProvider } from './contexts/AuthContext';

<AuthProvider>
  <App />
</AuthProvider>
```

#### Usage
```jsx
import { useAuth } from './contexts/AuthContext';

function MyComponent() {
  const { user, token, isAuthenticated, login, logout } = useAuth();
  
  // Use auth state and methods
}
```

#### Methods
- `login(token, user)` - Set authentication
- `logout()` - Clear authentication
- `isAuthenticated` - Boolean
- `user` - User object
- `token` - JWT token
- `loading` - Loading state

### Protected Routes

```jsx
import ProtectedRoute from './components/ProtectedRoute';

<Route
  path="/dashboard"
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>
```

Auto redirect ke `/login` jika tidak authenticated.

## Email Configuration

### Test Mode (Default)

Jika `EMAIL_USER` dan `EMAIL_PASS` tidak dikonfigurasi, sistem akan berjalan dalam test mode:
- Email tidak benar-benar dikirim
- Reset token akan ditampilkan di console backend
- Reset token juga dikirim dalam API response

**Contoh output console:**
```
📧 Reset Password Email (Test Mode)
To: john@example.com
Reset Token: abc123def456...
Reset Link: http://localhost:5174/reset-password?token=abc123def456...

Copy token ini untuk reset password:
abc123def456...
```

### Production Mode

Untuk menggunakan email sungguhan, tambahkan di `.env` backend:

```env
# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-specific-password
EMAIL_FROM=noreply@rapordigital.com
```

**Untuk Gmail:**
1. Enable 2-Factor Authentication
2. Generate App Password di Google Account settings
3. Gunakan App Password sebagai `EMAIL_PASS`

## Security Best Practices

### Environment Variables

Jangan commit file `.env` ke git! Update `.gitignore`:
```
.env
```

### JWT Secret

Untuk production, gunakan secret yang kuat:
```env
JWT_SECRET=your-very-long-random-secret-key-here
```

Generate dengan:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Password Requirements

- Minimum 6 characters
- Validasi di frontend dan backend
- Hashed dengan bcrypt (10 salt rounds)

### Token Expiration

- JWT: 7 days
- Reset Token: 1 hour

## Testing

### Test Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Test Protected Route
```bash
# Get token from login response
TOKEN="your-jwt-token-here"

curl http://localhost:5000/api/kelas \
  -H "Authorization: Bearer $TOKEN"
```

### Test Forgot Password
```bash
curl -X POST http://localhost:5000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

### Test Reset Password
```bash
curl -X POST http://localhost:5000/api/auth/reset-password \
  -H "Content-Type: application/json" \
  -d '{"token":"reset-token-from-email","newPassword":"newpassword123"}'
```

## Common Issues

### "Invalid token" error
- Token mungkin expired (7 hari)
- Logout dan login kembali

### "No token provided"
- Frontend tidak mengirim Authorization header
- Check localStorage untuk token
- Pastikan `getToken()` function bekerja

### Email tidak terkirim
- Check console backend untuk error
- Verify email credentials
- Pastikan "Less secure app access" enabled (untuk Gmail lama)
- Gunakan App Password untuk Gmail dengan 2FA

### Reset token expired
- Token reset hanya berlaku 1 jam
- Request token baru melalui forgot password

## Migration Notes

### Dari versi sebelumnya (tanpa auth):

1. **Data akan tetap ada** - In-memory database masih menyimpan kelas/siswa/nilai
2. **Perlu register** - User harus register/login untuk akses
3. **Token required** - Semua API calls butuh token
4. **Update API calls** - Frontend otomatis menambahkan token

### Future Improvements

- [ ] Email verification saat register
- [ ] Refresh token mechanism
- [ ] Role-based access (Admin, Guru, Siswa)
- [ ] User profile management
- [ ] Change password (saat logged in)
- [ ] Account deletion
- [ ] Login history
- [ ] Session management

## License

MIT
