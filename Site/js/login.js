function entrar() {
    let emailDigitado = ipt_email.value;
    let senhaDigitada = ipt_senha.value;

    let listaEmail = [
        'bmw@gmail.com',
        'volkswagen@gmail.com',
        'ford@gmail.com',
        'pegeout@gmail.com',
        'nissan@gmail.com',
        'mazba@gmail.com',
        'lamborghini@gmail.com'
    ];

    let listaSenha = [
        'Bmw12345',
        'VolksWagen12345',
        'Ford12345',
        'Pegeout12345',
        'Mazba12345',
        'Lamborghini12345'
    ];

    for (let i = 0; i < listaEmail.length; i++) {
        if (emailDigitado == listaEmail[i] && senhaDigitada == listaSenha[i]) {
            window.location.href = 'dashboards.html';
        }
    }
}