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
        clearTimeout(intervaloAtualizacao);
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

                        let maiorQtd = dados[0].qtde;
                        let alertaMaisFrequente = dados[0].nivel_oleo;
                        for (let i = 0; i < dados.length; i++) {
                            if (dados[i].qtde > maiorQtd) {
                                maiorQtd = dados[i].qtde;
                                alertaMaisFrequente = dados[i].nivel_oleo;
                            }
                        }

                        let menorQtd = dados[0].qtde;
                        let alertaMenosFrequente = dados[0].nivel_oleo;
                        for (let i = 0; i < dados.length; i++) {
                            if (dados[i].qtde < menorQtd) {
                                menorQtd = dados[i].qtde;
                                alertaMenosFrequente = dados[i].nivel_oleo;
                            }
                        }

                        document.querySelector('#alertas .kpis').innerHTML =
                            `<section class="indicador">
                                <h3> Total de Alertas </h3>
                                <p class="indice"> ${totalAlertas} </p>
                            </section>
                            <section class="indicador">
                                <h3> Alerta Mais Frequente </h3>
                                <p class="indice"> ${alertaMaisFrequente} | total: ${maiorQtd} </p>
                            </section>
                            <section class="indicador">
                                <h3> Alerta Menos Frequente </h3>
                                <p class="indice"> ${alertaMenosFrequente} | total: ${menorQtd} </p>
                            </section>`;
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

