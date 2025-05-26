var funcionarioModel = require('../models/funcionarioModel');

function cadastrarFuncionario(req, res) {
    var nome = req.body.nomeServer;
    var sobrenome = req.body.sobrenomeServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var idMontadora = req.body.idMontadoraServer;

    // Validações individuais
    if (nome == undefined) {
        res.status(400).send("O nome está undefined!");
    } else if (sobrenome == undefined) {
        res.status(400).send("O sobrenome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("O email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("A senha está undefined!");
    } else {
        funcionarioModel.cadastrarFuncionario(nome, sobrenome, email, senha, idMontadora)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            )
            .catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao cadastrar o funcionário! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function listarFuncionarios(req, res) {
    var idMontadora = req.params.idMontadora;

    funcionarioModel.listarFuncionarios(idMontadora)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    res.status(200).json(resultado);
                } else {
                    res.status(204).send("Nenhum funcionário encontrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("\nHouve um erro ao listar os funcionários! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function autenticarFuncionario(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } 
    else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } 
    else {

        funcionarioModel.autenticarFuncionario(email, senha)
            .then(
                function (resultadoAutenticar) {
                    console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`);

                    if (resultadoAutenticar.length == 1) {
                        console.log(resultadoAutenticar);
                                
                                    res.json({
                                        id: resultadoAutenticar[0].id,
                                        email: resultadoAutenticar[0].email,
                                        nome: resultadoAutenticar[0].nome,
                                        sobrenome: resultadoAutenticar[0].sobrenome,

                                        fkmontadora: resultadoAutenticar[0].fkmontadora
                                    });

                            
                    } else if (resultadoAutenticar.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um funcionário com o mesmo login e senha!");
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

module.exports = {
    cadastrarFuncionario,
    listarFuncionarios,
    autenticarFuncionario
};