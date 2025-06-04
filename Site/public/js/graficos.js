function listarPlacas() {
    let idMontadora = sessionStorage.ID_MONTADORA;

    fetch(`/carro/listar/${idMontadora}`)
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    let selecionarPlaca = document.querySelector('#selecao');
                    // selecionarPlaca = ``;
                    let frase = `<select id="lista_carros">`;

                    for (let i = 0; i < resposta.length; i++) {

                        frase += `<option value="${resposta[i].placa}">${resposta[i].placa}</option>`;
                    }
                    frase += `</select>`;

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

function AnoMes() {
    let selecionar = document.querySelector('#selecao');  
    let montadora_id = sessionStorage.ID_MONTADORA;
    let frase = ``;

    
    fetch(`/graficos/anosParceira/${montadora_id}`)
    
        .then(function (resposta) {

            console.log("resposta: ", resposta);            

            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    frase += `<select id="sel_ano">`;

                    for (let i = 0; i <= resposta[0].qtd_anos; i++) {
                        frase += `<option value="${resposta[0].dtcadastro + i}">${resposta[0].dtcadastro + i}</option>`;
                        
                    }
                    frase += `</select>`;
                    frase += `<select id="sel_mes">
                                        <option value="1"> Janeiro</option>
                                        <option value="2"> Feveiro</option>
                                        <option value="3"> Março </option>
                                        <option value="4"> Abril </option>
                                         <option value="5"> Maio </option>
                                        <option value="6"> Junho </option>
                                        <option value="7"> Julho </option>
                                        <option value="8"> Agosto </option>
                                         <option value="9"> Setembro </option>
                                        <option value="10"> Outubro </option>
                                        <option value="11"> Novembro </option>
                                        <option value="12"> Dezembro </option>
                               </select>`;
                    
                     selecionar.innerHTML = frase;
                });
            } else {
                throw "Houve um erro ao tentar listar os anos que é parceira!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });        
}



function alertasGraficoDePizza() {
    let mes = document.querySelector('#sel_mes').value;
    let ano = document.querySelector('#sel_ano').value;
    let montadora_id = sessionStorage.ID_MONTADORA;
    

    fetch(`/graficos/nivelDeAlertaPorMes/${mes}/${ano}/${montadora_id}`)
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
    let placa = document.querySelector('#lista_carros').value;

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

// desenhadoPizza = false;
function plotarGraficoPizza(dados) {
    console.log('Plotando gráfico de barras com os dados:', dados);

    let labels = [];

    const config = {
        type: 'pie',
        data: {
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
        config.data.datasets[0].data.push(dados[i].contagem)
        config.data.labels.push(dados[i].nivel_oleo)

    }

    document.querySelector(".tamanho").style.display = "block"

    Chart.defaults.color = '#ffffff';
    Chart.defaults.font.size = 16;


    grafico.destroy();
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
    for (var i = 0; i < dados.length; i++) {
        config.data.datasets[0].data.push(dados[i].porcentagem)
        config.data.labels.push(dados[i].dia_mes)

    }

    document.querySelector(".tamanho").style.display = "block"

    Chart.defaults.color = '#ffffff';
    Chart.defaults.font.size = 16;


    grafico.destroy();
    grafico = new Chart(
        document.getElementById('dashboard'),
        config
    );

    desenhadoBarra = true;
}


















// const dataLinhas = {
//     labels: labelsDias,
//     datasets: [{
//         label: 'Veiculo Y',
//         backgroundColor: 'rgb(54, 162, 235)',
//         borderColor: 'rgb(54, 162, 235)',
//         data: [75, 68, 64, 61, 59, 55, 54]
//     },
//     {
//         label: 'Média modelo X',
//         backgroundColor: 'rgb(255, 205, 86)',
//         borderColor: 'rgb(255, 205, 86)',
//         data: [75, 71, 68, 65, 61, 59, 56]
//     }
//     ]
// };

// // const dataBarras = {
// //     labels: labelsDias,
// //     datasets: [{
// //         label: 'Veiculo Y',
// //         backgroundColor: 'rgb(255, 205, 86)',
// //         borderColor: 'rgb(255, 205, 86)',
// //         data: [75, 68, 64, 61, 59, 55, 53]
// //     },
// //     ]
// // };

var dataPizza = {
    labels: ['Nível 1','Nível 2','Nível 3','Sem Alerta',],
    datasets: [{
        label: 'Veiculos',
        backgroundColor: [
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
            'rgb(255, 99, 132)',
            'rgb(54, 205, 86)'
        ],
        data: [20, 10, 3, 8]
    },
    ]
};

// const dataArea = {
//     labels: [],
//     datasets: [
//         {
//             label: 'Veículo X',
//             data: [0.6, 0.7, 1.0, 0.4, 0.5],
//             fill: true,
//             backgroundColor: 'rgba(54, 162, 235, 0.5)',
//             borderColor: 'rgb(54, 162, 235)',
//             tension: 0.4
//         },
//         {
//             label: 'Veículo Y',
//             data: [0.4, 0.5, 0.8, 0.3, 0.2],
//             fill: true,
//             backgroundColor: 'rgba(255, 205, 86, 0.5)',
//             borderColor: 'rgb(255, 205, 86)',
//             tension: 0.4
//         },
//         {
//             label: 'Veículo Z',
//             data: [0.7, 0.8, 1.1, 0.5, 0.4],
//             fill: true,
//             backgroundColor: 'rgba(255, 99, 132, 0.5)',
//             borderColor: 'rgb(255, 99, 132)',
//             tension: 0.4
//         }
//     ]
// };



// Chart.defaults.color = '#ffffff';
// Chart.defaults.font.size = 16;

// let config = {
//     type: 'pie',
//     data: dataPizza,
//     options: {
//         plugins: {
//             title: {
//                 display: true,
//                 text: 'Índice de alertas dos veículos em um mês',
//                 font: {
//                     size: 28
//                 },
//                 padding: {
//                     top: 16,
//                     bottom: 16
//                 }
//             }
//         }
//     }
// }

// const dashboard = document.getElementById('dashboard');
const kpis = document.querySelector('.kpis');

// const indicadoresLinha = `<section class="indicador"> 
//                         <h3> Total de veículos modelo X </h3>
//                         <p class="indice"> 60 </p>
//                         </section>
//                         <section class="indicador">
//                             <h3> Classificação em relação ao nível de gasto do veículo Y </h3>
//                             <p class="indice"> #8 </p>
//                         </section>
//                         <section class="indicador">
//                             <h3> Gasto mais alto </h3>
//                             <p class="indice"> 7% - 1° de Maio de 2025 </p>
//                         </section>`;

// const indicadoresBarra = `<section class="indicador"> 
//                         <h3> Total de veículos modelo X </h3>
//                         <p class="indice"> 60 </p>
//                         </section>
//                         <section class="indicador">
//                             <h3> Classificação em relação ao nível de gasto do veículo Y </h3>
//                             <p class="indice"> #8 </p>
//                         </section>
//                         <section class="indicador">
//                             <h3> Gasto mais alto </h3>
//                             <p class="indice"> 7% - 1° de Maio de 2025 </p>
//                         </section>`;
let secaoTamanho = document.querySelector('.tamanho');

// var indicadoresPizza = `<section class="indicador"> 
//                         <h3> Total de alertas </h3>
//                         <p class="indice"> 33 </p>
//                         </section>
//                         <section class="indicador">
//                             <h3> Modelo com mais alertas </h3>
//                             <p class="indice"> Modelo X </p>
//                         </section>
//                         <section class="indicador">
//                             <h3> Alerta mais emitido</h3>
//                             <p class="indice"> Nível 1 </p>
//                         </section>`;

// const indicadoresArea = `<section class="indicador"> 
//                             <h3> Total de consumo de óleo acumulado </h3>
//                             <p class="indice"> 8,9 litros </p>
//                         </section>
//                         <section class="indicador">
//                             <h3> Modelo com maior consumo </h3>
//                             <p class="indice"> Veículo Z </p>
//                         </section>
//                         <section class="indicador">
//                             <h3> Dia de maior consumo </h3>
//                             <p class="indice"> 03/05/2025 </p>
//                         </section>`;


// let grafico = new Chart(
//      dashboard,
//      config
//  );


let temGrafico = false;
function alterarTipoGrafico() {
    let tipoGrafico = document.getElementById('tipo_grafico').value;

    if (tipoGrafico == 'linha') {
        grafico.destroy();

        config = {
            type: 'line',
            data: dataLinhas,
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Porcentagem de altura do óleo dos veículos do modelo X',
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
        }

        secaoTamanho.style.width = "100%";

        kpis.innerHTML = indicadoresLinha;
    } else if (tipoGrafico == 'barra') {
        //grafico.destroy();
        porcentagemCarroPorPlaca();
        temGrafico = true;
        // secaoTamanho.style.width = "100%";
        // kpis.innerHTML = indicadoresBarra;
    } else if (tipoGrafico == 'area') {

        config = {
            type: 'line',
            data: dataArea,
            options: {
                responsive: true,
                plugins: {
                    title: {
                        display: true,
                        text: 'Consumo acumulado de óleo por modelo',
                        font: {
                            size: 28
                        }
                    },
                },
                interaction: {
                    mode: 'index',
                    intersect: false,
                },
                stacked: true,
                scales: {
                    y: {
                        stacked: true
                    },
                    x: {
                        stacked: true
                    }
                }
            }
        }

        secaoTamanho.style.width = "100%";
        kpis.innerHTML = indicadoresArea;

    } else {
        AnoMes();
        alertasGraficoDePizza();
       
        
        // secaoTamanho.style.width = "40%";
        // kpis.innerHTML = indicadoresPizza;

    }

    // grafico.destroy();

    // grafico = new Chart(
    //     dashboard,
    //     config
    // );
}