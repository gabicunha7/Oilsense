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

    fetch("/montadora/carros/cadastrar", {
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
            modeloServer: modeloVar,
            anoServer: anoVar
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
