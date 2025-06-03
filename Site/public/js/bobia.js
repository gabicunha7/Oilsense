function enviarPergunta() {
    aguardar();
    const input = document.getElementById('inputPergunta').value.trim();
    const respostaDiv = document.getElementById('respostaIA');

    if (input === '') {
        alert('Por favor, digite uma pergunta.');
        return;
    }

    fetch("/perguntar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            pergunta: input 
        })
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    finalizarAguardar();
                    let resultado = resposta.resultado;
    
                    respostaDiv.style.display = 'block';
                    respostaDiv.innerText = resultado;
    
                    document.getElementById('inputPergunta').value = '';
                });
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}