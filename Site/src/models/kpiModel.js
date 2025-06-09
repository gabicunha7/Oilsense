var database = require("../database/config");



function kpiBarra(placa) {
    console.log("ACESSEI O GRAFICO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function kpiBarra() ");

    var instrucaoSql = `select 
    truncate(max((((c.alturacarter - t.distancia) / c.alturacarter) * 100)),1) as altura_nivel,
    date_format(t.dtHoraColeta,'%Y-%m') as dtcoleta,
    c.placa,
    (select count(distinct date(t2.dtHoraColeta))
        from telemetria t2
        inner join sensor s2 on t2.fksensor = s2.id
        inner join carro c2 on c2.fksensor = s2.id
        where c2.placa = c.placa
          and ((c2.alturacarter - t2.distancia) / c2.alturacarter) * 100 > 50 ) as dias_acima_50
                from carro c
                inner join sensor s on c.fksensor = s.id
                inner join telemetria t on t.fksensor = s.id
                inner join modelo mdl on c.fkmodelo = mdl.id
                inner join montadora m on mdl.fkmontadora = m.id
                where c.placa = '${placa}'
                group by dtcoleta, c.placa, m.id
                limit 1;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}



function kpiLinha(placa) {
    console.log("ACESSEI O GRAFICO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function kpiBarra() ", placa);

    var instrucaoSql = `
    
    SELECT
    q1.meses_acima_media_carro,
    q2.mes_menor_media_modelo,
    q3.qtd_carros_modelo
FROM
    (
        SELECT 
            COUNT(*) AS meses_acima_media_carro
        FROM
            (
                SELECT
                    DATE_FORMAT(t.dtHoraColeta, '%Y-%m') AS mes,
                    AVG(((c.alturacarter - t.distancia) / c.alturacarter) * 100) AS media_oleo_carro
                FROM telemetria t
                INNER JOIN sensor s ON t.fksensor = s.id
                INNER JOIN carro c ON c.fksensor = s.id
                WHERE c.placa = '${placa}'
                GROUP BY mes
            ) AS medias_carro
        INNER JOIN
            (
                SELECT
                    DATE_FORMAT(t.dtHoraColeta, '%Y-%m') AS mes,
                    AVG(((c.alturacarter - t.distancia) / c.alturacarter) * 100) AS media_oleo_modelo
                FROM telemetria t
                INNER JOIN sensor s ON t.fksensor = s.id
                INNER JOIN carro c ON c.fksensor = s.id
                WHERE c.fkmodelo = (
                    SELECT fkmodelo FROM carro WHERE placa = '${placa}' LIMIT 1
                )
                GROUP BY mes
            ) AS medias_modelo ON medias_carro.mes = medias_modelo.mes
        WHERE medias_carro.media_oleo_carro > medias_modelo.media_oleo_modelo
    ) AS q1,

    (
        SELECT 
            mes AS mes_menor_media_modelo
        FROM
            (
                SELECT
                    DATE_FORMAT(t.dtHoraColeta, '%Y-%m') AS mes,
                    AVG(((c.alturacarter - t.distancia) / c.alturacarter) * 100) AS media_oleo_modelo,
                    ROW_NUMBER() OVER (ORDER BY AVG(((c.alturacarter - t.distancia) / c.alturacarter) * 100)) AS rn
                FROM telemetria t
                INNER JOIN sensor s ON t.fksensor = s.id
                INNER JOIN carro c ON c.fksensor = s.id
                WHERE c.fkmodelo = (
                    SELECT fkmodelo FROM carro WHERE placa = '${placa}' LIMIT 1
                )
                GROUP BY mes
            ) AS medias_modelo
        WHERE rn = 1
    ) AS q2,

    (
        SELECT COUNT(*) AS qtd_carros_modelo
        FROM carro
        WHERE fkmodelo = (
            SELECT fkmodelo FROM carro WHERE placa = '${placa}' LIMIT 1
        )
    ) AS q3;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}





function kpiArea(data) {
    console.log("ACESSEI O GRAFICO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function kpiBarra() ", data);

    var instrucaoSql = `
    
    -`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}




function kpiPizza(data) {
    console.log("ACESSEI O GRAFICO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function kpiBarra() ", data);

    var instrucaoSql = `
    SELECT
    nivel_oleo AS nivel_mais_frequente,
    qtd_alertas AS maior_qtd_alertas,
    (SELECT COUNT(*) FROM vw_nivel_oleo WHERE dtcoleta = '${data}' ) AS total_alertas
FROM (
    SELECT nivel_oleo, COUNT(*) AS qtd_alertas
    FROM vw_nivel_oleo
    WHERE dtcoleta = '${data}'
    GROUP BY nivel_oleo
    ORDER BY qtd_alertas DESC
    LIMIT 1
) AS subconsult`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}




module.exports = {
    kpiBarra,
    kpiArea,
    kpiPizza,
    kpiLinha
};