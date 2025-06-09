function kpi_graficos() {
    let tipoGrafico = document.getElementById('tipo_grafico').value;

    if (tipoGrafico == 'linha') {
        let placa = document.querySelector('#listar_placas').value;
        fetch(`/kpi/kpiLinha/${placa}`)
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    resposta.json().then(function (resposta) {
                        console.log("Dados recebidos: ", JSON.stringify(resposta));
                        document.getElementById("kpi").innerHTML = '';
                        document.getElementById("kpi").innerHTML += `
                <section class="indicador">
                    <h3> Quantidade de dias que o nível esteve maior que a média: </h3>
                    <p class="indice"> ${resposta[0].meses_acima_media_carro} </p>
                </section>
                <section class="indicador">
                        <h3> Dia com a menor média do modelo :</h3>
                        <p class="indice"> ${resposta[0].mes_menor_media_modelo} </p>
                </section>
                <section class="indicador">
                        <h3> Quantidade de carros deste modelo:  </h3>
                        <p class="indice"> ${resposta[0].qtd_carros_modelo} </p>
                </section>            
            `
                    });
                } else {
                    throw "Houve um erro ao tentar listar a kpi linha!";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });


    } else if (tipoGrafico == 'barra') {
        let placa = document.querySelector('#listar_placas').value;

        fetch(`/kpi/kpiBarra/${placa}`)
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    resposta.json().then(function (resposta) {
                        console.log("Dados recebidos: ", JSON.stringify(resposta));
                        document.getElementById("kpi").innerHTML = '';
                        document.getElementById("kpi").innerHTML += `
                <section class="indicador">
                    <h3> Maior nível registrado: </h3>
                    <p class="indice"> ${resposta[0].altura_nivel}% </p>
                </section>
                <section class="indicador">
                        <h3> Quantidade de vezes que o nível do óleo esteve acima de 50% </h3>
                        <p class="indice"> ${resposta[0].dias_acima_50} </p>
                </section>
                <section class="indicador">
                        <h3> Gasto mais alto </h3>
                        <p class="indice"> ${resposta[0].dtcoleta} </p>
                </section>            
            `
                    });
                } else {
                    throw "Houve um erro ao tentar listar a kpi barra!";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });


    } else if (tipoGrafico == 'area') {

        fetch(`/kpi/kpiArea/${data}`)
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    resposta.json().then(function (resposta) {
                        console.log("Dados recebidos: ", JSON.stringify(resposta));
                        document.getElementById("kpi").innerHTML = '';
                        document.getElementById("kpi").innerHTML += `
                <section class="indicador">
                    <h3> Maior consumo : </h3>
                    <p class="indice"> ${resposta[0].altura_nivel} </p>
                </section>
                <section class="indicador">
                        <h3> Quantidade de vezes que o nível do óleo esteve acima de 50% </h3>
                        <p class="indice"> ${resposta[0].dias_acima_50} </p>
                </section>
                <section class="indicador">
                        <h3> Gasto mais alto </h3>
                        <p class="indice"> ${resposta[0].dtcoleta} </p>
                </section>            
            `
                    });
                } else {
                    throw "Houve um erro ao tentar listar a kpi barra!";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });


    } else {
        let data = document.querySelector('#ipt_data').value;

        fetch(`/kpi/kpiPizza/${data}`)
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    resposta.json().then(function (resposta) {
                        console.log("Dados recebidos: ", JSON.stringify(resposta));
                        document.getElementById("kpi").innerHTML = '';
                        document.getElementById("kpi").innerHTML += `
                <section class="indicador">
                    <h3> Nível mais frequente: </h3>
                    <p class="indice"> ${resposta[0].nivel_mais_frequente} </p>
                </section>
                <section class="indicador">
                        <h3> Total de alertas </h3>
                        <p class="indice"> ${resposta[0].total_alertas} </p>
                </section>            
            `
                    });
                } else {
                    throw "Houve um erro ao tentar listar a kpi barra!";
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
            });


    }
}







