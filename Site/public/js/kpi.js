




function kpi_graficos() {
    let tipoGrafico = document.getElementById('tipo_grafico').value;

    if (tipoGrafico == 'linha') {
        document.getElementById("#kpi").innerHTML = `
                <section class="indicador">
                    <h3> Total de veículos modelo X </h3>
                    <p class="indice"> 60 </p>
                </section>
                <section class="indicador">
                        <h3> Classificação em relação ao nível de gasto do veículo Y </h3>
                        <p class="indice"> #8 </p>
                </section>
                <section class="indicador">
                        <h3> Gasto mais alto </h3>
                        <p class="indice"> 1° de Maio de 2025 </p>
                </section>
            `

    } else if (tipoGrafico == 'barra') {
        let placa = document.querySelector('#lista_carros').value;

        fetch(`/kpi/kpiBarra/${placa}`)
            .then(function (resposta) {
                console.log("resposta: ", resposta);

                if (resposta.ok) {
                    resposta.json().then(function (resposta) {
                        console.log("Dados recebidos: ", JSON.stringify(resposta));

                        document.getElementById("kpi").innerHTML += `
                <section class="indicador">
                    <h3> Maior consumo : </h3>
                    <p class="indice"> ${resposta[0].altura_nivel} </p>
                </section>
                <section class="indicador">
                        <h3> Classificação em relação ao nível de gasto do veículo Y </h3>
                        <p class="indice"> #8 </p>
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
    }
}







