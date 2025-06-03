var database = require("../database/config")

function cadastrarCarro(placa, volume, altura, fkmodelo, idsensor) {
	console.log("ACESSEI O CARRO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarCarro():", placa, volume, altura, fkmodelo, idsensor);

	// Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
	//  e na ordem de inserção dos dados.
	var instrucaoSql = `
        INSERT INTO carro (placa, volumecarter, alturacarter, fkmodelo, fksensor) VALUES ('${placa}', ${volume}, ${altura}, ${fkmodelo}, ${idsensor});
 `; // perguntar se posso fazer com variaveis do sql se não tem que separar em partes, criação de sensor e inserção
	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function listarCarros(idMontadora) {
	console.log("ACESSEI O CARRO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarModelos():", idMontadora);

	var instrucaoSql = `
        SELECT car.fksensor id, car.placa, car.volumecarter, car.alturacarter, mdl.modelo
		FROM carro car
		INNER JOIN modelo mdl ON mdl.id = car.fkmodelo
		WHERE mdl.fkmontadora = ${idMontadora};
    `;
	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function cadastrarSensor() {
	console.log("ACESSEI O CARRO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrarSensor():");

	var instrucaoSql = `
        INSERT INTO sensor (status) VALUES ('Inativo');
    `;

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function listarSensor() {
	console.log("ACESSEI O CARRO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarSensor():");

	var instrucaoSql = `
        SELECT id
		FROM sensor
		WHERE status = 'Inativo'
        LIMIT 1;
    `;

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function atualizarSensor(idSensor) {
	console.log("ACESSEI O CARRO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarSensor():", idSensor);

	var instrucaoSql = `
        UPDATE sensor SET status = 'Ativo' WHERE id = ${idSensor};
    `;

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

function listarUmCarro(idCarro) {
    console.log("ACESSEI O CARRO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarUmCarro()");

    var instrucaoSql = `
        SELECT fksensor id, placa, volumecarter, alturacarter FROM carro WHERE fksensor = ${idCarro};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editarCarro(placa, volume, altura, idCarro) {
	console.log("ACESSEI O CARRO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editarCarro():", placa, volume, altura, idCarro);

	var instrucaoSql = `
		UPDATE carro SET placa = '${placa}', volumecarter = ${volume}, alturacarter = ${altura} WHERE fksensor = ${idCarro};
	`;

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

async function excluirCarro(id_carro) {
    console.log("ACESSEI O CARRO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluirCarro():", id_carro);

	await deixarSensorInativo(id_carro);

    var instrucaoSql = `
        DELETE FROM carro WHERE fksensor = ${id_carro};
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function deixarSensorInativo(idSensor) {
	var instrucaoSql = `
        UPDATE sensor SET status = 'Inativo' WHERE id = ${idSensor};
    `;

	console.log("Executando a instrução SQL: \n" + instrucaoSql);
	return database.executar(instrucaoSql);
}

module.exports = {
	cadastrarCarro,
	listarCarros,
	cadastrarSensor,
	listarSensor,
	atualizarSensor,
	listarUmCarro,
	editarCarro,
	excluirCarro
};