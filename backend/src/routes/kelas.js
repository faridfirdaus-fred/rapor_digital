import express from 'express';
import { Kelas } from '../models/Kelas.js';

const router = express.Router();

// GET all kelas
router.get('/', async (req, res) => {
  try {
    const kelasList = await Kelas.findAll();
    const kelasWithCount = await Promise.all(
      kelasList.map(async (kelas) => ({
        ...kelas,
        id: kelas._id.toString(),
        jumlahSiswa: await Kelas.countSiswa(kelas._id.toString())
      }))
    );
    res.json(kelasWithCount);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET kelas by ID
router.get('/:id', async (req, res) => {
  try {
    const kelas = await Kelas.findById(req.params.id);
    if (!kelas) {
      return res.status(404).json({ error: 'Kelas tidak ditemukan' });
    }
    res.json({
      ...kelas,
      id: kelas._id.toString(),
      jumlahSiswa: await Kelas.countSiswa(kelas._id.toString())
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE new kelas
router.post('/', async (req, res) => {
  try {
    const { nama } = req.body;
    
    if (!nama) {
      return res.status(400).json({ error: 'Kelas harus diisi' });
    }

    const kelas = await Kelas.create({ nama });
    res.status(201).json({
      ...kelas,
      id: kelas._id.toString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE kelas
router.put('/:id', async (req, res) => {
  try {
    const { nama } = req.body;
    const kelas = await Kelas.update(req.params.id, { nama });
    
    if (!kelas) {
      return res.status(404).json({ error: 'Kelas tidak ditemukan' });
    }

    res.json({
      ...kelas,
      id: kelas._id.toString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE kelas
router.delete('/:id', async (req, res) => {
  try {
    const result = await Kelas.delete(req.params.id);
    
    if (!result) {
      return res.status(404).json({ error: 'Kelas tidak ditemukan' });
    }

    res.json({ message: 'Kelas berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
