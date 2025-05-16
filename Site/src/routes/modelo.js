var express = require("express");
var router = express.Router();

var modeloController = require("../controllers/modeloController");

router.post("/cadastrar", function (req, res) {
    modeloController.cadastrarModelo(req, res);
})

router.post("/listar", function (req, res) {
    modeloController.listarModelos(req, res);
})

module.exports = router;