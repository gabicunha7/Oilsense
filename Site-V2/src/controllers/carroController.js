var carroModel = require("../models/carroModel");

function cadastrarCarro(req, res) {

	var placa = req.body.placaServer;
	var volume = req.body.volumeServer;
	var altura = req.body.alturaServer;
	var modelo = req.body.modeloServer;


	if (placa == undefined) {
		res.status(400).send("Sua placa está undefined!");
	} else if (volume == undefined) {
		res.status(400).send("Seu volume está undefined!");
	} else if (altura == undefined) {
		res.status(400).send("Sua altura está undefined!");
	} else if (modelo == undefined) {
		res.status(400).send("Seu modelo está undefined!");
	}
	else {

		carroModel.cadastrarCarro(placa, volume, altura, modelo)
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

function listarCarros(req, res) {
	var idMontadora = req.body.idMontadoraServer;

	carroModel.listarCarros(idMontadora)
		.then(
			function (resultado) {
				if (resultado.length > 0) {
					res.status(200).json(resultado);
				} else {
					res.status(204).send("Nenhum resultado encontrado!");
				}
			}
		)
		.catch(
			function (erro) {
				console.log(erro);
				console.log(
					"Houve um erro ao buscar os carros: ",
					erro.sqlMessage
				);
				res.status(500).json(erro.sqlMessage);
			}
		);
}

module.exports = {
	cadastrarCarro,
	listarCarros
}