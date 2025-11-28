// In-memory database
export const db = {
  users: [],
  kelas: [],
  siswa: [],
  nilai: [],
  resetTokens: []
};

// Auto-increment IDs
export const idCounter = {
  users: 1,
  kelas: 1,
  siswa: 1,
  nilai: 1,
  resetTokens: 1
};

// Helper functions
export const getNextId = (entity) => {
  return idCounter[entity]++;
};

export const resetDatabase = () => {
  db.users = [];
  db.kelas = [];
  db.siswa = [];
  db.nilai = [];
  db.resetTokens = [];
  idCounter.users = 1;
  idCounter.kelas = 1;
  idCounter.siswa = 1;
  idCounter.nilai = 1;
  idCounter.resetTokens = 1;
};
