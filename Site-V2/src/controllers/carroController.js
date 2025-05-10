var carroModel = require("../models/carroModel");

function cadastrarCarro(req, res) {

    var placa = req.body.placaServer;
    var volume = req.body.volumeServer;
    var altura = req.body.alturaServer;
    var modelo = req.body.modeloServer;
    var ano = req.body.anoServer;


    if (placa == undefined) {
	res.status(400).send("Sua placa está undefined!");
    } else if (volume == undefined) {
	res.status(400).send("Seu volume está undefined!");
    } else if (altura == undefined) {
	res.status(400).send("Sua altura está undefined!");
    } else if (modelo == undefined) {
	res.status(400).send("Seu modelo está undefined!");
    }  else if (ano == undefined) {
	res.status(400).send("Seu ano está undefined!");
    }  
    else {

	carroModel.cadastrarCarro(placa, volume, altura, modelo, ano)
	    .then(
		function (resultado) {
		    res.json(resultado);
		}
	    ).catch(
		function (erro) {
		    console.log(erro);
		    console.log(
			"\nHouve um erro ao realizar o cadastro do carro! Erro: ",
			erro.sqlMessage
		    );
		    res.status(500).json(erro.sqlMessage);
		}
	    );
    }
}

module.exports = {
    cadastrarCarro
}