var kpiModel = require("../models/kpiModel");





function kpiLinha(req, res) {

    var placa1 = req.params.placa;

    let placa = placa1.substring(0, 7);

    kpiModel.kpiLinha(placa)
        .then(resultado => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(erro => {
            console.log("Houve um erro ao buscar dados da KPI linha: ", erro);
            res.status(500).json(erro.sqlMessage);
        });
}



function kpiBarra(req,res){
        var placa = req.params.placa;
    
        kpiModel.kpiBarra(placa)
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


    function kpiArea(req, res) {
    var data = req.params.data;

    kpiModel.kpiArea(data)
        .then(resultado => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(erro => {
            console.log("Houve um erro ao buscar dados da KPI área: ", erro);
            res.status(500).json(erro.sqlMessage);
        });
}



function kpiPizza(req, res) {
    var data = req.params.data;

    kpiModel.kpiPizza(data)
        .then(resultado => {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(erro => {
            console.log("Houve um erro ao buscar dados da KPI pizza: ", erro);
            res.status(500).json(erro.sqlMessage);
        });
}




module.exports = {
    kpiBarra,
    kpiLinha,
    kpiArea,
    kpiPizza
}