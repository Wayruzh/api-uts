const express = require('express');
const kategoriRoutes = require('./routes/kategoriRoutes');
const produkRoutes = require('./routes/produkRoutes');
const parseId = require('./middlewares/parseId');
const produkCtrl = require('./controllers/produkController');

const app = express();

app.use(express.json());

// Endpoint nested: produk aktif milik satu kategori
app.get('/api/kategori/:id/produk', parseId, produkCtrl.getByKategori);

app.use('/api/kategori', kategoriRoutes);
app.use('/api/produk', produkRoutes);

// Route tidak dikenal -> 404
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'Route tidak ditemukan',
  });
});

// Error handler terpusat (wajib 4 parameter)
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({
      status: 'error',
      message: 'JSON tidak valid',
    });
  }

  console.error(err);
  res.status(500).json({
    status: 'error',
    message: 'Terjadi kesalahan pada server',
  });
});

module.exports = app;