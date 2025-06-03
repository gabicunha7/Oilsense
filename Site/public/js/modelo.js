function cadastrarModelo() {
    aguardar();

    var nomeVar = ipt_nome.value;
    var anoVar = Number(ipt_ano.value);
    var idMontadoraVar = sessionStorage.ID_MONTADORA;

    if (
        nomeVar == "" ||
        anoVar == ""
    ) {
        finalizarAguardar("Os campos não podem ser vazios.");
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
            var sectionErrosLogin = document.getElementById("section_erros_login");
            sectionErrosLogin.style.backgroundColor = '#069006';

            finalizarAguardar("Cadastro realizado com sucesso! Redirecionando para tela de modelos...");

            if (resposta.ok) {
                setTimeout(() => {
                    window.location = "modelos.html";
                }, "2000");
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
    let idMontadora = sessionStorage.ID_MONTADORA;

    fetch(`/modelo/listar/${idMontadora}`)
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

function carregarModEditando() {
    let id = sessionStorage.ID_MODELO_EDITANDO;

    if (id == null) {
        window.location = "modelos.html";
    }

    fetch(`/modelo/listarUm/${id}`)
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    ipt_id.value = id;
                    ipt_id.disabled = true;

                    ipt_nome.value = resposta[0].modelo;
                    ipt_ano.value = resposta[0].ano; 
                });
            } else {
                throw "Houve um erro ao tentar listar o modelo!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function atualizarModelo() {
    aguardar();

    var nomeVar = ipt_nome.value;
    var anoVar = Number(ipt_ano.value);
    var idModeloVar = sessionStorage.ID_MODELO_EDITANDO;

    if (
        nomeVar == "" ||
        anoVar == ""
    ) {
        finalizarAguardar("Os campos não podem ser vazios.");
        return false;
    }

    fetch("/modelo/editar", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nomeVar,
            anoServer: anoVar,
            idModeloServer: idModeloVar
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                var sectionErrosLogin = document.getElementById("section_erros_login");
                sectionErrosLogin.style.backgroundColor = '#069006';

                finalizarAguardar("Edição realizada com sucesso! Redirecionando para tela de modelos...");

                setTimeout(() => {
                    window.location = "modelos.html";
                }, "2000");
            } else {
                throw "Houve um erro ao tentar realizar a edição!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            finalizarAguardar();
        });

    return false;
}

function deletarModelo(id) {
    fecharExcluir();
    aguardar();

    fetch("/modelo/excluir", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idModeloServer: id
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                var sectionErrosLogin = document.getElementById("section_erros_login");
                sectionErrosLogin.style.backgroundColor = '#069006';

                finalizarAguardar("Modelo excluído com sucesso! Recarregando a página...");

                setTimeout(() => {
                    window.location = "modelos.html";
                }, "2000");
            } else {
                throw "Houve um erro ao tentar realizar a exclusão!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
            finalizarAguardar();
        });

    return false;
}

function excluirModelo(id) {
    var sectionExcluir = document.querySelector('#section_excluir');
    sectionExcluir.style.display = 'flex';

    var sectionConteudoExcluir = sectionExcluir.querySelector('#section_conteudo_excluir');
    var frase = '<img src="../img/icones/excluirIcone.png" alt="Icone de excluir">';
    frase += '<h1> Você tem certeza que deseja excluir o modelo? </h1>';
    frase += `<p> Esta ação não é reversível. </p>`;
    frase += `<section>
        <button onclick="fecharExcluir()"> Cancelar </button>
        <button onclick="deletarModelo(${id})"> Excluir </button>
    </section>`;

    sectionConteudoExcluir.innerHTML = frase;
}

function fecharExcluir() {
    var sectionExcluir = document.querySelector('#section_excluir');
    sectionExcluir.style.display = 'none';
}

function editarModelo(id_modelo) {
    var sectionErrosLogin = document.getElementById("section_erros_login");
    sectionErrosLogin.style.backgroundColor = '#069006';

    sessionStorage.ID_MODELO_EDITANDO = id_modelo;

    finalizarAguardar("Redirecionando para a tela de edição de modelos...");

    setTimeout(() => {
        window.location = "edi_modelo.html";
    }, "2000");
}

function adicionarModelo() {
    location.href = "add_modelo.html";
}