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
    
                    let frase = ``;

                    for (let i = 0; i < resposta.length; i++) {

                        frase += `<option value="${resposta[i].placa}">${resposta[i].placa}</option>`;
                    }

                    selecionarPlaca.innerHTML = frase;

                    let tipoGrafico = document.getElementById('tipo_grafico').value;

                    if (tipoGrafico == 'barra') {
                        porcentagemCarroPorPlaca();
                    } else {
                        porcentagemGraficoLinha();
                    }

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

                    let tipoGrafico = document.getElementById('tipo_grafico').value;

                    if (tipoGrafico == 'area') {
                        modificarListarModelo();
                    } else {
                        listarPlacasModelo()

                        let modelo = document.querySelector('#listar_modelos');
                        modelo.addEventListener('change', listarPlacasModelo);
                        let placas = document.querySelector('#listar_placas');

                        if (tipoGrafico == 'barra') {
                            modelo.addEventListener('change', porcentagemCarroPorPlaca);
                            placas.addEventListener('change', porcentagemCarroPorPlaca);
                        } else {
                            modelo.addEventListener('change', porcentagemGraficoLinha);
                            placas.addEventListener('change', porcentagemGraficoLinha);
                        }
                    }
                });
            } else {
                throw "Houve um erro ao tentar listar os carros!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function modificarListarModelo() {
    let modelo = document.querySelector('#listar_modelos');
    let modelo2 = document.querySelector('#listar_placas');

    modelo2.innerHTML = modelo.innerHTML;
    modelo.id = 'listar_modelo1';
    modelo2.id = 'listar_modelo2';

    modelo.addEventListener('change', porcentagemModeloPorArea);
    modelo2.addEventListener('change', porcentagemModeloPorArea);
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

                    alertasGraficoDePizza();

                    let data = document.querySelector('#ipt_data');
                    data.addEventListener('input', () => {
                        let ano = data.value.substring(0, 4);
                        if (ano >= dataCadastro) {
                            alertasGraficoDePizza();
                        }
                    });

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
                        kpi_graficos();
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
                        kpi_graficos();
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

function porcentagemGraficoLinha() {
    let placa = document.querySelector('#listar_placas').value;
    let modelo = document.querySelector('#listar_modelos').value;

    let dadosCarro = null;

    fetch(`/graficos/porcentagemCarroPorPlaca/${placa}`)
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.statusText == 'No Content') {
                    alert("nenhum dado encontrado!")
                } else {
                    resposta.json().then(function (dados) {
                        console.log("graficos:", dados);
                        dadosCarro = dados;

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

    fetch(`/graficos/porcentagemMediaModelo/${modelo}`)
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.statusText == 'No Content') {
                    alert("nenhum dado encontrado!")
                } else {
                    resposta.json().then(function (dados) {
                        console.log("graficos:", dados);

                        if (dadosCarro != null) {
                            kpi_graficos();
                            plotarGraficoLinha(dadosCarro, dados);
                        } else {
                            alert('Continua nulo')
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

function porcentagemModeloPorArea() {
    let modelo1 = document.querySelector('#listar_modelo1').value;
    let modelo2 = document.querySelector('#listar_modelo2').value;

    let dadosModelo1 = null;

    fetch(`/graficos/porcentagemModeloPorArea/${modelo1}`)
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.statusText == 'No Content') {
                    alert("nenhum dado encontrado!")
                } else {
                    resposta.json().then(function (dados) {
                        console.log("graficos:", dados);
                        dadosModelo1 = dados;

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

    fetch(`/graficos/porcentagemModeloPorArea/${modelo2}`)
        .then(function (resposta) {
            if (resposta.ok) {
                if (resposta.statusText == 'No Content') {
                    alert("nenhum dado encontrado!")
                } else {
                    resposta.json().then(function (dados) {
                        console.log("graficos:", dados);

                        if (dadosModelo1 != null) {
                            plotarGraficoLinha(dadosModelo1, dados);
                        } else {
                            alert('Continua nulo')
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
        document.getElementById('dashboard'),
        config
    );

}

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
                title: {
                    display: true,
                    text: 'Porcentagem de óleo no cárter por dia',
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
}

function plotarGraficoLinha(dadosCarro, dados) {
    let select = document.querySelector('#listar_modelos');
    let indice = select.selectedIndex;
    let modelo = select.options[indice].text;


    console.log('Plotando gráfico de linha com os dados:', dados);

    let labels = [];

    const config = {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: `Veiculo`,
                data: [],
                backgroundColor: 'rgb(255, 159, 64)',
                borderColor: 'rgb(255, 159, 64)'
            },
            {
                label: `${modelo}`,
                data: [],
                backgroundColor: 'rgb(64, 147, 255)',
                borderColor: 'rgb(64, 147, 255)'
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Porcentagem de óleo no cárter de um carro e da média do modelo em dia',
                    font: {
                        size: 20
                    },
                    padding: {
                        top: 16,
                        bottom: 16
                    }
                }
            }
        }
    };
    for (var i = dados.length - 1; i >= 0; i--) {
        config.data.datasets[0].data.push(dadosCarro[i].porcentagem)
        config.data.datasets[1].data.push(dados[i].porcentagem)
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
    document.getElementById("kpi").innerHTML = '';

    if (grafico != null) {
        grafico.destroy();
    }

    if (tipoGrafico == 'linha') {
        listarModelos();
    } else if (tipoGrafico == 'barra') {
        listarModelos();
    } else if (tipoGrafico == 'area') {
        listarModelos();
    } else {
        anoMes();
    }
}

let tipo = document.querySelector('#tipo_grafico');
tipo.addEventListener('change', alterarTipoGrafico);