var sensorModel = require("../models/sensorModel");

function cadastrarSensor(req, res) {
	sensorModel.cadastrarSensor()
		.then(
			function (resultado) {
				res.json(resultado);
			}
		).catch(
			function (erro) {
				console.log(erro);
				console.log(
					"\nHouve um erro ao realizar o cadastro do sensor! Erro: ",
					erro.sqlMessage
				);
				res.status(500).json(erro.sqlMessage);
			}
		);
}

function atualizarSensor(req, res) {
	let idSensor = req.body.idSensor;

	sensorModel.atualizarSensor(idSensor)
		.then(
			function (resultado) {
				res.json(resultado);
			}
		).catch(
			function (erro) {
				console.log(erro);
				console.log(
					"\nHouve um erro ao realizar a atualização do sensor! Erro: ",
					erro.sqlMessage
				);

			}
		)
}

function listarSensor(req, res) {
	sensorModel.listarSensor()
		.then(
			function (resultado) {
				if (resultado.length > 0) {
					res.status(200).json(resultado);
				} else {
					res.status(204).send("Nenhum resultado encontrado!");
				}
			}
		).catch(
			function (erro) {
				console.log(erro);
				console.log(
					"\nHouve um erro ao realizar a listagem do sensor! Erro: ",
					erro.sqlMessage
				);
				res.status(500).json(erro.sqlMessage);
			}
		);
}

module.exports = {
	listarSensor,
	atualizarSensor,
	cadastrarSensor
}