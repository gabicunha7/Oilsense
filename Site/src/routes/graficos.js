var express = require("express");
var router = express.Router();

var graficosController = require("../controllers/graficosController");

router.get("/porcentagemCarroPorPlaca/:placa", function (req, res) {
    graficosController.porcentagemCarroPorPlaca(req, res);
});



router.get("/porcentagemMediaModelo/:Modelo_id", function (req, res) {
    graficosController.porcentagemMediaModelo(req, res);
});


module.exports = router;