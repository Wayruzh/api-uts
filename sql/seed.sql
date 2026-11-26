INSERT INTO kategori (nama_kategori, deskripsi) VALUES
  ('Elektronik', 'Perangkat elektronik dan aksesoris'),
  ('Pakaian', 'Kebutuhan sandang harian'),
  ('Makanan', 'Produk makanan kemasan dan kering');

INSERT INTO produk (kategori_id, kode_produk, nama_produk, harga, stok) VALUES
  (1, 'PRD-001', 'Mouse Wireless', 125000, 15),
  (1, 'PRD-002', 'Keyboard Mechanical', 450000, 8),
  (2, 'PRD-003', 'Kaos Polos Katun', 75000, 25),
  (2, 'PRD-004', 'Jaket Hoodie', 185000, 10),
  (3, 'PRD-005', 'Kopi Arabika 250g', 65000, 30);