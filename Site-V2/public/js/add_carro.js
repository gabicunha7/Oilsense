function cadastrarCarro() {
    // aguardar();

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var placaVar = ipt_placa.value;
    var volumeVar = ipt_volume.value;
    var alturaVar = ipt_altura.value;
    var modeloVar = sel_modelos.value;
    // não precisa colocar aqui o usuario, carro está ligado a um modelo já

    // Verificando se há algum campo em branco
    if (
        placaVar == "" ||
        volumeVar == "" ||
        alturaVar == "" ||
        modeloVar == ""
    ) {
        cardErro.style.display = "block";
        mensagem_erro.innerHTML =
            "(Mensagem de erro para todos os campos em branco)";

        finalizarAguardar();
        return false;
    } else {
        setInterval(sumirMensagem, 5000);// talvez tire isso, depende se vai exibir mensagem
    }

    // Enviando o valor da nova input
    fetch("/carro/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            // crie um atributo que recebe o valor recuperado aqui
            // Agora vá para o arquivo routes/usuario.js
            placaServer: placaVar,
            volumeServer: volumeVar,
            alturaServer: alturaVar,
            modeloServer: modeloVar
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                cardErro.style.display = "block";

                mensagem_erro.innerHTML =
                    "Cadastro do carro realizado com sucesso! Redirecionando para tela de carros...";

                setTimeout(() => {
                    window.location = "carros.html";
                }, "2000");

                limparFormulario();
                finalizarAguardar();
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            finalizarAguardar();
        });

    return false;
}

function listarCarros() {
    fetch("/carro/listar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idMontadoraServer: sessionStorage.ID_MONTADORA,
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    let tabela = document.querySelector('table');
                    let frase = `<tr>
                        <th> id </th>
                        <th> Placa </th>
                        <th> Volume do Cárter </th>
                        <th> Altura do Cárter </th>
                        <th> Modelo </th>
                        <th> Editar </th>
                        <th> Excluir </th>
                    </tr>`;

                    for (let i = 0; i < resposta.length; i++) {
                        frase += `<tr>`;
                        frase += `<td> ${resposta[i].id} </td>`;
                        frase += `<td> ${resposta[i].placa} </td>`;
                        frase += `<td> ${resposta[i].volumecarter} </td>`;
                        frase += `<td> ${resposta[i].alturacarter} </td>`;
                        frase += `<td> ${resposta[i].modelo} </td>`;
                        frase += `<td>
                            <button onclick="editarCarro(${resposta[i].id})" class="btnTabela"> 
                                <img src="../img/icones/editarIcone.png" alt="Icone de edição" class="iconeTabela"> 
                            </button> 
                        </td>`;

                        frase += `<td>
                            <button onclick="excluirCarro(${resposta[i].id})" class="btnTabela"> 
                                <img src="../img/icones/excluirIcone.png" alt="Icone de excluir" class="iconeTabela"> 
                            </button> 
                        </td>`;
                        frase += `</tr>`;
                    }

                    tabela.innerHTML = frase;
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
    fetch("/modelo/listar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idMontadoraServer: sessionStorage.ID_MONTADORA,
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    let select = document.querySelector('#sel_modelos');
                    frase = '';

                    for (let i = 0; i < resposta.length; i++) {
                        frase += `<option value="${resposta[i].id}"> ${resposta[i].modelo} </option>`;
                    }

                    select.innerHTML = frase;
                });
            } else {
                throw "Houve um erro ao tentar listar os modelos!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}