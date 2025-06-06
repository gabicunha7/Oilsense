var database = require("../database/config");



function porcentagemCarroPorPlaca(placa) {
        console.log("ACESSEI O GRAFICO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function porcentagemCarroPorPlaca()");

        var instrucaoSql = `
        select round(((c.alturacarter - t.distancia) / c.alturacarter) * 100, 1) porcentagem,
        m.modelo, date_format(t.dtHoraColeta,'%d/%m') dia_mes
        from carro c
        inner join sensor s   
                on c.fksensor = s.id
        inner join telemetria t
                on t.fksensor = s.id
        inner join modelo m
                on c.fkmodelo = m.id
        where placa = '${placa}' order by t.dtHoraColeta desc limit 7;
    `;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
}

function porcentagemMediaModelo(modelo_id) {
        console.log("ACESSEI O GRAFICO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function porcentagemMediaModelo()");

        var instrucaoSql = `
        select round(avg(((c.alturacarter - t.distancia) / c.alturacarter) * 100), 1) porcentagem,
        m.modelo, date_format(t.dtHoraColeta,'%d/%m') dia_mes
        from carro c
        inner join sensor s   
                on c.fksensor = s.id
        inner join telemetria t
                on t.fksensor = s.id
        inner join modelo m
                on c.fkmodelo = m.id
        where m.id = ${modelo_id}
        group by m.modelo, dia_mes limit 7;
    `;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
}

function nivelDeAlertaPorMes(data, id_montadora) {
        console.log("ACESSEI O GRAFICO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function nivelDeAlertaPorMes()");

        var instrucaoSql = `
                SELECT nivel_oleo, COUNT(nivel_oleo) qtde FROM vw_nivel_oleo where dtcoleta = '${data}' and id_montadora = ${id_montadora}
                GROUP BY nivel_oleo;
        `;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
}

function anosParceira(montadora_id) {
        console.log("ACESSEI O GRAFICO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function anosParceira()");

        var instrucaoSql = `
                select date(dtcadastro) dtcadastro
                from montadora m
                where m.id = ${montadora_id};
        `;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
}

function listarCarrosModelo(idModelo) {
        console.log("ACESSEI O GRAFICO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarCarrosModelo():", idModelo);

        var instrucaoSql = `
                SELECT placa
                FROM carro
                WHERE fkmodelo = ${idModelo};
    `;
        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
}


module.exports = {
        porcentagemCarroPorPlaca,
        porcentagemMediaModelo,
        nivelDeAlertaPorMes,
        anosParceira,
        listarCarrosModelo
}