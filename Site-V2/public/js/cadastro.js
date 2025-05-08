// function cadastrar() {
//     let emailDigitado = ipt_email.value;
//     let nomeDigitado = ipt_nome.value;
//     let cnpjDigitado = ipt_cnpj.value;

//     let listaEmail = [
//         'toyota@gmail.com',
//         'hyundai@gmail.com',
//         'honda@gmail.com',
//         'lucas.silva@toyota.com',
//         'mariana.costa@toyota.com',
//         'carlos.souza@hyundai.com',
//         'fernanda.oliveira@hyundai.com',
//         'andre.pereira@honda.com',
//         'beatriz.martins@honda.com',
//         'joao.lima@honda.com'
//     ];

//     let emailJaCadastrado = listaEmail.includes(emailDigitado);

//     for (let i = 0; i < listaEmail.length; i++) {

//         if (!emailJaCadastrado && (emailDigitado.includes("@") && emailDigitado.includes(".")) && nomeDigitado != '' && cnpjDigitado != '' && (cnpjDigitado.length == 14)) {
//             window.location.href = 'login.html';
//         } 
        
//         else if(emailJaCadastrado){
//             alert('Este email já está cadastrado em nosso sistema. Tente novamente.');
//             break;
//         }

//         if(emailDigitado == '' || nomeDigitado == '' || cnpjDigitado == ''){
//             alert('Por favor, preencha todos os campos!');
//             break;
//         }

//         if((emailDigitado.includes("@") == false) || emailDigitado.includes(".") == false){
//             alert('Por favor, digite um Email válido!');
//             break;
//         }

//         if(cnpjDigitado.length > 14 || cnpjDigitado.length < 14){
//             alert('CNPJ inválido. Tente novamente');
//             break;
//         }

//     }
    
// }



// Array para armazenar empresas cadastradas para validação de código de ativação 
let listaMontadorasCadastradas = [];

function cadastrar() {
  // aguardar();

  //Recupere o valor da nova input pelo nome do id
  // Agora vá para o método fetch logo abaixo

 

  var nomeVar = ipt_nome.value;
  var emailVar = ipt_email.value;
  var cnpjVar = ipt_cnpj.value;
  

  // Verificando se há algum campo em branco
  if (
    nomeVar == "" ||
    emailVar == "" ||
    cnpjVar == ""
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
      emailServer: emailVar
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        cardErro.style.display = "block";

        mensagem_erro.innerHTML =
          "Cadastro realizado com sucesso! Redirecionando para tela de Recebimento de Token..";

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
function listar() {
  fetch("/empresas/listar", {
    method: "GET",
  })
    .then(function (resposta) {
      resposta.json().then((empresas) => {
        empresas.forEach((empresa) => {
          listaMontadorasCadastradas.push(empresa);

          console.log("listaMontadorasCadastradas")
          console.log(listaMontadorasCadastradas[0].cnpjVar)
        });
      });
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}

function sumirMensagem() {
  cardErro.style.display = "none";
}
//
