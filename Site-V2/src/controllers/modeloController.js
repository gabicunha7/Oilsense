var modeloModel = require("../models/modeloModel");

function cadastrarModelo(req, res) {

    var nome = req.body.nomeServer;
    var ano = req.body.anoServer;
    var idMontadora = req.body.idMontadoraServer;

    if (nome == undefined) {
        res.status(400).send("Sua placa está undefined!");
    } else if (ano == undefined) {
        res.status(400).send("Seu volume está undefined!");
    } 
    else {

        modeloModel.cadastrarModelo(nome, ano, idMontadora)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro do modelo! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listarModelos(req, res) {
    var idMontadora = req.body.idMontadoraServer;

    modeloModel.listarModelos(idMontadora)
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
                    "Houve um erro ao buscar os modelos: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    cadastrarModelo,
    listarModelos
}