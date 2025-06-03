var express = require("express");
var router = express.Router();

var modeloController = require("../controllers/modeloController");

router.post("/cadastrar", function (req, res) {
    modeloController.cadastrarModelo(req, res);
})

router.get("/listar/:idMontadora", function (req, res) {
    modeloController.listarModelos(req, res);
})

router.get("/listarUm/:idModelo", function (req, res) {
    modeloController.listarUmModelo(req, res);
});

router.put("/editar", function (req, res) {
    modeloController.editarModelo(req, res);
});

router.delete("/excluir", function (req, res) {
    modeloController.excluirModelo(req, res);
});

module.exports = router;