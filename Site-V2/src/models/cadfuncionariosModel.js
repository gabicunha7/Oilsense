var db = require('../database/config');

function cadastrarFuncionario({ nome, sobrenome, email, senha, fkmontadora }) {
    var sql = `INSERT INTO funcionario (nome, sobrenome, email, senha, fkmontadora) VALUES (?, ?, ?, ?, ?)`;
    return db.execute(sql, [nome, sobrenome, email, senha, fkmontadora]);
}

module.exports = {
    cadastrarFuncionario
};
