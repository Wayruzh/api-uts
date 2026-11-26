function cekKosongString(val) {
  return typeof val === 'string' && val.trim().length > 0;
}

function validasiKategori(body, parsial) {
  const errors = [];
  const { nama_kategori, deskripsi } = body || {};

  if (!parsial || nama_kategori !== undefined) {
    if (!cekKosongString(nama_kategori)) {
      errors.push('nama_kategori wajib diisi');
    }
  }

  if (deskripsi !== undefined && deskripsi !== null && typeof deskripsi !== 'string') {
    errors.push('deskripsi harus berupa teks');
  }

  if (parsial && nama_kategori === undefined && deskripsi === undefined) {
    errors.push('minimal satu field harus dikirim');
  }

  return errors;
}

const buatMiddlewareKategori = (parsial) => (req, res, next) => {
  const errors = validasiKategori(req.body, parsial);
  if (errors.length > 0) {
    return res.status(400).json({
      status: 'error',
      message: 'Validasi gagal',
      errors,
    });
  }
  next();
};

module.exports = {
  validateKategori: buatMiddlewareKategori(false),
  validateKategoriPatch: buatMiddlewareKategori(true),
};