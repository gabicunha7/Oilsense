
var graficosModel = require("../models/graficosModel");

function porcentagemCarroPorPlaca(req, res) {
    var placa = req.params.placa;

    graficosModel.porcentagemCarroPorPlaca(placa)
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
                    "Houve um erro ao buscar as placas: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}


function nivelDeAlertaPorMes(req, res) {
    var data = req.body.data;
    var montadora = req.body.montadora;

    graficosModel.nivelDeAlertaPorMes(data, montadora)
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
                    "Houve um erro ao buscar os alertas: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function anosParceira(req, res) {
    let montadora_id = req.params.montadora;

    graficosModel.anosParceira(montadora_id)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum resultado encontrado para anos que é parceira!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log(
                    "Houve um erro ao buscar os alertas: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}



function porcentagemMediaModelo(req, res) {
    var idModelo = req.params.idModelo;

    graficosModel.porcentagemMediaModelo(idModelo)
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
                    "Houve um erro ao buscar as placas: ",
                    erro.sqlMessage
                );
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function listarCarrosModelo(req, res) {
    var idModelo = req.params.idModelo;

    graficosModel.listarCarrosModelo(idModelo)
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
    porcentagemCarroPorPlaca,
    nivelDeAlertaPorMes,
    anosParceira,
    listarCarrosModelo,
    porcentagemMediaModelo

}