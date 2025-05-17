function cadastrarFuncionario() {
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
        // cardErro.style.display = "block";
        // mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)";
        finalizarAguardar();
        return false;
    } else if (!emailVar.includes("@") || !emailVar.includes(".")) {
        alert("Por favor, digite um email válido!");
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
            idMontadoraServer: idMontadoraVar
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                // cardErro.style.display = "block";

                // mensagem_erro.innerHTML =
                //     "Cadastro do funcionário realizado com sucesso! Redirecionando para tela de login...";

                setTimeout(() => {
                    window.location = "funcionarios.html";
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

function adicionarFuncionario() {
    location.href = "add_funcionario.html";
}