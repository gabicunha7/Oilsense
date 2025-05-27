var express = require("express");
var router = express.Router();

var funcionarioController = require("../controllers/funcionarioController");

router.post("/cadastrar", function (req, res) {
    funcionarioController.cadastrarFuncionario(req, res);
});

router.post("/autenticar", function (req, res) {
    funcionarioController.autenticarFuncionario(req, res);
});

router.get("/listar/:idMontadora", function (req, res) {
    funcionarioController.listarFuncionarios(req, res);
});

router.get("/listarUm/:idFuncionario", function (req, res) {
    funcionarioController.listarUmFuncionario(req, res);
});

router.put("/editar", function (req, res) {
    funcionarioController.editarFuncionario(req, res);
});

router.delete("/excluir", function (req, res) {
    funcionarioController.excluirFuncionario(req, res);
});

module.exports = router;