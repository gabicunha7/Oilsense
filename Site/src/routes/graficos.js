var express = require("express");
var router = express.Router();

var graficosController = require("../controllers/graficosController");

router.get("/porcentagemCarroPorPlaca/:placa", function (req, res) {
    graficosController.porcentagemCarroPorPlaca(req, res);
});

router.get("/nivelDeAlertaPorMes/:mes/:ano", function (req, res) {
    graficosController.nivelDeAlertaPorMes(req, res);
});

router.get("/anosParceira/:montadora_id", function (req, res) {
    graficosController.anosParceira(req, res);
});

module.exports = router;