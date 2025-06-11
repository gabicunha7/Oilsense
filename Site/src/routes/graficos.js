var express = require("express");
var router = express.Router();

var graficosController = require("../controllers/graficosController");

router.get("/nivelDeAlertaPorDia/:montadora", function (req, res) {
    graficosController.nivelDeAlertaPorDia(req, res);
});

router.post("/carrosAlerta", function (req, res) {
    graficosController.carrosAlerta(req, res);
});

router.post("/modelosAlerta", function (req, res) {
    graficosController.modelosAlerta(req, res);
});

router.get("/graficoPorCarro/:codigo", function (req,res) {
    graficosController.graficoPorCarro(req,res)
});

router.post("/graficoPorModeloAlerta", function (req, res) {
    graficosController.graficoPorModeloAlerta(req, res);
});

router.get("/atualizarGraficoPorCarro/:codigo", function (req,res) {
    graficosController.atualizarGraficoPorCarro(req,res)
});

router.post("/atualizarGraficoPorModelo", function (req, res) {
    graficosController.atualizarGraficoPorModelo(req, res);
});

module.exports = router;