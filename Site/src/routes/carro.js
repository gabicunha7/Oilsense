var express = require("express");
var router = express.Router();

var carroController = require("../controllers/carroController");

router.post("/cadastrar", function (req, res) {
    carroController.cadastrarCarro(req, res);
});

router.get("/listar/:idMontadora", function (req, res) {
    carroController.listarCarros(req, res);
});

router.get("/listarUm/:idCarro", function (req, res) {
    carroController.listarUmCarro(req, res);
});

router.put("/editar", function (req, res) {
    carroController.editarCarro(req, res);
});

router.delete("/excluir", function (req, res) {
    carroController.excluirCarro(req, res);
});

module.exports = router;