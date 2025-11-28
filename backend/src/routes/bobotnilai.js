import express from 'express';
import { BobotNilai } from '../models/BobotNilai.js';
import { Nilai } from '../models/Nilai.js';

const router = express.Router();

// GET bobot nilai for a kelas
router.get('/:kelasId', async (req, res) => {
  try {
    const bobot = await BobotNilai.findByKelas(req.params.kelasId);
    res.json({
      ...bobot,
      id: bobot._id?.toString()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// CREATE or UPDATE bobot nilai for a kelas
router.post('/:kelasId', async (req, res) => {
  try {
    const { bobotHarian, bobotUas } = req.body;
    
    if (bobotHarian === undefined || bobotUas === undefined) {
      return res.status(400).json({ error: 'Bobot harian dan UAS harus diisi' });
    }

    if (bobotHarian + bobotUas !== 100) {
      return res.status(400).json({ error: 'Total bobot harus 100%' });
    }

    const result = await BobotNilai.createOrUpdate(req.params.kelasId, {
      bobotHarian: parseInt(bobotHarian),
      bobotUas: parseInt(bobotUas)
    });

    // Update all existing nilai for this kelas with new bobot
    const nilaiList = await Nilai.findByKelas(req.params.kelasId);
    await Promise.all(
      nilaiList.map(nilai => 
        Nilai.update(nilai._id.toString(), {
          bobotHarian: parseInt(bobotHarian),
          bobotUas: parseInt(bobotUas)
        })
      )
    );

    res.json({
      ...result,
      id: result._id?.toString(),
      message: 'Bobot nilai berhasil diperbarui'
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
