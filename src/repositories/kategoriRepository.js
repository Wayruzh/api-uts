const pool = require('../config/db');

class KategoriRepository {
  async findAll() {
    const sql = 'SELECT * FROM kategori ORDER BY id';
    const { rows } = await pool.query(sql);
    return rows;
  }

  async findById(id) {
    const sql = 'SELECT * FROM kategori WHERE id = $1';
    const { rows } = await pool.query(sql, [id]);
    return rows[0] || null;
  }

  async create({ nama_kategori, deskripsi }) {
    const sql = `
      INSERT INTO kategori (nama_kategori, deskripsi)
      VALUES ($1, $2)
      RETURNING *
    `;
    const values = [nama_kategori, deskripsi ?? null];
    const { rows } = await pool.query(sql, values);
    return rows[0];
  }

  async remove(id) {
    const sql = 'DELETE FROM kategori WHERE id = $1';
    const { rowCount } = await pool.query(sql, [id]);
    return rowCount > 0;
  }
}

module.exports = new KategoriRepository();