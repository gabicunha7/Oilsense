var database = require("../database/config")

function cadastrarModelo(nome, ano, id_montadora) {
    console.log("ACESSEI O MODELO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarModelo():", nome, ano, id_montadora);

    var instrucaoSql = `
        INSERT INTO modelo (modelo, ano, fkmontadora) VALUES ('${nome}', ${ano}, ${id_montadora});
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function listarModelos(id_montadora) {
    console.log("ACESSEI O MODELO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarModelos():", id_montadora);

    var instrucaoSql = `
        SELECT id, modelo, ano FROM modelo WHERE fkmontadora = ${id_montadora};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    cadastrarModelo,
    listarModelos
};