var database = require("../database/config");

function cadastrarFuncionario(nome, sobrenome, email, senha, id_montadora) {
    console.log("ACESSEI O FUNCIONARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarFuncionario():", nome, sobrenome, email, senha, id_montadora);

    var instrucaoSql = `
        INSERT INTO funcionario (nome, sobrenome, email, senha, fkmontadora) VALUES ('${nome}', '${sobrenome}', '${email}', '${senha}', ${id_montadora} );
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarFuncionarios(idMontadora) {
    console.log("ACESSEI O FUNCIONARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarFuncionarios()");

    var instrucaoSql = `
        SELECT id, nome, sobrenome, email, fkmontadora FROM funcionario WHERE fkmontadora = ${idMontadora};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarUmFuncionario(idFuncionario) {
    console.log("ACESSEI O FUNCIONARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarUmFuncionario()");

    var instrucaoSql = `
        SELECT id, nome, sobrenome, email, senha, fkmontadora FROM funcionario WHERE id = ${idFuncionario};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function autenticarFuncionario(email, senha) {
    console.log("ACESSEI O FUNCIONARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    
    var instrucaoSql = `
        SELECT id, nome, sobrenome, email, fkmontadora FROM funcionario WHERE email = '${email}' AND senha = '${senha}';
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editarFuncionario(nome, sobrenome, email, senha, id_montadora, id_funcionario) {
    console.log("ACESSEI O FUNCIONARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editarFuncionario():", nome, sobrenome, email, senha, id_montadora, id_funcionario);

    var instrucaoSql = `
        UPDATE funcionario SET nome = '${nome}', sobrenome = '${sobrenome}', email = '${email}', senha = '${senha}' WHERE id = ${id_funcionario} && fkmontadora = ${id_montadora};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function excluirFuncionario(id_montadora, id_funcionario) {
    console.log("ACESSEI O FUNCIONARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluirFuncionario():", id_montadora, id_funcionario);

    var instrucaoSql = `
        DELETE FROM funcionario WHERE id = ${id_funcionario} && fkmontadora = ${id_montadora};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    cadastrarFuncionario,
    listarFuncionarios,
    listarUmFuncionario,
    autenticarFuncionario,
    editarFuncionario,
    excluirFuncionario
};