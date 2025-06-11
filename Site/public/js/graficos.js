let grafico = null;
let alertaModeloAtual = 1;
let alertaVeiculoAtual = 1;
let intervaloAtualizacao = null;



function voltar() {
    if (grafico) {
        grafico.destroy();
        grafico = null;
    }
    if (intervaloAtualizacao) {
        clearInterval(intervaloAtualizacao);
        intervaloAtualizacao = null;
    }

    document.querySelector('#carros .grafico').style.display = 'none';
    document.querySelector('#carros .btn-voltar').style.display = 'none';

    document.querySelector('#carros table').style.display = 'table';
    document.querySelector('#carros .botoes-tipos-alertas').style.display = 'flex';

    document.querySelector('#modelos .grafico').style.display = 'none';
    document.querySelector('#modelos .btn-voltar').style.display = 'none';

    document.querySelector('#modelos table').style.display = 'table';
    document.querySelector('#modelos .botoes-tipos-alertas').style.display = 'flex';
}


function alertasGraficoDePizza() {
    let montadora_id = sessionStorage.ID_MONTADORA;

    fetch(`/graficos/nivelDeAlertaPorDia/${montadora_id}`)
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.statusText == 'No Content') {
                    alertas.innerHTML = '<p> Nenhum dado encontrado </p>';
                } else {
                    resposta.json().then(function (dados) {
                        console.log("graficos:", dados);
                        let totalAlertas = 0;
                        for (let i = 0; i < dados.length; i++) {
                            totalAlertas += dados[i].qtde;
                        }

                        let maiorQtd = -Infinity;
                        let alertaMaisFrequente = '';
                        for (let i = 0; i < dados.length; i++) {
                            if (dados[i].qtde > maiorQtd) {
                                maiorQtd = dados[i].qtde;
                                alertaMaisFrequente = dados[i].nivel_oleo;
                            }
                        }

                        let menorQtd = Infinity;
                        let alertaMenosFrequente = '';
                        for (let i = 0; i < dados.length; i++) {
                            if (dados[i].qtde < menorQtd) {
                                menorQtd = dados[i].qtde;
                                alertaMenosFrequente = dados[i].nivel_oleo;
                            }
                        }

                        document.querySelector('#alertas .kpis').innerHTML = 
                            `<div class="indicador">
                                <h3>${totalAlertas}</h3>
                                <p>Total de Alertas</p>
                            </div>
                            <div class="indicador">
                                <h3>${alertaMaisFrequente} | total: (${maiorQtd})</h3>
                                <p>Alerta Mais Frequente</p>
                            </div>
                            <div class="indicador">
                                <h3>${alertaMenosFrequente} | total: (${menorQtd})</h3>
                                <p>Alerta Menos Frequente</p>
                            </div>`;
                        plotarGraficoPizza(dados);
                    });
                }
            } else {
                alert("Houve um erro ao tentar puxar os dados!");
            }
        })
        .catch(function (erro) {
            console.error("#ERRO: ", erro);
            alert("Erro ao comunicar com o servidor.");
        });

    return false;
}



function graficoModelo(modelo_id) {

    if (grafico) {
        grafico.destroy();
        grafico = null;
    }

    document.querySelector('#modelos table').style.display = 'none';
    document.querySelector('#modelos .botoes-tipos-alertas').style.display = 'none';
    document.querySelector('#modelos .grafico').style.display = 'block';
    document.querySelector('#modelos .btn-voltar').style.display = 'inline-block';

    function atualizarGrafico() {
        fetch(`/graficos/graficoPorModelo/${modelo_id}`)
            .then(function (resposta) {
                if (resposta.ok) {
                    if (resposta.statusText === 'No Content') {
                        document.querySelector('#modelos .grafico').innerHTML = '<p>Nenhum dado encontrado para este carro.</p>';
                    } else {
                        resposta.json().then(function (dados) {

                            let soma = 0;
                            let pior = Number(dados[0].porcentagem);
                            let melhor = Number(dados[0].porcentagem);

                            for (let i = 0; i < dados.length; i++) {
                                const valor = Number(dados[i].porcentagem);

                                soma += valor;

                                if (valor < pior) {
                                    pior = valor;
                                }
                                if (valor > melhor) {
                                    melhor = valor;
                                }
                            }

                            const ultima = Number(dados[0].porcentagem);
                            const media = (soma / dados.length).toFixed(2);

                            document.querySelector('#modelos .kpis').innerHTML = `
                                <div class="indicador">
                                    <h3>${ultima}%</h3>
                                    <p>Última leitura</p>
                                </div>
                                <div class="indicador">
                                    <h3>${media}%</h3>
                                    <p>Média recente</p>
                                </div>
                                <div class="indicador">
                                    <h3>${pior}%</h3>
                                    <p>Pior leitura</p>
                                </div>
                                <div class="indicador">
                                    <h3>${melhor}%</h3>
                                    <p>Melhor leitura</p>
                                </div>
                            `;

                            plotarGraficoModelo(dados);
                        });
                    }
                } else {
                    alert("Houve um erro ao tentar puxar os dados!");
                }
            })
            .catch(function (erro) {
                console.error("#ERRO: ", erro);
                alert("Erro ao comunicar com o servidor.");
            });
    }

    atualizarGrafico();

    intervaloAtualizacao = setInterval(atualizarGrafico, 6000);
}



