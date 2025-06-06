function validarSessao() {
    var id = sessionStorage.ID_MONTADORA;

    var emailFun = sessionStorage.EMAIL_FUNCIONARIO;
    var nomeFun = sessionStorage.NOME_FUNCIONARIO;

    if (emailFun != null && nomeFun != null) {
        let linkFuncionario = document.querySelectorAll('.menu li')[1];
        linkFuncionario.style.display = 'none';
    }
   
    if (id == null) {
        window.location = "login.html";
    } 
}

function limparSessao() {
    sessionStorage.clear();
    window.location = "login.html";
}


function aguardar() {
    var sectionAguardar = document.getElementById("section_aguardar");
    sectionAguardar.style.display = "flex";
}

function finalizarAguardar(texto) {
    var sectionAguardar = document.getElementById("section_aguardar");
    sectionAguardar.style.display = "none";

    var sectionErrosLogin = document.getElementById("section_erros_login");
    if (texto) {
        sectionErrosLogin.style.display = "flex";
        sectionErrosLogin.innerHTML = texto;

        setTimeout(() => {
            sectionErrosLogin.style.display = 'none';
        }, 4000);
    }
}


function pgFuncionario() {
    var email = sessionStorage.EMAIL_FUNCIONARIO;
    var nome = sessionStorage.NOME_FUNCIONARIO;

    if (email != null && nome != null) {
        window.location = "bobia.html";
    }
}