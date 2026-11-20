const express = require("express");
const router = express.Router();
const kamera = require("../Data/kamera");

router.get("/", (req, res) => {
  const kataCari = req.query.search;
  if (!kataCari) {
    return res.json(kamera);
  }
  const hasilCari = [];
  const kataKecil = kataCari.toLowerCase();
  for (let i = 0; i < kamera.length; i++) {
    const namaKecil = kamera[i].nama.toLowerCase();
    const merekKecil = kamera[i].merek.toLowerCase();
    if (namaKecil.includes(kataKecil) || merekKecil.includes(kataKecil)) {
      hasilCari.push(kamera[i]);
    }
  }
  res.json(hasilCari);
});

router.get("/:id/hitung", (req, res) => {
  const item = kamera.find((k) => k.id === parseInt(req.params.id));
  const hari = parseInt(req.query.hari);
  if (!item) return res.status(404).json({ pesan: "Kamera tidak ditemukan" });
  if (!hari || hari < 1) return res.status(400).json({ pesan: "Isi hari dengan benar" });
  res.json({ nama: item.nama, hari: hari, total: item.hargaPerHari * hari });
});

router.get("/:id", (req, res) => {
  const item = kamera.find((k) => k.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ pesan: "Kamera tidak ditemukan" });
  res.json(item);
});

router.post("/", (req, res) => {
  const { nama, merek, hargaPerHari } = req.body || {};
  if (!nama || !merek || !hargaPerHari) {
    return res.status(400).json({ pesan: "nama, merek, hargaPerHari wajib diisi" });
  }
  const baru = {
    id: kamera.length > 0 ? kamera[kamera.length - 1].id + 1 : 1,
    nama, merek, hargaPerHari, tersedia: true,
  };
  kamera.push(baru);
  res.status(201).json(baru);
});

router.put("/:id", (req, res) => {
  const item = kamera.find((k) => k.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ pesan: "Kamera tidak ditemukan" });
  const { nama, merek, hargaPerHari, tersedia } = req.body || {};
  if (nama) item.nama = nama;
  if (merek) item.merek = merek;
  if (hargaPerHari) item.hargaPerHari = hargaPerHari;
  if (tersedia !== undefined) item.tersedia = tersedia;
  res.json(item);
});

router.delete("/:id", (req, res) => {
  const index = kamera.findIndex((k) => k.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ pesan: "Kamera tidak ditemukan" });
  const dihapus = kamera.splice(index, 1);
  res.json({ pesan: "Berhasil dihapus", data: dihapus[0] });
});

module.exports = router;