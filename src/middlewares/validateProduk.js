const aturan = {
  kategori_id: (v) => Number.isInteger(v) && v >= 1,
  kode_produk: (v) => typeof v === 'string' && v.trim().length > 0,
  nama_produk: (v) => typeof v === 'string' && v.trim().length > 0,
  harga: (v) => Number.isInteger(v) && v > 0,
  stok: (v) => Number.isInteger(v) && v >= 0,
};

const pesan = {
  kategori_id: 'kategori_id harus bilangan bulat >= 1',
  kode_produk: 'kode_produk wajib diisi',
  nama_produk: 'nama_produk wajib diisi',
  harga: 'harga harus bilangan bulat > 0',
  stok: 'stok harus bilangan bulat >= 0',
};

function validasiProduk(body, parsial) {
  const errors = [];
  const data = body && typeof body === 'object' ? body : {};
  const keys = Object.keys(aturan);

  for (const field of keys) {
    if (parsial && data[field] === undefined) {
      continue;
    }

    if (!aturan[field](data[field])) {
      errors.push(pesan[field]);
    }
  }

  if (parsial && keys.every((field) => data[field] === undefined)) {
    errors.push('minimal satu field harus dikirim');
  }

  return errors;
}

const buatMiddlewareProduk = (parsial) => (req, res, next) => {
  const errors = validasiProduk(req.body, parsial);
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
  validateProduk: buatMiddlewareProduk(false),
  validateProdukPatch: buatMiddlewareProduk(true),
};