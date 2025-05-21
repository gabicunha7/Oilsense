var express = require("express");
var router = express.Router();

var sensorController = require("../controllers/sensorController");

router.post("/cadastrar", function (req, res) {
    sensorController.cadastrarSensor(req, res);
})

router.put("/atualizar", function (req, res) {
    sensorController.atualizarSensor(req, res);
})

router.get("/listar", function (req, res) {
    sensorController.listarSensor(req, res);
})

module.exports = router;