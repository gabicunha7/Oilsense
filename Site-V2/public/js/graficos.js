const labelsDias = [
    '01/05',
    '02/05',
    '03/05',
    '04/05',
    '05/05',
    '06/05',
    '07/05',
    // 'Julho',
    // 'Agosto',
    // 'Setembro',
    // 'Outubro',
    // 'Novembro',
    // 'Dezembro'
];

const labelsHorario = [
    '07:00',
    '07:30',
    '08:00',
    '08:30',
    '09:00',
    '09:30',
    '10:00',
    // '10:00',
    // '10:30',
    // '11:00',
    // '11:30',
    // '12:00',
    // '12:30',
];

const labelsAlerta = [
    'Nível 1 (Excesso de Óleo)',
    'Nível 2 (Falta de Óleo)',
    'Nível 3 (Crítico de falta de Óleo)',
    'Sem alerta'
];

const dataLinhas = {
    labels: labelsDias,
    datasets: [{
        label: 'Veiculo Y',
        backgroundColor: 'rgb(54, 162, 235)',
        borderColor: 'rgb(54, 162, 235)',
        data: [75, 68, 64, 61, 59, 55, 54]
    },
    {
        label: 'Média modelo X',
        backgroundColor: 'rgb(255, 205, 86)',
        borderColor: 'rgb(255, 205, 86)',
        data: [75, 71, 68, 65, 61, 59, 56]
    }
    ]
};

const dataBarras = {
    labels: labelsDias,
    datasets: [{
        label: 'Veiculo Y',
        backgroundColor: 'rgb(255, 205, 86)',
        borderColor: 'rgb(255, 205, 86)',
        data: [75, 68, 64, 61, 59, 55, 53]
    },
    ]
};

const dataPizza = {
    labels: labelsAlerta,
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

const dataArea = {
    labels: ['01/05/2025', '02/05/2025', '03/05/2025', '04/05/2025', '05/05/2025'],
    datasets: [
        {
            label: 'Veículo X',
            data: [0.6, 0.7, 1.0, 0.4, 0.5],
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderColor: 'rgb(54, 162, 235)',
            tension: 0.4
        },
        {
            label: 'Veículo Y',
            data: [0.4, 0.5, 0.8, 0.3, 0.2],
            fill: true,
            backgroundColor: 'rgba(255, 205, 86, 0.5)',
            borderColor: 'rgb(255, 205, 86)',
            tension: 0.4
        },
        {
            label: 'Veículo Z',
            data: [0.7, 0.8, 1.1, 0.5, 0.4],
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.4
        }
    ]
};



Chart.defaults.color = '#ffffff';
Chart.defaults.font.size = 16;

let config = {
    type: 'pie',
    data: dataPizza,
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
}

const dashboard = document.getElementById('dashboard');
const kpis = document.querySelector('.kpis');
const secaoTamanho = document.querySelector('.tamanho');

const indicadoresLinha = `<section class="indicador"> 
                        <h3> Total de veículos modelo X </h3>
                        <p class="indice"> 60 </p>
                        </section>
                        <section class="indicador">
                            <h3> Classificação em relação ao nível de gasto do veículo Y </h3>
                            <p class="indice"> #8 </p>
                        </section>
                        <section class="indicador">
                            <h3> Gasto mais alto </h3>
                            <p class="indice"> 7% - 1° de Maio de 2025 </p>
                        </section>`;

const indicadoresBarra = `<section class="indicador"> 
                        <h3> Total de veículos modelo X </h3>
                        <p class="indice"> 60 </p>
                        </section>
                        <section class="indicador">
                            <h3> Classificação em relação ao nível de gasto do veículo Y </h3>
                            <p class="indice"> #8 </p>
                        </section>
                        <section class="indicador">
                            <h3> Gasto mais alto </h3>
                            <p class="indice"> 7% - 1° de Maio de 2025 </p>
                        </section>`;

const indicadoresPizza = `<section class="indicador"> 
                        <h3> Total de alertas </h3>
                        <p class="indice"> 33 </p>
                        </section>
                        <section class="indicador">
                            <h3> Modelo com mais alertas </h3>
                            <p class="indice"> Modelo X </p>
                        </section>
                        <section class="indicador">
                            <h3> Alerta mais emitido</h3>
                            <p class="indice"> Nível 1 </p>
                        </section>`;

const indicadoresArea = `<section class="indicador"> 
                            <h3> Total de consumo de óleo acumulado </h3>
                            <p class="indice"> 8,9 litros </p>
                        </section>
                        <section class="indicador">
                            <h3> Modelo com maior consumo </h3>
                            <p class="indice"> Veículo Z </p>
                        </section>
                        <section class="indicador">
                            <h3> Dia de maior consumo </h3>
                            <p class="indice"> 03/05/2025 </p>
                        </section>`;


let grafico = new Chart(
    dashboard,
    config
);

function alterarTipoGrafico() {
    let tipoGrafico = document.getElementById('tipo_grafico').value;

    if (tipoGrafico == 'linha') {
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
        config = {
            type: 'bar',
            data: dataBarras,
            options: {
                plugins: {
                    title: {
                        display: true,
                        text: 'Porcentagem de altura do óleo do veículo Y',
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
        kpis.innerHTML = indicadoresBarra;
    } else if (tipoGrafico == 'linha') {

        config = {
            type: 'pie',
            data: dataPizza,
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
        }


        secaoTamanho.style.width = "40%";
        kpis.innerHTML = indicadoresPizza;
    } else {

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
    }

    grafico.destroy();

    grafico = new Chart(
        dashboard,
        config
    );
}