function cadastrarModelo() {
    var nomeVar = ipt_nome.value;
    var anoVar = Number(ipt_ano.value);
    var idMontadoraVar = sessionStorage.ID_MONTADORA;

    // Verificando se há algum campo em branco
    if (
        nomeVar == "" ||
        anoVar == ""
    ) {
        // cardErro.style.display = "block";
        // mensagem_erro.innerHTML =
        //     "(Mensagem de erro para todos os campos em branco)";

        finalizarAguardar();
        return false;
    }

    fetch("/modelo/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nomeVar,
            anoServer: anoVar,
            idMontadoraServer: idMontadoraVar
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                // cardErro.style.display = "block";

                // mensagem_erro.innerHTML =
                //     "Cadastro do modelo realizado com sucesso! Redirecionando para tela de modelos...";

                setTimeout(() => {
                    window.location = "modelos.html";
                }, "2000");

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

                    let tabela = document.querySelector('table');
                    let frase = `<tr>
                        <th> id </th>
                        <th> Modelo </th>
                        <th> Ano </th>
                        <th> Editar </th>
                        <th> Excluir </th>
                    </tr>`;

                    for (let i = 0; i < resposta.length; i++) {
                        frase += `<tr>`;
                        frase += `<td> ${resposta[i].id} </td>`;
                        frase += `<td> ${resposta[i].modelo} </td>`;
                        frase += `<td> ${resposta[i].ano} </td>`;
                        frase += `<td>
                            <button onclick="editarModelo(${resposta[i].id})" class="btnTabela"> 
                                <img src="../img/icones/editarIcone.png" alt="Icone de edição" class="iconeTabela"> 
                            </button> 
                        </td>`;

                        frase += `<td>
                            <button onclick="excluirModelo(${resposta[i].id})" class="btnTabela"> 
                                <img src="../img/icones/excluirIcone.png" alt="Icone de excluir" class="iconeTabela"> 
                            </button> 
                        </td>`;
                        frase += `</tr>`;
                    }

                    tabela.innerHTML = frase;
                });
            } else {
                throw "Houve um erro ao tentar listar os modelos!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}