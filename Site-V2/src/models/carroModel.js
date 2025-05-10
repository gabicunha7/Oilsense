var database = require("../database/config")

function autenticarModelo(modelo) {
	console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", modelo)
	var instrucaoSql = `
	SELECT fkmodelo FROM modelo WHERE nome = '${modelo}';
    `;
	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function cadastrarCarro(placa, volume, altura, modelo, ano) {
	console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarCarro():", placa, volumecarter, alturacarter, fkmodelo);

	// Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
	//  e na ordem de inserção dos dados.
	var instrucaoSql = `
        INSERT INTO carro (placa, volumecarter, alturacarter, fkmodelo) VALUES ('${placa}', ${volume}, ${altura}, (select fkmodelo
from modelo where modelo = '${modelo}' and ano = '${ano}'));
    `;
	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}


module.exports = {
	cadastrarCarro,
	autenticarModelo
};