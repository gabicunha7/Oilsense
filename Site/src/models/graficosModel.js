var database = require("../database/config");

function nivelDeAlertaPorDia(id_montadora) {
        console.log("ACESSEI O GRAFICO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function nivelDeAlertaPorMes()");

        var instrucaoSql = `
                SELECT nivel_oleo, COUNT(nivel_oleo) qtde FROM vw_nivel_oleo where dtcoleta = current_date() and id_montadora = ${id_montadora}
                GROUP BY nivel_oleo;
        `;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
}

function carrosAlerta(alerta, montadora) {
        console.log("ACESSEI O GRAFICO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function nivelDeAlertaPorMes()");

        var instrucaoSql = `
                select * from vw_listar_alertas where id = ${montadora} and nivel_oleo = ${alerta};
        `;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
}



module.exports = {
        nivelDeAlertaPorDia,
        carrosAlerta
}