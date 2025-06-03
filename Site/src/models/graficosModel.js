var database = require("../database/config");



function porcentagemCarroPorPlaca(placa) {
    console.log("ACESSEI O FUNCIONARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarFuncionarios()");

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
        where placa = '${placa}' limit 7;
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function porcentagemMediaModelo(modelo_id) {
    console.log("ACESSEI O FUNCIONARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarFuncionarios()");

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

module.exports = {
    graficosModel,
    porcentagemCarroPorPlaca,
    porcentagemMediaModelo
}