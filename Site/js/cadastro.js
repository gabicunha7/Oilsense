function cadastrar() {
    let emailDigitado = ipt_email.value;
    let nomeDigitado = ipt_nome.value;
    let cnpjDigitado = ipt_cnpj.value;

    let listaEmail = [
        'toyota@gmail.com',
        'hyundai@gmail.com',
        'honda@gmail.com',
        'lucas.silva@toyota.com',
        'mariana.costa@toyota.com',
        'carlos.souza@hyundai.com',
        'fernanda.oliveira@hyundai.com',
        'andre.pereira@honda.com',
        'beatriz.martins@honda.com',
        'joao.lima@honda.com'
    ];

    let emailJaCadastrado = listaEmail.includes(emailDigitado);

    for (let i = 0; i < listaEmail.length; i++) {

        if (!emailJaCadastrado && (emailDigitado.includes("@") && emailDigitado.includes(".")) && nomeDigitado != '' && cnpjDigitado != '' && (cnpjDigitado.length == 14)) {
            window.location.href = 'login.html';
        } 
        
        else if(emailJaCadastrado){
            alert('Este email já está cadastrado em nosso sistema. Tente novamente.');
            break;
        }

        if(emailDigitado == '' || nomeDigitado == '' || cnpjDigitado == ''){
            alert('Por favor, preencha todos os campos!');
            break;
        }

        if((emailDigitado.includes("@") == false) || emailDigitado.includes(".") == false){
            alert('Por favor, digite um Email válido!');
            break;
        }

        if(cnpjDigitado.length > 14 || cnpjDigitado.length < 14){
            alert('CNPJ inválido. Tente novamente');
            break;
        }

    }
    
}