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

function listarUmModelo(idModelo) {
    console.log("ACESSEI O MODELO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarUmModelo()");

    var instrucaoSql = `
        SELECT id, modelo, ano FROM modelo WHERE id = ${idModelo};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editarModelo(nome, ano, idModelo) {
    console.log("ACESSEI O MODELO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editarModelo():", nome, ano, idModelo);

    var instrucaoSql = `
        UPDATE modelo SET modelo = '${nome}', ano = ${ano} WHERE id = ${idModelo};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

async function excluirModelo(id_modelo) {
    console.log("ACESSEI O MODELO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluirModelo():", id_modelo);

    await atualizarSensores(id_modelo);
    await excluirCarros(id_modelo);

    var instrucaoSql = `
        DELETE FROM modelo WHERE id = ${id_modelo};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function atualizarSensores(id_modelo) {
    var instrucaoSql = `
        UPDATE sensor 
        INNER JOIN carro car ON car.fksensor = sensor.id
        INNER JOIN modelo mdl ON mdl.id = car.fkmodelo
        SET status = 'Inativo'
        WHERE mdl.id = ${id_modelo};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function excluirCarros(id_modelo) {
    var instrucaoSql = `
        DELETE FROM carro WHERE fkmodelo = ${id_modelo};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



module.exports = {
    cadastrarModelo,
    listarModelos,
    listarUmModelo,
    editarModelo,
    excluirModelo
};