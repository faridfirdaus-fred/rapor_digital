# Contributing to Rapor Digital

Terima kasih sudah tertarik untuk berkontribusi pada project Rapor Digital! 🎉

## 📋 Code of Conduct

Dengan berpartisipasi dalam project ini, Anda diharapkan untuk menjaga lingkungan yang ramah dan profesional untuk semua kontributor.

## 🚀 Cara Berkontribusi

### 1. Fork Repository

Fork repository ini ke akun GitHub Anda.

### 2. Clone Repository

```bash
git clone https://github.com/your-username/rapor_digital.git
cd rapor_digital
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Create Branch

Buat branch baru untuk fitur atau fix yang akan dikerjakan:

```bash
git checkout -b feature/nama-fitur
# atau
git checkout -b fix/nama-bug
```

### 5. Develop & Test

Kerjakan perubahan Anda dan pastikan untuk test:

```bash
# Test backend
cd backend
npm run dev

# Test frontend
cd frontend
npm run dev
```

### 6. Commit Changes

Gunakan conventional commits format:

```bash
git add .
git commit -m "feat: menambahkan fitur input nilai sikap"
```

**Commit Message Types:**
- `feat:` - Fitur baru
- `fix:` - Memperbaiki bug
- `docs:` - Update dokumentasi
- `style:` - Perubahan formatting (tidak mengubah code logic)
- `refactor:` - Refactoring code
- `test:` - Menambah atau update tests
- `chore:` - Update dependencies, config, dll
- `perf:` - Performance improvements

### 7. Push to GitHub

```bash
git push origin feature/nama-fitur
```

### 8. Create Pull Request

- Buka repository di GitHub
- Klik "Pull Request"
- Pilih branch Anda
- Isi deskripsi lengkap tentang perubahan yang dibuat
- Submit PR

## 🎯 Development Guidelines

### Code Style

**JavaScript/React:**
- Gunakan ES6+ syntax
- Use `const` dan `let`, hindari `var`
- Prefer arrow functions
- Use destructuring
- Meaningful variable & function names
- Add comments untuk logic yang kompleks

**React Best Practices:**
- Functional components dengan hooks
- Component composition over inheritance
- Keep components small and focused
- Props destructuring
- PropTypes atau TypeScript untuk type checking

**Backend Best Practices:**
- Async/await over callbacks
- Proper error handling
- Input validation
- Secure authentication & authorization
- Follow RESTful API conventions

### File Naming

- **Components**: PascalCase (`StudentCard.jsx`)
- **Utils/Helpers**: camelCase (`formatDate.js`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS.js`)
- **CSS/Styles**: kebab-case (`student-card.css`)

### Folder Structure

Ikuti struktur yang sudah ada di README.md

## 🐛 Bug Reports

Saat melaporkan bug, sertakan:

1. **Deskripsi jelas** tentang bug
2. **Steps to reproduce** - langkah-langkah untuk reproduce bug
3. **Expected behavior** - behavior yang diharapkan
4. **Actual behavior** - apa yang terjadi
5. **Screenshots** (jika applicable)
6. **Environment**:
   - OS (Windows/Mac/Linux)
   - Node.js version
   - Browser & version
   - npm version

**Template:**
```markdown
### Bug Description
[Deskripsi singkat bug]

### Steps to Reproduce
1. Go to '...'
2. Click on '...'
3. See error

### Expected Behavior
[Apa yang seharusnya terjadi]

### Actual Behavior
[Apa yang terjadi]

### Screenshots
[Jika ada]

### Environment
- OS: Windows 11
- Node: v18.17.0
- Browser: Chrome 120
```

## 💡 Feature Requests

Untuk request fitur baru:

1. **Check existing issues** - pastikan belum ada yang request fitur yang sama
2. **Describe the feature** - jelaskan fitur yang diinginkan
3. **Use case** - jelaskan kenapa fitur ini penting
4. **Proposed solution** - jika punya ide implementasi

## ✅ Pull Request Checklist

Sebelum submit PR, pastikan:

- [ ] Code mengikuti style guide
- [ ] Tidak ada console.log atau debug code
- [ ] Update dokumentasi jika perlu
- [ ] PR title jelas dan deskriptif
- [ ] PR description menjelaskan perubahan dengan detail
- [ ] Link ke issue terkait (jika ada)
- [ ] Test di local environment
- [ ] No merge conflicts

## 🔍 Review Process

1. Maintainer akan review PR Anda
2. Mungkin ada request untuk perubahan
3. Lakukan perubahan jika diminta
4. Setelah approved, PR akan di-merge

## 📝 Documentation

Jika ada perubahan yang mempengaruhi dokumentasi:

- Update README.md
- Update API documentation
- Update code comments
- Tambahkan examples jika perlu

## 🙋‍♂️ Pertanyaan?

Jika ada pertanyaan:
- Create an issue dengan label `question`
- Diskusi di PR thread
- Contact maintainers

---

**Thank you for contributing! 🎉**
