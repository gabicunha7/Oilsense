



// Array para armazenar empresas cadastradas para validação de código de ativação 
let listaMontadorasCadastradas = [];

function cadastrar() {

  //Recupere o valor da nova input pelo nome do id
  // Agora vá para o método fetch logo abaixo

  var nomeVar = ipt_nome.value;
  var emailVar = ipt_email.value;
  var cnpjVar = ipt_cnpj.value;
  var senhaVar = ipt_senha.value;

  // Verificando se há algum campo em branco
  if (
    nomeVar == "" ||
    cnpjVar == "" ||
    emailVar == "" ||
    senhaVar == ""

  ) {
    cardErro.style.display = "block";
    mensagem_erro.innerHTML =
      "(Mensagem de erro para todos os campos em branco)";

    finalizarAguardar();
    return false;
  } else {
    setInterval(sumirMensagem, 5000);
  }

  // Verificando se o código de ativação é de alguma empresa cadastrada
  for (let i = 0; i < listaMontadorasCadastradas.length; i++) {
    if (!listaMontadorasCadastradas.includes(cnpjVar)) {
      console.log("CNPJ válido.");
      break;
    } else {
      cardErro.style.display = "block";
      mensagem_erro.innerHTML = "(Mensagem de erro para CNPJ inválido)";
      finalizarAguardar();
    }
  }

  // Verificando se o nome possui mais de uma letra:
  if (nomeVar.length <= 1) {
    cardErro.style.display = "block";
    mensagem_erro.innerHTML =
      "(Mensagem de erro para nome inválido.)";
    finalizarAguardar();
    return false;
  } else {
    setInterval(sumirMensagem, 5000);
  }

  // Verificando se o CNPJ é válido:
  if (cnpjVar.length != 14) {
    cardErro.style.display = "block";
    mensagem_erro.innerHTML =
      "(Mensagem de erro para CNPJ inválido.)";
    finalizarAguardar();
    return false;
  } else {
    setInterval(sumirMensagem, 5000);
  }

  // Verificando se o email é válido:
  if (!emailVar.includes('@') || !emailVar.includes('.')) {
    cardErro.style.display = "block";
    mensagem_erro.innerHTML =
      "(Mensagem de erro para email inválido.)";
    finalizarAguardar();
    return false;
  } else {
    setInterval(sumirMensagem, 5000);
  }

  // Enviando o valor da nova input
  fetch("/montadora/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // crie um atributo que recebe o valor recuperado aqui
      // Agora vá para o arquivo routes/usuario.js
      nomeServer: nomeVar,
      cnpjServer: cnpjVar,
      emailServer: emailVar,
      senhaServer: senhaVar
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        cardErro.style.display = "block";

        mensagem_erro.innerHTML =
          "Cadastro realizado com sucesso! Redirecionando para tela de login...";

        setTimeout(() => {
          window.location = "login.html";
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

// Listando empresas cadastradas 
// function listar() {
//   fetch("/empresas/listar", {
//     method: "GET",
//   })
//     .then(function (resposta) {
//       resposta.json().then((empresas) => {
//         empresas.forEach((empresa) => {
//           listaMontadorasCadastradas.push(empresa);

//           console.log("listaMontadorasCadastradas")
//           console.log(listaMontadorasCadastradas[0].cnpjVar)
//         });
//       });
//     })
//     .catch(function (resposta) {
//       console.log(`#ERRO: ${resposta}`);
//     });
// }

function sumirMensagem() {
  cardErro.style.display = "none";
}
//
