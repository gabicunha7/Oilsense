var modeloModel = require("../models/modeloModel");

function cadastrarModelo(req, res) {

    var nome = req.body.nomeServer;
    var ano = req.body.anoServer;
    var id_montadora = req.body.id_montadoraServer;

    if (nome == undefined) {
        res.status(400).send("Sua placa está undefined!");
    } else if (ano == undefined) {
        res.status(400).send("Seu volume está undefined!");
    } 
    else {

        modeloModel.cadastrarModelo(nome, ano, id_montadora)
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

module.exports = {
    cadastrarModelo
}