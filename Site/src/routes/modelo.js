var express = require("express");
var router = express.Router();

var modeloController = require("../controllers/modeloController");

router.post("/cadastrar", function (req, res) {
    modeloController.cadastrarModelo(req, res);
})

router.get("/listar/:idMontadora", function (req, res) {
    modeloController.listarModelos(req, res);
})

module.exports = router;