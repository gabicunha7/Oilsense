const labelsMes = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
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
    // '10:00',
    // '10:30',
    // '11:00',
    // '11:30',
    // '12:00',
    // '12:30',
];

const labelsAlerta = [
    'Nível 1',
    'Nível 2',
    'Nível 3',
    'Sem alerta'
];

const dataLinhas = {
    labels: labelsMes,
    datasets: [{
            label: 'Veiculo Y',
            backgroundColor: 'rgb(54, 162, 235)',
            borderColor: 'rgb(54, 162, 235)',
            data: [75, 68, 64, 61, 59, 55]
        }, 
        {
            label: 'Média modelo X',
            backgroundColor: 'rgb(255, 205, 86)',
            borderColor: 'rgb(255, 205, 86)',
            data: [75, 71, 68, 65, 61, 59]
        }
    ]
};

const dataBarras = {
    labels: labelsMes,
    datasets: [{
            label: 'Veiculo Y',
            backgroundColor: 'rgb(255, 205, 86)',
            borderColor: 'rgb(255, 205, 86)',
            data: [75, 68, 64, 61, 59, 55]
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

Chart.defaults.color = '#ffffff';
Chart.defaults.font.size = 16;

let config = {
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

const dashboard = document.getElementById('dashboard');
const kpis = document.querySelector('.kpis');

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
                            <p class="indice"> 7% - Janeiro de 2025 </p>
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
                            <p class="indice"> 7% - Janeiro de 2025 </p>
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
                            <h3> Mês com mais alertas </h3>
                            <p class="indice"> Janeiro de 2025 </p>
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

        kpis.innerHTML = indicadoresBarra;
    } else {
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

        kpis.innerHTML = indicadoresPizza;
    }

    grafico.destroy();

    grafico = new Chart(
        dashboard,
        config
    );
}