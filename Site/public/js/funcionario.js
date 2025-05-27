function cadastrarFuncionario() {
    aguardar();

    var nomeVar = ipt_nome.value;
    var sobrenomeVar = ipt_sobrenome.value;
    var emailVar = ipt_email.value;
    var senhaVar = ipt_senha.value;
    var idMontadoraVar = sessionStorage.ID_MONTADORA;

    if (
        nomeVar == "" ||
        sobrenomeVar == "" ||
        emailVar == "" ||
        senhaVar == ""
    ) {
        finalizarAguardar("Os campos não podem ser vazios.");
        return false;
    } else if (!emailVar.includes("@") || !emailVar.includes(".")) {
        finalizarAguardar("O e-mail é inválido.");
        return false;
    }

    fetch("/funcionario/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nomeVar,
            sobrenomeServer: sobrenomeVar,
            emailServer: emailVar,
            senhaServer: senhaVar,
            idMontadoraServer: idMontadoraVar,
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                var sectionErrosLogin = document.getElementById("section_erros_login");
                sectionErrosLogin.style.backgroundColor = '#069006';

                finalizarAguardar("Cadastro realizado com sucesso! Redirecionando para tela de funcionários...");

                setTimeout(() => {
                    window.location = "funcionarios.html";
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


function listarFuncionarios() {
    let idMontadora = sessionStorage.ID_MONTADORA;

    fetch(`/funcionario/listar/${idMontadora}`)
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    let tabela = document.querySelector('table');
                    let frase = `<tr>
                        <th> id </th>
                        <th> Nome </th>
                        <th> Sobrenome </th>
                        <th> Email </th>
                        <th> Editar </th>
                        <th> Excluir </th>
                    </tr>`;

                    for (let i = 0; i < resposta.length; i++) {
                        frase += `<tr>`;
                        frase += `<td> ${resposta[i].id} </td>`;
                        frase += `<td> ${resposta[i].nome} </td>`;
                        frase += `<td> ${resposta[i].sobrenome} </td>`;
                        frase += `<td> ${resposta[i].email} </td>`;
                        frase += `<td>
                            <button onclick="editarFuncionario(${resposta[i].id})" class="btnTabela"> 
                                <img src="../img/icones/editarIcone.png" alt="Icone de edição" class="iconeTabela"> 
                            </button> 
                        </td>`;

                        frase += `<td>
                            <button onclick="excluirFuncionario(${resposta[i].id})" class="btnTabela"> 
                                <img src="../img/icones/excluirIcone.png" alt="Icone de excluir" class="iconeTabela"> 
                            </button> 
                        </td>`;
                        frase += `</tr>`;
                    }

                    tabela.innerHTML = frase;
                });
            } else {
                throw "Houve um erro ao tentar listar os funcionários!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function carregarFunEditando() {
    let id = sessionStorage.ID_FUNCIONARIO_EDITANDO;

    if (id == null) {
        window.location = "funcionarios.html";
    }

    fetch(`/funcionario/listarUm/${id}`)
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    ipt_id.value = id;
                    ipt_id.disabled = true;

                    ipt_nome.value = resposta[0].nome;
                    ipt_sobrenome.value = resposta[0].sobrenome;
                    ipt_email.value = resposta[0].email;
                    ipt_senha.value = resposta[0].senha; 
                });
            } else {
                throw "Houve um erro ao tentar listar o funcionário!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function atualizarFuncionario() {
    aguardar();

    var nomeVar = ipt_nome.value;
    var sobrenomeVar = ipt_sobrenome.value;
    var emailVar = ipt_email.value;
    var senhaVar = ipt_senha.value;
    var idMontadoraVar = sessionStorage.ID_MONTADORA;
    var idFuncionarioVar = sessionStorage.ID_FUNCIONARIO_EDITANDO;

    if (
        nomeVar == "" ||
        sobrenomeVar == "" ||
        emailVar == "" ||
        senhaVar == ""
    ) {
        finalizarAguardar("Os campos não podem ser vazios.");
        return false;
    } else if (!emailVar.includes("@") || !emailVar.includes(".")) {
        finalizarAguardar("O e-mail é inválido.");
        return false;
    }

    fetch("/funcionario/editar", {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nomeVar,
            sobrenomeServer: sobrenomeVar,
            emailServer: emailVar,
            senhaServer: senhaVar,
            idMontadoraServer: idMontadoraVar,
            idFuncionarioServer: idFuncionarioVar
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                var sectionErrosLogin = document.getElementById("section_erros_login");
                sectionErrosLogin.style.backgroundColor = '#069006';

                finalizarAguardar("Edição realizada com sucesso! Redirecionando para tela de funcionários...");

                setTimeout(() => {
                    window.location = "funcionarios.html";
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

function deletarFuncionario(id) {
    fecharExcluir();
    aguardar();
    var idMontadoraVar = sessionStorage.ID_MONTADORA;

    fetch("/funcionario/excluir", {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idMontadoraServer: idMontadoraVar,
            idFuncionarioServer: id
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                var sectionErrosLogin = document.getElementById("section_erros_login");
                sectionErrosLogin.style.backgroundColor = '#069006';

                finalizarAguardar("Funcionário excluído com sucesso! Recarregando a página...");

                setTimeout(() => {
                    window.location = "funcionarios.html";
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

function excluirFuncionario(id) {
    var sectionExcluir = document.querySelector('#section_excluir');
    sectionExcluir.style.display = 'flex';

    var sectionConteudoExcluir = sectionExcluir.querySelector('#section_conteudo_excluir');
    var frase = '<img src="../img/icones/excluirIcone.png" alt="Icone de excluir">';
    frase += '<h1> Você tem certeza que deseja excluir o funcionário? </h1>';
    frase += `<p> Esta ação não é reversível. </p>`;
    frase += `<section>
        <button onclick="fecharExcluir()"> Cancelar </button>
        <button onclick="deletarFuncionario(${id})"> Excluir </button>
    </section>`;

    sectionConteudoExcluir.innerHTML = frase;
}

function fecharExcluir() {
    var sectionExcluir = document.querySelector('#section_excluir');
    sectionExcluir.style.display = 'none';
}

function adicionarFuncionario() {
    location.href = "add_funcionario.html";
}

function editarFuncionario(id_funcionario) {
    var sectionErrosLogin = document.getElementById("section_erros_login");
    sectionErrosLogin.style.backgroundColor = '#069006';

    sessionStorage.ID_FUNCIONARIO_EDITANDO = id_funcionario;

    finalizarAguardar("Redirecionando para a tela de edição de funcionários...");

    setTimeout(() => {
        window.location = "edi_funcionario.html";
    }, "2000");
}