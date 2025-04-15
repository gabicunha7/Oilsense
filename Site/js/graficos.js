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
            label: 'Veiculo X',
            backgroundColor: 'rgb(54, 162, 235)',
            borderColor: 'rgb(54, 162, 235)',
            data: [75, 68, 64, 61, 59, 55]
        }, 
        {
            label: 'Média Veículo X',
            backgroundColor: 'rgb(255, 205, 86)',
            borderColor: 'rgb(255, 205, 86)',
            data: [75, 71, 68, 65, 61, 59]
        }
    ]
};

const dataBarras = {
    labels: labelsMes,
    datasets: [{
            label: 'Veiculo X',
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

const configLinha = {
    type: 'line',
    data: dataLinhas,
    options: {}
}

const configBarras = {
    type: 'bar',
    data: dataBarras,
    options: {}
}

const configPizza = {
    type: 'pie',
    data: dataPizza,
    options: {}
}

Chart.defaults.color = '#ffffff';
Chart.defaults.font.size = 16;

const graficoLinhas = new Chart(
    document.getElementById('graficoLinhas'),
    configLinha
);

const graficoBarras = new Chart(
    document.getElementById('graficoBarras'),
    configBarras
);

const graficoPizza = new Chart(
    document.getElementById('graficoPizza'),
    configPizza
);