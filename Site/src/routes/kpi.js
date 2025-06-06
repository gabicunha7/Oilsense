var express = require("express");
var router = express.Router();


var kpiController = require("../controllers/kpiController");

router.get("/kpiBarra/:placa", function (req, res) {
    kpiController.kpiBarra(req, res);
});

module.exports = router;