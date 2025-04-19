function entrar() {
    let emailDigitado = ipt_email.value;
    let senhaDigitada = ipt_senha.value;
    let senhaIncorreta = false;

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

    let listaSenha = [
        'e4484b99e445cc97ac2acafbd965579954989dd0b64bf4c012d8727f230388af',
        '0b9fea9badc53a9775d7f11cace2f8edb29f270d9eda7c8d56b661b1e9a35ccd',
        '463a83bc0ca1971faeffc7938cc80c040a8049ce48c6c251ac7124a715c8278e',
        'senha1',
        'senha2',
        'senha3',
        'senha4',
        'senha5',
        'senha6',
        'senha7'
    ];

    for (let i = 0; i < listaEmail.length; i++) {
        
        if (emailDigitado.includes("@") && (emailDigitado == listaEmail[i] && senhaDigitada == listaSenha[i])) {
            senhaIncorreta = false;
            window.location.href = 'dashboards.html';
            break;
        } 
        
        else if(emailDigitado == '' && senhaDigitada == ''){
            alert('Por favor, preencha todos os campos!');
            break;
        }

        else if(emailDigitado.includes("@") == false){
            alert('Por favor, digite um Email válido!');
            break;
        }

        else{
            senhaIncorreta = true;
        }
    }
    if (senhaIncorreta){
        alert('Email ou senha incorretos.');
        ipt_email.value = ``;
        ipt_senha.value = ``;
    }

    
}