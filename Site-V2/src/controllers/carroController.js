var carroModel = require("../models/carroModel");

function autenticarModelo(req, res) {
    var modelo = req.body.modeloServer;

    if (modelo == undefined) {
	res.status(400).send("Seu modelo está indefinido!");
    } 
    else {

	carroModel.autenticarModelo(modelo)
	    .then(
		function (resultadoAutenticar) {
		    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
		    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

		    if (resultadoAutenticar.length == 1) {
			console.log(resultadoAutenticar);	
				    res.json({
					modelo: resultadoAutenticar[0].modelo
				    });
		    } else  {
			res.status(403).send("Modelo do carro inválido");
		    }
		}
	    ).catch(
		function (erro) {
		    console.log(erro);
		    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
		    res.status(500).json(erro.sqlMessage);
		}
	    );
    }
}


function cadastrarCarro(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var placa = req.body.placaServer;
    var volume = req.body.volumeServer;
    var altura = req.body.alturaServer;
    var modelo = req.body.modeloServer;

    // Faça as validações dos valores
    if (placa == undefined) {
	res.status(400).send("Seu placa está undefined!");
    } else if (volume == undefined) {
	res.status(400).send("Seu volume está undefined!");
    } else if (altura == undefined) {
	res.status(400).send("Seu altura está undefined!");
    } else if (modelo == undefined) {
	res.status(400).send("Sua modelo está undefined!");
    }  
    else {

	// Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
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

module.exports = {
    autenticarModelo,
    cadastrarCarro
}