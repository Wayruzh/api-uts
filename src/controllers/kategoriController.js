const kategoriRepo = require('../repositories/kategoriRepository');

exports.getAll = async (req, res, next) => {
  try {
    const data = await kategoriRepo.findAll();
    res.status(200).json({
      status: 'success',
      message: 'Daftar kategori berhasil diambil',
      count: data.length,
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.getById = async (req, res, next) => {
  try {
    const id = req.id;
    const data = await kategoriRepo.findById(id);

    if (!data) {
      return res.status(404).json({
        status: 'error',
        message: `Kategori id ${id} tidak ditemukan`,
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Detail kategori berhasil diambil',
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const data = await kategoriRepo.create(req.body);
    res.status(201).json({
      status: 'success',
      message: 'Kategori berhasil ditambahkan',
      data,
    });
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({
        status: 'error',
        message: 'Nama kategori sudah terdaftar',
      });
    }
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const id = req.id;
    const terhapus = await kategoriRepo.remove(id);

    if (!terhapus) {
      return res.status(404).json({
        status: 'error',
        message: `Kategori id ${id} tidak ditemukan`,
      });
    }

    res.status(204).send();
  } catch (err) {
    if (err.code === '23503') {
      return res.status(409).json({
        status: 'error',
        message: 'Kategori tidak dapat dihapus karena masih digunakan oleh produk',
      });
    }
    next(err);
  }
};