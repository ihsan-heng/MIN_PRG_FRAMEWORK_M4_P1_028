// src/components/DiskonPalindrom.jsx
import { useState } from 'react';
import './DiskonPalindrom.css';

const DiskonPalindrom = () => {
  const [totalHarga, setTotalHarga] = useState('');
  const [namaPelanggan, setNamaPelanggan] = useState('');
  const [hasil, setHasil] = useState(null);

  const handleCekDanHitung = (e) => {
    e.preventDefault();

    if (!totalHarga || !namaPelanggan.trim()) {
      alert('Harap masukkan total harga pembelian dan nama pelanggan!');
      return;
    }

    const hargaNum = parseFloat(totalHarga);
    if (isNaN(hargaNum) || hargaNum <= 0) {
      alert('Total harga pembelian harus berupa angka lebih besar dari 0!');
      return;
    }

    // 1. Bersihkan nama: abaikan spasi & perbedaan huruf besar/kecil (case-insensitive)
    const namaBersih = namaPelanggan.toLowerCase().replace(/\s+/g, '');
    if (namaBersih.length === 0) {
      alert('Nama pelanggan tidak boleh hanya spasi!');
      return;
    }

    // 2. Cek apakah Palindrom (minimal 3 karakter)
    const reversed = namaBersih.split('').reverse().join('');
    const isPalindrom = namaBersih.length >= 3 && namaBersih === reversed;

    // 3. Hitung jumlah karakter unik
    const karakterUnikSet = new Set(namaBersih);
    const jumlahKarakterUnik = karakterUnikSet.size;

    // 4. Penentuan diskon
    let persentaseDiskon = 0;
    let statusNama = '';

    if (isPalindrom) {
      statusNama = 'Palindrom';
      persentaseDiskon = 25; // Diskon Spesial 25%
    } else {
      statusNama = 'Bukan Palindrom';
      persentaseDiskon = jumlahKarakterUnik * 1; // 1% per karakter unik
    }

    // 5. Potongan harga & harga akhir
    const totalPotongan = (persentaseDiskon / 100) * hargaNum;
    const hargaSetelahDiskon = hargaNum - totalPotongan;

    setHasil({
      statusNama,
      isPalindrom,
      jumlahKarakterUnik,
      persentaseDiskon,
      totalPotongan,
      hargaSetelahDiskon,
    });
  };

  return (
    <div className="card-container">
      <h3 className="card-title">Program Diskon Palindrom Nama</h3>
      <form onSubmit={handleCekDanHitung} className="form-group">
        <label className="form-label">
          Total Harga Pembelian:
          <input
            type="number"
            className="form-input"
            value={totalHarga}
            onChange={(e) => setTotalHarga(e.target.value)}
            placeholder="Masukkan total harga pembelian"
          />
        </label>

        <label className="form-label">
          Nama Pelanggan:
          <input
            type="text"
            className="form-input"
            value={namaPelanggan}
            onChange={(e) => setNamaPelanggan(e.target.value)}
            placeholder="Masukkan nama pelanggan (misal: Anna, Bob)"
          />
        </label>

        <button type="submit" className="submit-btn">
          Cek &amp; Hitung
        </button>
      </form>

      {hasil && (
        <div className="result-box">
          <h3>Hasil Pemeriksaan &amp; Diskon:</h3>
          <p>
            <strong>Status Nama:</strong>{' '}
            <span
              className={
                hasil.isPalindrom ? 'badge-palindrom' : 'badge-bukan'
              }
            >
              {hasil.statusNama}
            </span>
          </p>
          <p>
            <strong>Jumlah Karakter Unik:</strong> {hasil.jumlahKarakterUnik}
          </p>
          <p>
            <strong>Persentase Diskon:</strong> {hasil.persentaseDiskon}%
          </p>
          <p>
            <strong>Total Potongan Harga:</strong> Rp{' '}
            {hasil.totalPotongan.toLocaleString('id-ID')}
          </p>
          <p>
            <strong>Harga Pembelian Setelah Diskon:</strong> Rp{' '}
            {hasil.hargaSetelahDiskon.toLocaleString('id-ID')}
          </p>
        </div>
      )}
    </div>
  );
};

export default DiskonPalindrom;
