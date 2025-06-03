var express = require("express");
var router = express.Router();

var graficosController = require("../controllers/graficosController");

router.get("/porcentagemCarroPorPlaca/:placa", function (req, res) {
    graficosController.porcentagemCarroPorPlaca(req, res);
});

module.exports = router;