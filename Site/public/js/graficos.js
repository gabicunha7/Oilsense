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
    document.getElementById('btn-voltar').style.display = 'none';  

    document.querySelector('#carros table').style.display = 'table';
    document.querySelector('#carros .botoes-tipos-alertas').style.display = 'flex';
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



function graficoModelo(){
    let modelo_id = ''

    fetch(`/graficos/graficoPorModelo/${modelo_id}`)
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.statusText == 'No Content') {
                    alertas.innerHTML = '<p> Nenhum dado encontrado </p>';
                } else {
                    resposta.json().then(function (dados) {
                        console.log("graficos:", dados);
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

    return false;
}



function exibirGraficoCarroEspecifico(codigo) {
    if (grafico) {
        grafico.destroy();
        grafico = null;
    }
    
    document.querySelector('#carros table').style.display = 'none';
    document.querySelector('#carros .botoes-tipos-alertas').style.display = 'none';
    document.querySelector('#carros .grafico').style.display = 'block';
    document.getElementById('btn-voltar').style.display = 'inline-block';


    function atualizarGrafico() {
        fetch(`/graficos/graficoPorCarro/${codigo}`)
            .then(function (resposta) {
                if (resposta.ok) {
                    if (resposta.statusText === 'No Content') {
                        document.querySelector('#carros .grafico').innerHTML = '<p>Nenhum dado encontrado para este carro.</p>';
                    } else {
                        resposta.json().then(function (dados) {
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

    intervaloAtualizacao = setInterval(atualizarGrafico, 5000);
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

    document.querySelector("#carros .tabela-painel").style.display = "none";
    document.querySelector("#carros .botoes-tipos-alertas").style.display = "none";
    document.querySelector("#carros .grafico").style.display = "block";
    document.getElementById("btn-voltar").style.display = "inline-block";

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

    const config = {
        type: 'line',
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
    document.querySelector("tabela-painel").style.display = "none" 

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
                <td> <button onclick="exibirGraficoCarroEspecifico('${dados[i].cod}')"> Ver gráfico </button>
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
                <td> </td>
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
        modelosComAlerta(alertaModeloAtual);
        indice = 1;
    } else {
        modelos.style.display = 'none';
        alertas.style.display = 'none';
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