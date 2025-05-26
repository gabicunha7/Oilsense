let listaMontadorasCadastradas = [];

function cadastrar() {
  aguardar();

  var nomeVar = ipt_nome.value;
  var emailVar = ipt_email.value;
  var cnpjVar = ipt_cnpj.value;
  var senhaVar = ipt_senha.value;

  if (
    nomeVar == "" ||
    cnpjVar == "" ||
    emailVar == "" ||
    senhaVar == ""

  ) {
    finalizarAguardar("Os campos não podem ser vazios.");
    return false;
  }

  for (let i = 0; i < listaMontadorasCadastradas.length; i++) {
    if (!listaMontadorasCadastradas.includes(cnpjVar)) {
      break;
    } else {
      finalizarAguardar("O CNPJ inválido.");
    }
  }

  if (nomeVar.length <= 1) {
    finalizarAguardar("O nome deve conter mais de 1 caractere.");
    return false;
  }

  if (cnpjVar.length != 14) {
    finalizarAguardar("O CNPJ é inválido.");
    return false;
  } 

  if (!emailVar.includes('@') || !emailVar.includes('.')) {
    finalizarAguardar("O e-mail é inválido.");
    return false;
  }

  fetch("/montadora/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nomeServer: nomeVar,
      cnpjServer: cnpjVar,
      emailServer: emailVar,
      senhaServer: senhaVar
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        var sectionErrosLogin = document.getElementById("section_erros_login");
        sectionErrosLogin.style.backgroundColor = '#069006';
      
        finalizarAguardar("Cadastro realizado com sucesso! Redirecionando para tela de login...");

        setTimeout(() => {
          window.location = "login.html";
        }, "2000");
      } else {
        throw "Houve um erro ao tentar realizar o cadastro!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
      finalizarAguardar(resposta);
    });
}

function sumirMensagem() {
  cardErro.style.display = "none";
}