async function graficoModelo(modelo_id) {

    document.querySelector('#modelos table').style.display = 'none';
    document.querySelector('#modelos .botoes-tipos-alertas').style.display = 'none';
    document.querySelector('#modelos .grafico').style.display = 'block';
    document.querySelector('#modelos .btn-voltar').style.display = 'inline-block';

    let dadosSemAlerta = [];

    await fetch(`/graficos/graficoPorModeloAlerta`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            alerta: 4,
            modelo_id: modelo_id
        }),
    })
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.statusText != 'No Content') {
                    resposta.json().then(function (dados) {
                        dadosSemAlerta = dados;
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

    await fetch(`/graficos/graficoPorModeloAlerta`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            alerta: alertaModeloAtual,
            modelo_id: modelo_id
        }),
    })
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.statusText === 'No Content') {
                    document.querySelector('#modelos .mensagem').innerHTML = '<p> Nenhum dado encontrado para este carro.</p>';
                } else {
                    resposta.json().then(function (dados) {

                        let soma = 0;

                        for (let i = 0; i < dados.length; i++) {
                            const valor = Number(dados[i].porcentagem);

                            soma += valor;

                        }

                        let semNivel = 0
                        let comNIvel = 0


                        const ultima = Number(dados[0].porcentagem);
                        const media = (soma / dados.length).toFixed(2);

                        if (dadosSemAlerta.length == 0) {
                            dadosSemAlerta[0] = { qtd: 0 };
                        }

                        document.querySelector('#modelos .kpis').innerHTML = `
                            <section class="indicador">
                                <h3> Última porcentagem </h3>
                                <p class="indice"> ${ultima}% </p>
                            </section>
                            <section class="indicador">
                                <h3> Média recente </h3>
                                <p class="indice"> ${media}% </p>
                            </section>
                            <section class="indicador">
                                <h3> Quantidade de carros sem alertas </h3>
                                <p class="indice"> ${dadosSemAlerta[0].qtd} </p>
                            </section>
                            <section class="indicador">
                                <h3> Quantidade de carros com nível ${alertaModeloAtual}</h3>
                                <p class="indice">  ${dados[0].qtd} </p>
                            </section>
                        `;

                        if (dadosSemAlerta.length == 1) {
                            dadosSemAlerta = [];
                        }

                        if (dadosSemAlerta) {
                            plotarGraficoModelo(dados, dadosSemAlerta, modelo_id);
                        }
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

function exibirGraficoCarroEspecifico(codigo) {
    document.querySelector('#carros table').style.display = 'none';
    document.querySelector('#carros .botoes-tipos-alertas').style.display = 'none';
    document.querySelector('#carros .grafico').style.display = 'block';
    document.querySelector('#carros .btn-voltar').style.display = 'inline-block';

    fetch(`/graficos/graficoPorCarro/${codigo}`)
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.statusText === 'No Content') {
                    document.querySelector('#carros .mensagem').innerHTML = '<p> Nenhum dado encontrado para este carro.</p>';
                } else {
                    resposta.json().then(function (dados) {
                        let soma = 0;
                        let max = dados[0].porcentagem;
                        let min = dados[0].porcentagem;
                        let numColetas = 0;

                        for (let i = 0; i < dados.length; i++) {
                            let valor = parseFloat(dados[i].porcentagem);
                            soma += valor;
                            if (valor > max) max = valor;
                            if (valor < min) min = valor;
                            numColetas++;
                        }

                        let media = (soma / numColetas).toFixed(2);
                        max = max;
                        min = min;

                        document.querySelector('#carros .kpis').innerHTML = `
                            <section class="indicador">
                                <h3> Média Atual </h3>
                                <p class="indice"> ${media}% </p>
                            </section>
                            <section class="indicador">
                                <h3> Máximo </h3>
                                <p class="indice"> ${max}%</p>
                            </section>
                            <section class="indicador">
                                <h3> Mínimo </h3>
                                <p class="indice"> ${min}% </p>
                            </section>
                            <section class="indicador">
                                <h3> Modelo </h3>
                                <p class="indice"> ${dados[0].modelo} </p>
                            </section>
                            `;

                        plotarGraficoCarro(dados, codigo);
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

function plotarGraficoCarro(dados, codigo) {

    let labels = [];
    let valores = [];

    for (let i = dados.length - 1; i >= 0; i--) {
        labels.push(dados[i].instante);
        valores.push(dados[i].porcentagem);
    }

    const config = {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: `${codigo}`,
                data: valores,
                borderColor: 'rgb(235, 54, 54)',
                backgroundColor: 'rgba(235, 54, 54, 0.2)',
                borderWidth: 2
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: `Níveis da altura do óleo do carro com código ${dados[0].codigo}`,
                    font: { size: 28 },
                    padding: { top: 16, bottom: 16 }
                },
                annotation: {
                    annotations: {
                        linhaLimite60: {
                            type: 'box',
                            yMin: 60,
                            yMax: 70,
                            borderColor: 'rgba(11, 92, 4, 0.34)',
                            backgroundColor: 'rgba(33, 253, 13, 0.34)',
                            borderWidth: 2,
                            label: {
                                display: true,
                                content: 'Porcentagem Ideal',
                                position: 'start',
                                color: 'white'
                            }
                        },
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

    intervaloAtualizacao = setTimeout(() => atualizarGraficoCarro(grafico, config, codigo, dados), 6000);
}

function plotarGraficoModelo(dados, dadosSemAlerta, modelo_id) {
    let labels = [];
    let valores = [];
    let valores2 = [];

    for (let i = dados.length - 1; i >= 0; i--) {
        labels.push(dados[i].instante);
        valores.push(dados[i].porcentagem);
        if (dadosSemAlerta.length != 0) {
            valores2.push(dadosSemAlerta[i].porcentagem);
        }
    }

    const config = {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `Nível ${alertaModeloAtual}`,
                data: valores,
                borderColor: 'rgb(235, 54, 54)',
                backgroundColor: 'rgba(235, 54, 54, 0.2)',
                tension: 0.4,
                fill: true
            },
            {
                label: 'Sem alerta',
                data: valores2,
                borderColor: 'rgb(35, 35, 245)',
                backgroundColor: 'rgba(54, 54, 235, 0.2)',
                tension: 0.4,
                borderWidth: 4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: {
                    display: true,
                    text: `Porcentagem média de óleo dos veículos do modelo ${dados[0].nome}`,
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
                        linhaLimite60: {
                            type: 'box',
                            yMin: 60,
                            yMax: 70,
                            borderColor: 'rgba(11, 92, 4, 0.34)',
                            backgroundColor: 'rgba(33, 253, 13, 0.34)',
                            borderWidth: 2,
                            label: {
                                display: true,
                                content: 'Porcentagem Ideal',
                                position: 'start',
                                color: 'white'
                            }
                        },
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

    intervaloAtualizacao = setTimeout(() => atualizarGraficoModelo(grafico, config, modelo_id, dados), 6000);
}

function atualizarGraficoCarro(grafico, config, codigo, dados) {
    fetch(`/graficos/atualizarGraficoPorCarro/${codigo}`)
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.statusText != 'No Content') {
                    resposta.json().then(function (dadosUltimo) {
                        if (dadosUltimo[0].instante != config.data.labels[config.data.labels.length - 1]) {
                            config.data.labels.shift();
                            config.data.labels.push(dadosUltimo[0].instante);

                            config.data.datasets[0].data.shift();
                            config.data.datasets[0].data.push(dadosUltimo[0].porcentagem);

                            grafico.update();

                            dados.shift();
                            dados.push(dadosUltimo[0]);

                            let soma = 0;
                            let max = dados[0].porcentagem;
                            let min = dados[0].porcentagem;
                            let numColetas = 0;

                            for (let i = 0; i < dados.length; i++) {
                                let valor = parseFloat(dados[i].porcentagem);
                                soma += valor;
                                if (valor > max) max = valor;
                                if (valor < min) min = valor;
                                numColetas++;
                            }

                            let media = (soma / numColetas).toFixed(2);
                            max = max;
                            min = min;

                            document.querySelector('#carros .kpis').innerHTML = `
                            <section class="indicador">
                                <h3> Média Atual </h3>
                                <p class="indice"> ${media}% </p>
                            </section>
                            <section class="indicador">
                                <h3> Máximo </h3>
                                <p class="indice"> ${max}%</p>
                            </section>
                            <section class="indicador">
                                <h3> Mínimo </h3>
                                <p class="indice"> ${min}% </p>
                            </section>
                            <section class="indicador">
                                <h3> Modelo </h3>
                                <p class="indice"> ${dados[0].modelo} </p>
                            </section>
                            `;
                        }

                        intervaloAtualizacao = setTimeout(() => atualizarGraficoCarro(grafico, config, codigo, dados), 6000);
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

async function atualizarGraficoModelo(grafico, config, modelo_id, dados) {
    let dadosSemAlerta = [];

    await fetch(`/graficos/atualizarGraficoPorModelo`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            alerta: 4,
            modelo_id: modelo_id
        }),
    })
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.statusText != 'No Content') {
                    resposta.json().then(function (dadosUltimo) {
                        dadosSemAlerta = dadosUltimo;
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

    await fetch(`/graficos/atualizarGraficoPorModelo`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            alerta: alertaModeloAtual,
            modelo_id: modelo_id
        }),
    })
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.statusText != 'No Content') {
                    resposta.json().then(function (dadosUltimo) {
                        if (dadosUltimo[0].instante != config.data.labels[config.data.labels.length - 1]) {
                            config.data.labels.shift();
                            config.data.labels.push(dadosUltimo[0].instante);

                            config.data.datasets[0].data.shift();
                            config.data.datasets[0].data.push(dadosUltimo[0].porcentagem);

                            if (dadosSemAlerta.length != 0) {
                                config.data.datasets[1].data.shift();
                                config.data.datasets[1].data.push(dadosSemAlerta[0].porcentagem);
                            }

                            grafico.update();

                            dados.shift();
                            dados.push(dadosUltimo[0]);

                            let soma = 0;

                            for (let i = 0; i < dados.length; i++) {
                                const valor = Number(dados[i].porcentagem);

                                soma += valor;


                            }

                            if (dadosSemAlerta.length == 0) {
                                dadosSemAlerta[0] = { qtd: 0 };
                            }

                            const ultima = Number(dados[0].porcentagem);
                            const media = (soma / dados.length).toFixed(2);

                            document.querySelector('#modelos .kpis').innerHTML = `
                            <section class="indicador">
                                <h3> Última porcentagem </h3>
                                <p class="indice"> ${ultima}% </p>
                            </section>
                            <section class="indicador">
                                <h3> Média recente </h3>
                                <p class="indice"> ${media}% </p>
                            </section>
                            <section class="indicador">
                                <h3> Quantidade de carros sem alertas </h3>
                                <p class="indice"> ${dadosSemAlerta[0].qtd} </p>
                            </section>
                            <section class="indicador">
                                <h3> Quantidade de carros com nível ${alertaModeloAtual}</h3>
                                <p class="indice">  ${dados[0].qtd} </p>
                            </section>
                        `;

                        }

                        intervaloAtualizacao = setTimeout(() => atualizarGraficoModelo(grafico, config, modelo_id, dados), 6000);
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

    let secGrafico = document.querySelector('#modelos .grafico');
    secGrafico.style.display = 'none';

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
        clearTimeout(intervaloAtualizacao);
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


