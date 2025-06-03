function enviarPergunta() {
    aguardar();

    const perguntaIpt = document.getElementById('inputPergunta').value.trim();
    const respostaDiv = document.getElementById('respostaIA');

    if (perguntaIpt === '') {
        alert('Por favor, digite uma pergunta.');
        return;
    }

    fetch("/perguntar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            pergunta: perguntaIpt 
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
                throw "Houve um erro ao tentar enviar a pergunta!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}