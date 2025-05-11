function cadastrarModelo() {
    var nomeVar = ipt_nome.value;
    var anoVar = Number(ipt_ano.value);
    var id_montadoraVar = sessionStorage.ID_MONTADORA;

    // Verificando se há algum campo em branco
    if (
        nomeVar == "" ||
        anoVar == ""
    ) {
        cardErro.style.display = "block";
        mensagem_erro.innerHTML =
            "(Mensagem de erro para todos os campos em branco)";

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
            id_montadoraServer: id_montadoraVar
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                cardErro.style.display = "block";

                mensagem_erro.innerHTML =
                    "Cadastro do modelo realizado com sucesso! Redirecionando para tela de modelos...";

                setTimeout(() => {
                    window.location = "modelos.html";
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
