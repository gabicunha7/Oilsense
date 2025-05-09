    let carrosCadastrados = [];

    function cadastrarCarro() {
        // aguardar();

        //Recupere o valor da nova input pelo nome do id
        // Agora vá para o método fetch logo abaixo
        var placaVar = ipt_placa.value;
        var volumeVar = ipt_volume.value;
        var alturaVar = ipt_altura.value;
        var modeloVar = ipt_modelo.value;
        var idEmpresaVincular; // não sei como colocar qual empresa é o carro, provavelmente salvo no storage.

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

        // Verificando se o código de ativação é de alguma empresa cadastrada
        for (let i = 0; i < listaEmpresasCadastradas.length; i++) {
            if (listaEmpresasCadastradas[i].codigo_ativacao == codigoVar) {
                idEmpresaVincular = listaEmpresasCadastradas[i].id // alterar///////////////////////////////////////////////////////////
                console.log("Código de ativação válido.");
                break;
            } else {
                cardErro.style.display = "block"; // não sei se vamos manter
                mensagem_erro.innerHTML = "(Mensagem de erro para código inválido)";
                finalizarAguardar();
            }
        }

        // Enviando o valor da nova input
        fetch("/usuarios/cadastrar", {
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
