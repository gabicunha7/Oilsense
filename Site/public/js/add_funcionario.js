function cadastrarFuncionario() {
    aguardar();

    var nomeVar = ipt_nome.value;
    var sobrenomeVar = ipt_sobrenome.value;
    var emailVar = ipt_email.value;
    var senhaVar = ipt_senha.value;
    var idMontadoraVar = sessionStorage.ID_MONTADORA;
    var idFuncionarioVar = sessionStorage.ID_FUNCIONARIO;

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
            idFuncionariServer: idFuncionarioVar
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



function adicionarFuncionario() {
    location.href = "add_funcionario.html";
}