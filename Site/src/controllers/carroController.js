var carroModel = require("../models/carroModel");

function cadastrarCarro(req, res) {
	codigo = req.body.codigoServer;
	volume = req.body.volumeServer;
	altura = req.body.alturaServer;
	modelo = req.body.modeloServer;
	idSensor = req.body.idSensor;

	if (codigo == undefined) {
		res.status(400).send("Sua codigo está undefined!");
	} else if (volume == undefined) {
		res.status(400).send("Seu volume está undefined!");
	} else if (altura == undefined) {
		res.status(400).send("Sua altura está undefined!");
	} else if (modelo == undefined) {
		res.status(400).send("Seu modelo está undefined!");
	}
	else {
		carroModel.cadastrarCarro(codigo, volume, altura, modelo, idSensor)
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
	var idMontadora = req.params.idMontadora;

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

function listarUmCarro(req, res) {
	var idCarro = req.params.idCarro;

	carroModel.listarUmCarro(idCarro)
		.then(
			function (resultado) {
				if (resultado.length > 0) {
					res.status(200).json(resultado);
				} else {
					res.status(204).send("Carro não encontrado!");
				}
			}
		)
		.catch(
			function (erro) {
				console.log(erro);
				console.log("\nHouve um erro ao listar o carro! Erro: ", erro.sqlMessage);
				res.status(500).json(erro.sqlMessage);
			}
		);
}

function editarCarro(req, res) {
	var codigo = req.body.codigoServer;
	var volume = req.body.volumeServer;
	var altura = req.body.alturaServer;
	var idCarro = req.body.idCarroServer;

	if (codigo == undefined) {
		res.status(400).send("A codigo está undefined!");
	} else if (volume == undefined) {
		res.status(400).send("O volume está undefined!");
	} else if (altura == undefined) {
		res.status(400).send("A altura está undefined!");
	} else {
		carroModel.editarCarro(codigo, volume, altura, idCarro)
			.then(
				function (resultado) {
					res.json(resultado);
				}
			)
			.catch(
				function (erro) {
					console.log(erro);
					console.log("\nHouve um erro ao editar o carro! Erro: ", erro.sqlMessage);
					res.status(500).json(erro.sqlMessage);
				}
			);
	}
}

function excluirCarro(req, res) {
	var idCarro = req.body.idCarroServer;

	carroModel.excluirCarro(idCarro)
		.then(
			function (resultado) {
				res.json(resultado);
			}
		)
		.catch(
			function (erro) {
				console.log(erro);
				console.log("\nHouve um erro ao excluir o carro! Erro: ", erro.sqlMessage);
				res.status(500).json(erro.sqlMessage);
			}
		);
}

module.exports = {
	cadastrarCarro,
	listarCarros,
	listarUmCarro,
	editarCarro,
	excluirCarro
}