function exibirGraficoCarroEspecifico(codigo) {
    if (grafico) {
        grafico.destroy();
        grafico = null;
    }

    document.querySelector('#carros table').style.display = 'none';
    document.querySelector('#carros .botoes-tipos-alertas').style.display = 'none';
    document.querySelector('#carros .grafico').style.display = 'block';
    document.querySelector('#carros .btn-voltar').style.display = 'inline-block';

function atualizarGrafico() {
        fetch(`/graficos/graficoPorCarro/${codigo}`)
            .then(function (resposta) {
                if (resposta.ok) {
                    if (resposta.statusText === 'No Content') {
                        document.querySelector('#carros .grafico').innerHTML = '<p>Nenhum dado encontrado para este carro.</p>';
                    } else {
                        resposta.json().then(function (dados) {
                            if (dados.length === 0) {
                                document.querySelector('#carros .grafico').innerHTML = '<p>Nenhum dado encontrado para este carro.</p>';
                                return;
                            }

                            let soma = 0;
                            let max = -Infinity;
                            let min = Infinity;
                            let numColetas = 0;

                            for (let i = 0; i < dados.length; i++) {
                                let valor = parseFloat(dados[i].porcentagem);
                                soma += valor;
                                if (valor > max) max = valor;
                                if (valor < min) min = valor;
                                numColetas++;
                            }

                            let media = (soma / numColetas).toFixed(2);
                            max = max.toFixed(2);
                            min = min.toFixed(2);

                            document.querySelector('#carros .kpis').innerHTML = `
                                <div class="indicador">
                                    <h3>Média Atual</h3>
                                    <p>${media}%</p>
                                </div>
                                <div class="indicador">
                                    <h3>Máximo</h3>
                                    <p>${max}%</p>
                                </div>
                                <div class="indicador">
                                    <h3>Mínimo</h3>
                                    <p>${min}%</p>
                                </div>
                                <div class="indicador">
                                    <h3>Nº Coletas</h3>
                                    <p>${numColetas}</p>
                                </div>
                                `;

                            plotarGraficoCarro(dados);
                        });
                    }
                } else {
                    alert("Houve um erro ao tentar puxar os dados!");
                }
            })
            .catch(function (erro) {
                console.error("#ERRO: ", erro);
                alert("Erro ao comunicar com o servidor.");
            });
        }

    atualizarGrafico();

    intervaloAtualizacao = setInterval(atualizarGrafico, 6000);
}



function plotarGraficoCarro(dados) {

    let labels = [];
    let valores = [];

    for (let i = 0; i < dados.length; i++) {
        labels.push(dados[i].instante);
        valores.push(dados[i].porcentagem);
    }

    const config = {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Veículo',
                data: valores,
                backgroundColor: ['rgb(235, 54, 54)'],
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Níveis da altura do óleo do carro',
                    font: { size: 28 },
                    padding: { top: 16, bottom: 16 }
                },
                annotation: {
                    annotations: {
                        linhaLimite60: {
                            type: 'line',
                            yMin: 60,
                            yMax: 60,
                            borderColor: 'yellow',
                            borderWidth: 2,
                            label: {
                                content: '60%',
                                enabled: true,
                                position: 'start',
                                color: 'red',
                            }
                        },
                        linhaLimite70: {
                            type: 'line',
                            yMin: 70,
                            yMax: 70,
                            borderColor: 'yellow',
                            borderWidth: 2,
                            label: {
                                content: ' 70%',
                                enabled: true,
                                position: 'start',
                                color: 'red',
                            }
                        }
                    }
                }
            },
            scales: {
                y: {
                    min: 0,
                    max: 100,
                }
            }
        }
    };

    Chart.defaults.color = '#ffffff';
    Chart.defaults.font.size = 16;

    if (grafico != null) {
        grafico.destroy();
    }

    grafico = new Chart(
        document.getElementById('dashboard-carros'),
        config
    );
}


