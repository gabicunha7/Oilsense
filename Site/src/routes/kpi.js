var express = require("express");
var router = express.Router();


var kpiController = require("../controllers/kpiController");

router.get("/kpiBarra/:placa", function (req, res) {
    kpiController.kpiBarra(req, res);
});



router.get("/kpiLinha/:placa", function (req, res) {
    kpiController.kpiLinha(req, res);
}); 	



router.get("/kpiPizza/:data", function (req, res) {
    kpiController.kpiPizza(req, res);
});





module.exports = router;