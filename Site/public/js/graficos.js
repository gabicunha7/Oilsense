let grafico = null;

function listarPlacasModelo() {
    let idModelo = document.querySelector('#listar_modelos').value;

    fetch(`/graficos/listarCarrosModelo/${idModelo}`)
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    let selecionarPlaca = document.querySelector('#listar_placas');
                    // selecionarPlaca = ``;
                    let frase = ``;

                    for (let i = 0; i < resposta.length; i++) {

                        frase += `<option value="${resposta[i].placa}">${resposta[i].placa}</option>`;
                    }
                    
                    selecionarPlaca.innerHTML = frase;
                });
            } else {
                throw "Houve um erro ao tentar listar os carros!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function listarModelos() {
    let idMontadora = sessionStorage.ID_MONTADORA;

    fetch(`/modelo/listar/${idMontadora}`)
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    let selecionarModelo = document.querySelector('#selecao');
                    
                    let frase = `<select id="listar_modelos">`;

                    for (let i = 0; i < resposta.length; i++) {

                        frase += `<option value="${resposta[i].id}">${resposta[i].modelo}</option>`;
                    }
                    frase += `</select>`;

                    frase += `<select id="listar_placas"></select>`;

                    selecionarModelo.innerHTML = frase;
                    
                    listarPlacasModelo()

                    let modelo = document.querySelector('#listar_modelos');
                    modelo.addEventListener('change', listarPlacasModelo);
                });
            } else {
                throw "Houve um erro ao tentar listar os carros!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function anoMes() {
    let selecionar = document.querySelector('#selecao');  
    let montadora_id = sessionStorage.ID_MONTADORA;
    let frase = ``;

    let dataAtual = new Date();
    console.log(dataAtual);
    

    dia = dataAtual.getDate();
    if (dia < 10) {
        dia = `0${dia}`;
    }

    mes = dataAtual.getMonth() + 1;
    console.log(mes);
    

    if (mes < 10) {
        mes = `0${mes}`;
    }

    ano = dataAtual.getFullYear();

    dataAtual = `${ano}-${mes}-${dia}`;

    console.log(dataAtual);
    
    
    fetch(`/graficos/anosParceira/${montadora_id}`)
    
        .then(function (resposta) {

            console.log("resposta: ", resposta);            

            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    let dataCadastro = resposta[0].dtcadastro;
                    if (dataCadastro.length > 10) {
                        dataCadastro = dataCadastro.substring(0, 10);
                    }

                    frase += `<input type="date" id="ipt_data" min="${dataCadastro}" max="${dataAtual}" value="${dataAtual}">`;

                    
                     selecionar.innerHTML = frase;
                });
            } else {
                throw "Houve um erro ao tentar listar a data que é parceira!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });        
}



function alertasGraficoDePizza() {
    let data = document.querySelector('#ipt_data').value;
    let montadora_id = sessionStorage.ID_MONTADORA;

    fetch(`/graficos/nivelDeAlertaPorMes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            data: data,
            montadora: montadora_id
        }),
    })
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.statusText == 'No Content') {
                    alert("nenhum dado encontrado!")
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

function porcentagemCarroPorPlaca() {
    let placa = document.querySelector('#listar_placas').value;

    fetch(`/graficos/porcentagemCarroPorPlaca/${placa}`)
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.statusText == 'No Content') {
                    alert("nenhum dado encontrado!")
                } else {
                    resposta.json().then(function (dados) {
                        console.log("graficos:", dados);
                        plotarGraficoPlacaBarras(dados);

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

function plotarGraficoPizza(dados) {
    console.log('Plotando gráfico de barras com os dados:', dados);

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
        }]},
        options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Índice de alertas dos veículos em um mês',
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
        document.getElementById('dashboard'),
        config
    );

    desenhadoPizza = true;
}

desenhadoBarra = false;
function plotarGraficoPlacaBarras(dados) {
    console.log('Plotando gráfico de barras com os dados:', dados);

    let labels = [];

    const config = {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: `Valores`,
                data: [],
                backgroundColor: [
                    'rgb(255, 159, 64)',
                ],
                borderColor: [
                    'rgb(255, 159, 64)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    precision: 0
                }
            }
        }
    };
    for (var i = dados.length - 1; i >= 0; i--) {
        config.data.datasets[0].data.push(dados[i].porcentagem)
        config.data.labels.push(dados[i].dia_mes)

    }

    document.querySelector(".tamanho").style.display = "block"

    Chart.defaults.color = '#ffffff';
    Chart.defaults.font.size = 16;

    if (grafico != null) {
        grafico.destroy();
    }

    grafico = new Chart(
        document.getElementById('dashboard'),
        config
    );

    desenhadoBarra = true;
}


function alterarTipoGrafico() {

    let tipoGrafico = document.getElementById('tipo_grafico').value;
    let btn = document.getElementById('btn_plotar');

    btn.removeEventListener('click', alertasGraficoDePizza);
    btn.removeEventListener('click', porcentagemCarroPorPlaca);
    
    if (grafico != null) {
        grafico.destroy();
    }

    if (tipoGrafico == 'linha') {
        listarModelos();

        // btn.addEventListener('click', );
        

    } else if (tipoGrafico == 'barra') {
        listarModelos();
        btn.addEventListener('click', porcentagemCarroPorPlaca);
        

    } else if (tipoGrafico == 'area') {
        // btn.addEventListener('click', );


    } else {
        anoMes();
        btn.addEventListener('click', alertasGraficoDePizza);

    }
}

let tipo = document.querySelector('#tipo_grafico');
tipo.addEventListener('change', alterarTipoGrafico);

let btn = document.getElementById('btn_plotar');
btn.addEventListener('click', alertasGraficoDePizza);