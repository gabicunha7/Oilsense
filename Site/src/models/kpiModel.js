var database = require("../database/config");



function kpiBarra(placa) {
    console.log("ACESSEI O GRAFICO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function kpiBarra() ");

    var instrucaoSql = `select max((((c.alturacarter - t.distancia) / c.alturacarter) * 100)) as altura_nivel, date(t.dtHoraColeta) dtcoleta, c.placa
                from carro c
                  inner join sensor s   
                        on c.fksensor = s.id
                  inner join telemetria t
					   on t.fksensor = s.id
                  inner join modelo mdl 
                        on c.fkmodelo = mdl.id
				  inner join montadora m
                        on mdl.fkmontadora = m.id
                        where  c.placa = '${placa}'
                         group by dtcoleta, c.placa, m.id limit 1;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
    kpiBarra,
};