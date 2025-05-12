function entrar() {
        aguardar();

        var emailVar = ipt_email.value;
        var senhaVar = ipt_senha.value;

        var tipoUsuario = sel_user.value;

        if (emailVar == "" || senhaVar == "") {
            cardErro.style.display = "block"
            mensagem_erro.innerHTML = "(Mensagem de erro para todos os campos em branco)";
            finalizarAguardar();
            return false;
        }

        console.log("FORM LOGIN: ", emailVar);
        console.log("FORM SENHA: ", senhaVar);

        if (tipoUsuario == 'montadora') {

            fetch("/montadora/autenticar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    emailServer: emailVar,
                    senhaServer: senhaVar
                })
            }).then(function (resposta) {
                console.log("ESTOU NO THEN DO entrar()!")

                if (resposta.ok) {
                    console.log(resposta);

                    resposta.json().then(json => {
                        console.log(json);
                        console.log(JSON.stringify(json));
                        sessionStorage.EMAIL_USUARIO = json.email;
                        sessionStorage.NOME_USUARIO = json.nome;
                        sessionStorage.ID_USUARIO = json.id;
                    });

                    setTimeout(function () {
                        window.location = "dashboards.html";
                    }, 1000);

                } else {

                    console.log("Houve um erro ao tentar realizar o login!");

                    resposta.text().then(texto => {
                        console.error(texto);
                        finalizarAguardar(texto);
                    });
                }

            }).catch(function (erro) {
                console.log(erro);
            })

            return false;
        } else {
            // colocar o login para os funcionario
        }
    }