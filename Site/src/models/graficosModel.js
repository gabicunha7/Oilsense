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

function nivelDeAlertaPorMes(mes, ano, id_montadora) {
        console.log("ACESSEI O FUNCIONARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarFuncionarios()");

        var instrucaoSql = `
                select nivel_oleo, count(*) contagem from (
                select 
                case when avg(((c.alturacarter - t.distancia) / c.alturacarter) * 100) > 70 then 'Nível 1 (Excesso de óleo)'
                when avg(((c.alturacarter - t.distancia) / c.alturacarter) * 100) < 60 then 'Nível 2 (Falta de óleo)'
                        when avg(((c.alturacarter - t.distancia) / c.alturacarter) * 100) < 50 then 'Nível 3 (Crítico de falta de óleo)'
                        else 'Sem Alerta' 
                end as nivel_oleo
                from carro c
                inner join sensor s   
                        on c.fksensor = s.id
                inner join telemetria t
                        on t.fksensor = s.id
				inner join modelo m
					on c.fkmodelo = m.id
                where month(dtHoraColeta) = ${mes} and year(dtHoraColeta) = ${ano} and m.fkmontadora = ${id_montadora}
                group by c.placa) alertas
                group by nivel_oleo;
        `;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
}

function anosParceira(montadora_id) {
        console.log("ACESSEI O FUNCIONARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarFuncionarios()");

        var instrucaoSql = `
                select (year(current_date()) - year(dtcadastro)) qtd_anos, year(dtcadastro) dtcadastro
                from montadora m
                where m.id = ${montadora_id};
        `;

        console.log("Executando a instrução SQL: \n" + instrucaoSql);
        return database.executar(instrucaoSql);
}


module.exports = {
        porcentagemCarroPorPlaca,
        porcentagemMediaModelo,
        nivelDeAlertaPorMes,
        anosParceira
}