const produkRepo = require('../repositories/produkRepository');
const kategoriRepo = require('../repositories/kategoriRepository');

function tanganiErrorProduk(err, res, next) {
  if (err.code === '23505') {
    return res.status(409).json({
      status: 'error',
      message: 'Kode produk sudah terdaftar',
    });
  }

  if (err.code === '23503') {
    return res.status(422).json({
      status: 'error',
      message: 'kategori_id tidak ditemukan pada tabel kategori',
    });
  }

  return next(err);
}

exports.getAll = async (req, res, next) => {
  try {
    const data = await produkRepo.findAll();
    res.status(200).json({
      status: 'success',
      message: 'Daftar produk aktif berhasil diambil',
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
    const data = await produkRepo.findById(id);

    if (!data) {
      return res.status(404).json({
        status: 'error',
        message: `Produk id ${id} tidak ditemukan`,
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Detail produk berhasil diambil',
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.getByKategori = async (req, res, next) => {
  try {
    const kategoriId = req.id;
    const kategori = await kategoriRepo.findById(kategoriId);

    if (!kategori) {
      return res.status(404).json({
        status: 'error',
        message: `Kategori id ${kategoriId} tidak ditemukan`,
      });
    }

    const data = await produkRepo.findByKategoriId(kategoriId);
    res.status(200).json({
      status: 'success',
      message: 'Daftar produk aktif pada kategori berhasil diambil',
      count: data.length,
      data,
    });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const data = await produkRepo.create(req.body);
    res.status(201).json({
      status: 'success',
      message: 'Produk berhasil ditambahkan',
      data,
    });
  } catch (err) {
    tanganiErrorProduk(err, res, next);
  }
};

exports.replace = async (req, res, next) => {
  try {
    const id = req.id;
    const data = await produkRepo.replace(id, req.body);

    if (!data) {
      return res.status(404).json({
        status: 'error',
        message: `Produk id ${id} tidak ditemukan`,
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Produk berhasil diperbarui secara penuh',
      data,
    });
  } catch (err) {
    tanganiErrorProduk(err, res, next);
  }
};

exports.update = async (req, res, next) => {
  try {
    const id = req.id;
    const data = await produkRepo.update(id, req.body);

    if (!data) {
      return res.status(404).json({
        status: 'error',
        message: `Produk id ${id} tidak ditemukan`,
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Produk berhasil diperbarui',
      data,
    });
  } catch (err) {
    tanganiErrorProduk(err, res, next);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const id = req.id;
    const terhapus = await produkRepo.softDelete(id);

    if (!terhapus) {
      return res.status(404).json({
        status: 'error',
        message: `Produk id ${id} tidak ditemukan`,
      });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.restore = async (req, res, next) => {
  try {
    const id = req.id;
    const data = await produkRepo.restore(id);

    if (!data) {
      return res.status(404).json({
        status: 'error',
        message: `Produk terhapus dengan id ${id} tidak ditemukan`,
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Produk berhasil dipulihkan',
      data,
    });
  } catch (err) {
    next(err);
  }
};