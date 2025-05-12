var express = require('express');
var router = express.Router();
var FuncionarioController = require('../controllers/FuncionarioController');

router.post('/cadastrar', FuncionarioController.cadastrar);

module.exports = router;