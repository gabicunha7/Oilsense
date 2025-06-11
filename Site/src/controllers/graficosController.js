
var graficosModel = require("../models/graficosModel");

function nivelDeAlertaPorDia(req, res) {
    var montadora = req.params.montadora;

    graficosModel.nivelDeAlertaPorDia(montadora)
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

function carrosAlerta(req, res) {
    var alerta = req.body.alerta;
    var montadora = req.body.montadora;

    if (montadora == undefined) {
        res.status(400).send("O montadora está undefined!");
    } else if (alerta == undefined) {
        res.status(400).send("O alerta está undefined!");
    } else {
        graficosModel.carrosAlerta(alerta, montadora)
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
                    console.log("\nHouve um erro ao listar alertas dos carros! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function modelosAlerta(req, res) {
    var alerta = req.body.alerta;
    var montadora = req.body.montadora;

    if (montadora == undefined) {
        res.status(400).send("O montadora está undefined!");
    } else if (alerta == undefined) {
        res.status(400).send("O alerta está undefined!");
    } else {
        graficosModel.modelosAlerta(alerta, montadora)
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
                    console.log("\nHouve um erro ao listar alertas dos carros! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function graficoPorCarro(req, res) {
    var codigo = req.params.codigo;

    graficosModel.graficoPorCarro(codigo)
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

function graficoPorModeloAlerta(req, res) {
    var alerta = req.body.alerta;
    var modelo_id = req.body.modelo_id;

    if (modelo_id == undefined) {
        res.status(400).send("O modelo_id está undefined!");
    } else if (alerta == undefined) {
        res.status(400).send("O alerta está undefined!");
    } else {
        graficosModel.graficoPorModeloAlerta(modelo_id, alerta)
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
                    console.log("\nHouve um erro ao listar alertas dos carros! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    nivelDeAlertaPorDia,
    carrosAlerta,
    modelosAlerta,
    graficoPorCarro,
    graficoPorModeloAlerta

}