var express = require("express");
var router = express.Router();

var graficosController = require("../controllers/graficosController");

router.get("/nivelDeAlertaPorDia/:montadora", function (req, res) {
    graficosController.nivelDeAlertaPorDia(req, res);
});

router.post("/carrosAlerta", function (req, res) {
    graficosController.carrosAlerta(req, res);
});

module.exports = router;