const mahasiswa = require("../models/mahasiswa");
const modelMahasiswa = require("../models/mahasiswa");

module.exports = {
  getMahasiswa: (req, res) => {
    mahasiswa.getMahasiswa((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || " onok error",
        });
      } else res.send(data);
    });
  },
  insert: (req, res) => {
    // ambildata request dari frontend
    if (!req.body) {
      res.status(400).send({
        message: "data tidak boleh ksong",
      });
    }
    modelMahasiswa.insert(req.body, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "terjadi error",
        });
      } else {
        res.send(data);
      }
    });
  },
  getMahasiswaByNim: (req, res) => {
    // MENAMPILKAN DATA
    mahasiswa.getMahasiswaByNim(req.params.nim, (err, data) => {
      if (err) {
        if (err.kind === "tidak ditemukan") {
          res.status(404).send({
            message: `mahasiswa  dengan nim: ${req.params.nim}tidak ditemukan`,
          });
        } else {
          res.status(500).send({
            message: "error" + req.params.nim,
          });
        }
      } else res.send(data);
    });
  },

  getNilaiByNim: (req, res) => {
    mahasiswa.getNilaiByNim(req.params.nim, (err, data) => {
      if (err) {
        if (err.kind == "not_found") {
          res.status(404).send({
            message: `Not found mahasiswa with NIM : ${req.params.nim}.`,
          });
        } else {
          res.status(500).send({
            nilai: [],
          });
        }
      } else res.send(data);
    });
  },

  update: (req, res) => {
    // UPDATE
    if (!req.body) {
      res.status(400).send({
        message: "data tidak boleh kosng",
      });
    }
    mahasiswa.update(req.params.nim, req.body, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `not found mahasiswa with nim ${req.params.nim}`,
          });
        } else {
          res.status(500).send({
            message: "error updating tutorial with nim " + req.params.nim,
          });
        }
      } else res.send(data);
    });
  },

  delete: (req, res) => {
    mahasiswa.delete(req.params.nim, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `not found mahasiswa with nim ${req.params.nim}`,
          });
        } else {
          res.status(500).send({
            message: "could not delete mahasiswa with nim " + req.params.nim,
          });
        }
      } else res.send({ message: `berhasil dihapus` });
    });
  },
};
