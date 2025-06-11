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
                select * from vw_listar_alertas where id = ${montadora} and nivel_oleo = ${alerta} order by modelo desc;
        `;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
}

function modelosAlerta(alerta, montadora) {
        console.log("ACESSEI O GRAFICO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function nivelDeAlertaPorMes()");

        var instrucaoSql = `
                select count(nivel_oleo) qtd, nivel_oleo, modelo, id_modelo from vw_listar_alertas
                where id = ${montadora} and nivel_oleo = ${alerta}
                group by nivel_oleo, modelo, id_modelo;
        `;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
}


function graficoPorCarro(codigo) {
        console.log("ACESSEI O GRAFICO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function nivelDeAlertaPorMes()");

        var instrucaoSql = `
                select 
                round(((c.alturacarter - t.distancia) / c.alturacarter) * 100,2) porcentagem,
                DATE_FORMAT(t.dtHoraColeta, '%H:%i:%s') instante, concat(mdl.modelo, ' ', mdl.ano) modelo,
                c.codigo
                from carro c
                inner join sensor s   
                on c.fksensor = s.id
                inner join telemetria t
                        on t.fksensor = s.id
                inner join modelo mdl 
                        on c.fkmodelo = mdl.id
                inner join montadora m
                        on mdl.fkmontadora = m.id
                where c.codigo = '${codigo}'
                order by DATE_FORMAT(t.dtHoraColeta, '%d/%m/%Y %H:%i:%s') desc
                limit 7;
        `;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
}

function atualizarGraficoPorCarro(codigo) {
        console.log("ACESSEI O GRAFICO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function nivelDeAlertaPorMes()");

        var instrucaoSql = `
                select 
                round(((c.alturacarter - t.distancia) / c.alturacarter) * 100,2) porcentagem,
                DATE_FORMAT(t.dtHoraColeta, '%H:%i:%s') instante, concat(mdl.modelo, ' ', mdl.ano) modelo,
                c.codigo
                from carro c
                inner join sensor s   
                on c.fksensor = s.id
                inner join telemetria t
                        on t.fksensor = s.id
                inner join modelo mdl 
                        on c.fkmodelo = mdl.id
                inner join montadora m
                        on mdl.fkmontadora = m.id
                where c.codigo = '${codigo}'
                order by DATE_FORMAT(t.dtHoraColeta, '%d/%m/%Y %H:%i:%s') desc
                limit 1;
        `;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
}



function graficoPorModeloAlerta(modelo_id, alerta) {
        console.log("ACESSEI O GRAFICO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function nivelDeAlertaPorMes()");

        var instrucaoSql = `
                select 
                round(avg(((c.alturacarter - t.distancia) / c.alturacarter) * 100),2) porcentagem,
                DATE_FORMAT(t.dtHoraColeta, '%H:%i:%s') instante, mdl.id modelo, concat(mdl.modelo, ' ', mdl.ano) nome
                from carro c
                inner join sensor s   
                on c.fksensor = s.id
                inner join telemetria t
                        on t.fksensor = s.id
                inner join modelo mdl 
                        on c.fkmodelo = mdl.id
                inner join montadora m
                        on mdl.fkmontadora = m.id
				inner join vw_listar_alertas vw
		        on vw.id_modelo = mdl.id and vw.cod = c.codigo 
                where mdl.id = ${modelo_id} and vw.nivel_oleo = ${alerta}
                group by mdl.id, t.dtHoraColeta
                order by DATE_FORMAT(t.dtHoraColeta, '%d/$M/$yyyy %H:%i:%s') desc
                limit 7;
        `;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
}

function atualizarGraficoPorModelo(modelo_id, alerta) {
        console.log("ACESSEI O GRAFICO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function nivelDeAlertaPorMes()");

        var instrucaoSql = `
                select 
                round(avg(((c.alturacarter - t.distancia) / c.alturacarter) * 100),2) porcentagem,
                DATE_FORMAT(t.dtHoraColeta, '%H:%i:%s') instante, mdl.id modelo, concat(mdl.modelo, ' ', mdl.ano) nome
                from carro c
                inner join sensor s   
                on c.fksensor = s.id
                inner join telemetria t
                        on t.fksensor = s.id
                inner join modelo mdl 
                        on c.fkmodelo = mdl.id
                inner join montadora m
                        on mdl.fkmontadora = m.id
				inner join vw_listar_alertas vw
		        on vw.id_modelo = mdl.id and vw.cod = c.codigo 
                where mdl.id = ${modelo_id} and vw.nivel_oleo = ${alerta}
                group by mdl.id, t.dtHoraColeta
                order by DATE_FORMAT(t.dtHoraColeta, '%d/$M/$yyyy %H:%i:%s') desc
                limit 1;
        `;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
}





module.exports = {
        nivelDeAlertaPorDia,
        carrosAlerta,
        modelosAlerta,
        graficoPorCarro,
        graficoPorModeloAlerta,
        atualizarGraficoPorCarro,
        atualizarGraficoPorModelo
}