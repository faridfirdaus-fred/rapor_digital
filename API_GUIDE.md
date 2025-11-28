# Rapor Digital - API Guide

## Quick Start

### 1. Start the Backend
```bash
cd backend
npm run dev
```
Backend runs on: `http://localhost:5000`

### 2. Start the Frontend
```bash
cd frontend
npm run dev
```
Frontend runs on: `http://localhost:5173`

## API Endpoints Documentation

### Kelas Endpoints

#### Get All Kelas
```http
GET /api/kelas
```

**Response:**
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

#### Create Kelas
```http
POST /api/kelas
Content-Type: application/json

{
  "nama": "4A",
  "tingkat": 4
}
```

#### Update Kelas
```http
PUT /api/kelas/1
Content-Type: application/json

{
  "nama": "4B",
  "tingkat": 4
}
```

#### Delete Kelas
```http
DELETE /api/kelas/1
```

### Siswa Endpoints

#### Get Siswa by Kelas (with sorting)
```http
GET /api/siswa?kelasId=1&sort=ranking
```

**Sort Options:**
- `nama` - Alphabetical A-Z
- `absen` - By student number
- `ranking` - By average grade (highest first)

**Response:**
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

#### Create Siswa
```http
POST /api/siswa
Content-Type: application/json

{
  "kelasId": 1,
  "nisn": "1234567890",
  "nama": "Ahmad Zaki",
  "noAbsen": 1
}
```

### Nilai Endpoints

#### Get Nilai Summary
```http
GET /api/nilai/summary/1
```

**Response:**
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

#### Create Nilai
```http
POST /api/nilai
Content-Type: application/json

{
  "siswaId": 1,
  "mataPelajaran": "Matematika",
  "nilaiHarian": 85,
  "uas": 90
}
```

## Testing with cURL

### Create a Kelas
```bash
curl -X POST http://localhost:5000/api/kelas \
  -H "Content-Type: application/json" \
  -d '{"nama":"4A","tingkat":4}'
```

### Create a Siswa
```bash
curl -X POST http://localhost:5000/api/siswa \
  -H "Content-Type: application/json" \
  -d '{"kelasId":1,"nisn":"1234567890","nama":"Ahmad Zaki","noAbsen":1}'
```

### Create Nilai
```bash
curl -X POST http://localhost:5000/api/nilai \
  -H "Content-Type: application/json" \
  -d '{"siswaId":1,"mataPelajaran":"Matematika","nilaiHarian":85,"uas":90}'
```

### Get Ranking
```bash
curl "http://localhost:5000/api/siswa?kelasId=1&sort=ranking"
```

## Error Handling

All endpoints return standard error format:

```json
{
  "error": "Error message here"
}
```

**Common HTTP Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `500` - Server Error

## Notes

- Data is stored in-memory, will reset on server restart
- All calculations (ranking, average) are done server-side
- Cascade delete is implemented (deleting kelas deletes siswa and nilai)
