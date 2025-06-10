
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

module.exports = {
    nivelDeAlertaPorDia,

}