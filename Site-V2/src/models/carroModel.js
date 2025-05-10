var database = require("../database/config")

function cadastrarCarro(placa, volume, altura, modelo, ano) {
	console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarCarro():", placa, volumecarter, alturacarter, fkmodelo);

	// Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
	//  e na ordem de inserção dos dados.
	var instrucaoSql = `
	set @idsensor = null;
	insert into sensor(status) values ('Ativo'); 
	set @idsensor = last_insert_id();
        INSERT INTO carro (placa, volumecarter, alturacarter, fkmodelo, fksensor) VALUES ('${placa}', ${volume}, ${altura}, (select fkmodelo
from modelo where modelo = '${modelo}' and ano = ${ano}), @idsensor);
 `; // perguntar se posso fazer com variaveis do sql se não tem que separar em partes, criação de sensor e inserção
	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}


module.exports = {
	cadastrarCarro
};