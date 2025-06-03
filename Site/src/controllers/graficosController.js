var graficosModel = require("../models/graficosModel");




function porcentagemCarroPorPlaca(req,res){
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
                        "Houve um erro ao buscar os modelos: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }


module.exports = {
    porcentagemCarroPorPlaca,
    
}