var express = require("express");
var router = express.Router();

var carroController = require("../controllers/carroController");

router.post("/cadastrar", function (req, res) {
    carroController.cadastrarCarro(req, res);
})

router.get("/listar/:idMontadora", function (req, res) {
    carroController.listarCarros(req, res);
})

module.exports = router;