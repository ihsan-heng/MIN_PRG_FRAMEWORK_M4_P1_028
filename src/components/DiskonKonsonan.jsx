// src/components/DiskonKonsonan.jsx
import { useState } from 'react';
import './DiskonKonsonan.css';

const DiskonKonsonan = () => {
  const [totalHarga, setTotalHarga] = useState('');
  const [namaPelanggan, setNamaPelanggan] = useState('');
  const [hasil, setHasil] = useState(null);

  const handleHitung = (e) => {
    e.preventDefault();

    if (!totalHarga || !namaPelanggan.trim()) {
      alert('Harap isi total harga pembelian dan nama pelanggan!');
      return;
    }

    const hargaNum = parseFloat(totalHarga);
    if (isNaN(hargaNum) || hargaNum <= 0) {
      alert('Total harga pembelian harus berupa angka lebih besar dari 0!');
      return;
    }

    // 1. Hitung jumlah huruf konsonan (selain A, E, I, O, U dan spasi)
    const namaKecil = namaPelanggan.toLowerCase();
    let jumlahKonsonan = 0;
    const vokal = ['a', 'e', 'i', 'o', 'u'];

    for (let i = 0; i < namaKecil.length; i++) {
      const char = namaKecil[i];
      if (char >= 'a' && char <= 'z' && !vokal.includes(char)) {
        jumlahKonsonan++;
      }
    }

    // 2. Hitung jumlah kata (dipisahkan spasi)
    const kataArray = namaPelanggan.trim().split(/\s+/).filter(Boolean);
    const jumlahKata = kataArray.length;

    // 3. Logika diskon:
    // Setiap huruf konsonan memberikan diskon sebesar 2%
    let persentaseDiskon = jumlahKonsonan * 2;

    // Jika nama > 2 kata, berikan bonus diskon tambahan 5%
    if (jumlahKata > 2) {
      persentaseDiskon += 5;
    }

    // Maksimal total diskon adalah 20%
    if (persentaseDiskon > 20) {
      persentaseDiskon = 20;
    }

    // 4. Hitung potongan harga & harga setelah diskon
    const totalPotongan = (persentaseDiskon / 100) * hargaNum;
    const hargaSetelahDiskon = hargaNum - totalPotongan;

    setHasil({
      jumlahKonsonan,
      jumlahKata,
      persentaseDiskon,
      totalPotongan,
      hargaSetelahDiskon,
    });
  };

  return (
    <div className="card-container">
      <h3 className="card-title">Program Diskon Huruf Konsonan</h3>
      <form onSubmit={handleHitung} className="form-group">
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
            placeholder="Masukkan nama pelanggan"
          />
        </label>

        <button type="submit" className="submit-btn">
          Hitung Diskon
        </button>
      </form>

      {hasil && (
        <div className="result-box">
          <h3>Hasil Perhitungan:</h3>
          <p>
            <strong>Jumlah Huruf Konsonan:</strong> {hasil.jumlahKonsonan}
          </p>
          <p>
            <strong>Jumlah Kata:</strong> {hasil.jumlahKata}
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

export default DiskonKonsonan;