function plotarGraficoModelo(dados) {
    let labels = [];
    let valores = [];

    for (let i = dados.length - 1; i >= 0; i--) {
        labels.push(dados[i].instante);
        valores.push(dados[i].porcentagem);
    }

    const config = {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Nível médio de óleo (%)',
                data: valores,
                borderColor: 'rgb(235, 54, 54)',
                backgroundColor: 'rgba(235, 54, 54, 0.2)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: 'Nível médio de óleo dos veículos da montadora',
                    font: { size: 24 },
                    padding: { top: 20, bottom: 10 }
                },
                legend: {
                    labels: {
                        color: '#ffffff'
                    }
                },
                annotation: {
                    annotations: {
                        limite60: {
                            type: 'line',
                            yMin: 60,
                            yMax: 60,
                            borderColor: 'yellow',
                            borderWidth: 2,
                            label: {
                                content: '',
                                enabled: true,
                                position: 'start',
                                backgroundColor: 'yellow',
                                color: 'black'
                            }
                        },
                        limite70: {
                            type: 'line',
                            yMin: 70,
                            yMax: 70,
                            borderColor: 'yellow',
                            borderWidth: 2,
                            label: {
                                content: '',
                                enabled: true,
                                position: 'start',
                                backgroundColor: 'yellow',
                                color: 'black'
                            }
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                    title: {
                        display: true,
                        text: '% do Nível de Óleo'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Instante da Coleta'
                    }
                }
            }
        },
    };



    Chart.defaults.color = '#ffffff';
    Chart.defaults.font.size = 16;

    if (grafico != null) {
        grafico.destroy();
    }

    grafico = new Chart(
        document.getElementById('dashboard-modelos'),
        config
    );

}


function veiculosComAlerta(alerta) {
    let montadora_id = sessionStorage.ID_MONTADORA;
    alertaVeiculoAtual = alerta;

    fetch(`/graficos/carrosAlerta`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            alerta: alerta,
            montadora: montadora_id
        }),
    })
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.statusText == 'No Content') {
                    let secGrafico = document.querySelector('#carros .grafico');
                    let mensagem = document.querySelector('#carros .mensagem');
                    let tabela = document.querySelector('#carros table');

                    tabela.style.display = 'none';

                    secGrafico.style.display = 'none';
                    mensagem.innerHTML = `Nenhum carro com nível ${alerta} de alerta`;
                } else {
                    resposta.json().then(function (dados) {
                        console.log("graficos:", dados);
                        exibirTabelaCarros(dados);
                    });
                }
            } else {
                alert("Houve um erro ao tentar puxar os dados!");
            }
        })
        .catch(function (erro) {
            console.error("#ERRO: ", erro);
            alert("Erro ao comunicar com o servidor.");
        });
}

function modelosComAlerta(alerta) {
    let montadora_id = sessionStorage.ID_MONTADORA;
    alertaModeloAtual = alerta;

    fetch(`/graficos/modelosAlerta`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            alerta: alerta,
            montadora: montadora_id
        }),
    })
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.statusText == 'No Content') {
                    let secGrafico = document.querySelector('#modelos .grafico');
                    let mensagem = document.querySelector('#modelos .mensagem');
                    let tabela = document.querySelector('#modelos table');

                    tabela.style.display = 'none';

                    secGrafico.style.display = 'none';
                    mensagem.innerHTML = `Nenhum modelo com nível ${alerta} de alerta`;
                } else {
                    resposta.json().then(function (dados) {
                        console.log("graficos:", dados);
                        exibirTabelaModelos(dados);
                    });
                }
            } else {
                alert("Houve um erro ao tentar puxar os dados!");
            }
        })
        .catch(function (erro) {
            console.error("#ERRO: ", erro);
            alert("Erro ao comunicar com o servidor.");
        });
}

function exibirTabelaCarros(dados) {
    let tabela = document.querySelector('#carros table');
    tabela.style.display = 'table';

    let secGrafico = document.querySelector('#carros .grafico');
    secGrafico.style.display = 'none';


    let conteudo = `<tr>
                        <th> Código Veiculo </th>
                        <th> Modelo </th>
                        <th> Exibir Situação </th>
                    </tr>`;

    for (let i = 0; i < dados.length; i++) {
        conteudo += `<tr>
                <td> ${dados[i].cod} </td>
                <td> ${dados[i].modelo} </td>
                <td> 
                    <button onclick="exibirGraficoCarroEspecifico('${dados[i].cod}')" class="btnTabela">  
                        <img src="../img/icones/painelIcone.png" alt="Icone de painel" class="iconeTabela"> 
                    </button>
                </td>
            </tr>`;
    }

    tabela.innerHTML = conteudo;
}

