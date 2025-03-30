function calcularBeneficio() {
    var precoCarro = Number(ipt_carros.value);
    var percentualValorizacao = Number(ipt_percentualAumento.value) / 100;
    var qtdVendasVeiculos = Number(ipt_qtdVeiculos.value);
    var concerto = Number(ipt_concerto.value);
    var custoManutencao = Number(ipt_custoManutencao.value);

    var valorValorizacao = precoCarro * percentualValorizacao;
    var valorVeiculoValorizado = precoCarro + valorValorizacao;
    var lucroAnual = ((precoCarro + valorValorizacao) * qtdVendasVeiculos);
    var valorConcerto = (concerto * custoManutencao);
    var valorConcertoSensor = valorConcerto - (valorConcerto * 0.3);

    respostaBeneficio.innerHTML = `
    <h2>Valores Financeiros</h2>
    Com base nos dados inseridos, você (montadora) poderá lucrar em cima dos benefícios do sensor cerca de 
    R$${valorValorizacao} (${percentualValorizacao * 100}%) em relação ao preço médio por veículo de R$${precoCarro}.
    <br>
    O novo valor do veículo passaria a ser R$${valorVeiculoValorizado}, justificado pelos seguintes benefícios do sensor:
    <ul>
        <li>Reduz custo de danos ao motor por falta de óleo</li>
        <li>Evita gastos inesperados com manutenção</li>
        <li>Aumenta vida útil do motor</li>
    </ul>
    <br>
    Quando um carro tem um diferencial tecnológico que melhora sua confiabilidade, segurança e reduz custos com manutenção, os consumidores podem enxergar mais valor nesse veículo, aceitando pagar um pouco mais por ele.
    <br>
    <br>
    Com base nesses dados, o lucro anual da empresa seria de R$${lucroAnual}!
    <br>
    Além disso, o custo mensal dos consertos, antes de R$${valorConcerto}, passaria a ser R$${valorConcertoSensor} com o uso do sensor, representando uma economia significativa!
    `;
}