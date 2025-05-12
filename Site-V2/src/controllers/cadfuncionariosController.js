var FuncionarioModel = require('../models/FuncionarioModel');

function cadastrar(req, res) {
    var { nome, sobrenome, email, senha, fkmontadora } = req.body;

    if (!nome || !sobrenome || !email || !senha || !fkmontadora) {
        return res.status(400).send('Todos os campos são obrigatórios.');
    }

    try {
        FuncionarioModel.cadastrarFuncionario({ nome, sobrenome, email, senha, fkmontadora });
        res.status(200).send('Funcionário cadastrado com sucesso.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao cadastrar funcionário.');
    }
}

module.exports = {
    cadastrar
};