function exibirTabelaModelos(dados) {
    let tabela = document.querySelector('#modelos table');
    tabela.style.display = 'table';

    let conteudo = `<tr>
                        <th> Modelo </th>
                        <th> Quantidade de Veículos </th>
                        <th> Exibir Situação </th>
                    </tr>`;

    for (let i = 0; i < dados.length; i++) {
        conteudo += `<tr>
                <td> ${dados[i].modelo} </td>
                <td> ${dados[i].qtd} </td>
                <td>
                    <button onclick="graficoModelo('${dados[i].id_modelo}')" class="btnTabela">  
                        <img src="../img/icones/painelIcone.png" alt="Icone de painel" class="iconeTabela"> 
                    </button> 
                </td>
            </tr>`;
    }

    tabela.innerHTML = conteudo;
}

function plotarGraficoPizza(dados) {
    let labels = [];

    const config = {
        type: 'pie',
        data: {
            labels: labels,
            datasets: [{
                label: 'Veiculos',
                backgroundColor: [
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(255, 99, 132)',
                    'rgb(54, 205, 86)'
                ],
                data: []
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Níveis de alertas dos veículos em um dia',
                    font: {
                        size: 28
                    },
                    padding: {
                        top: 16,
                        bottom: 16
                    }
                }
            }
        }
    };
    for (var i = 0; i < dados.length; i++) {
        config.data.datasets[0].data.push(dados[i].qtde)
        config.data.labels.push(dados[i].nivel_oleo)

    }

    document.querySelector(".tamanho").style.display = "block"

    Chart.defaults.color = '#ffffff';
    Chart.defaults.font.size = 16;

    if (grafico != null) {
        grafico.destroy();
    }

    grafico = new Chart(
        document.getElementById('dashboard-alertas'),
        config
    );

}

function exibir(tipo) {
    let tipoDashboard = document.querySelector(`#${tipo}`);
    let botoesTipos = document.querySelectorAll('.botoes-tipos button');

    tipoDashboard.style.display = 'block';

    if (intervaloAtualizacao) {
        clearInterval(intervaloAtualizacao);
        intervaloAtualizacao = null;
    }

    let indice = 0;
    if (tipo == 'alertas') {
        modelos.style.display = 'none';
        carros.style.display = 'none';
        alertasGraficoDePizza();

        indice = 0;
    } else if (tipo == 'modelos') {
        alertas.style.display = 'none';
        carros.style.display = 'none';
        document.querySelector("#modelos .botoes-tipos-alertas").style.display = "grid";
        modelosComAlerta(alertaModeloAtual);

        indice = 1;
    } else {
        modelos.style.display = 'none';
        alertas.style.display = 'none';
        document.querySelector("#carros .botoes-tipos-alertas").style.display = "grid";
        veiculosComAlerta(alertaVeiculoAtual);

        indice = 2;
    }

    if (!botoesTipos[indice].classList.contains('btn-selecionado')) {
        botoesTipos[indice].classList.add('btn-selecionado');
    }

    for (let i = 0; i < botoesTipos.length; i++) {
        if (botoesTipos[i].classList.contains('btn-selecionado') && botoesTipos[i] != botoesTipos[indice]) {
            botoesTipos[i].classList.toggle('btn-selecionado');
        }
    }
}

function exibirNivel(tipo, tipoGrafico) {
    let botoesTipos = document.querySelectorAll(`#${tipoGrafico} .botoes-tipos-alertas  button`);
    let mensagem = document.querySelector(`#${tipoGrafico} .mensagem`);

    mensagem.innerHTML = '';

    let indice = 0;
    if (tipo == '1') {
        indice = 0;
    } else if (tipo == '2') {
        indice = 1;
    } else {
        indice = 2;
    }

    if (tipoGrafico == 'carros') {
        veiculosComAlerta(tipo);

    } else {
        modelosComAlerta(tipo);
    }

    if (!botoesTipos[indice].classList.contains('btn-selecionado')) {
        botoesTipos[indice].classList.add('btn-selecionado');
    }

    for (let i = 0; i < botoesTipos.length; i++) {
        if (botoesTipos[i].classList.contains('btn-selecionado') && botoesTipos[i] != botoesTipos[indice]) {
            botoesTipos[i].classList.toggle('btn-selecionado');
        }
    }
}

function exibirConhecer() {
    let alertas = document.querySelector('aside.alertas');

    alertas.style.display = 'flex';
}

function fecharConhecer() {
    let alertas = document.querySelector('aside.alertas');

    alertas.style.display = 'none';
}