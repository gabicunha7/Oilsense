var placaVar = '';
var volumeVar = '';
var alturaVar = '';
var modeloVar = '';

function cadastrarCarro() {
    aguardar();

    placaVar = ipt_placa.value;
    volumeVar = ipt_volume.value;
    alturaVar = ipt_altura.value;
    modeloVar = sel_modelos.value;
   
    if (
        placaVar == "" ||
        volumeVar == "" ||
        alturaVar == "" ||
        modeloVar == ""
    ) {
        finalizarAguardar("Os campos não podem ser vazios.");
        return false;
    }

    listarSensor();
}

function cadastrarSensor() {
    fetch("/sensor/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        }
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                listarSensor();
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function listarSensor() {
     fetch(`/sensor/listar`)
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                if (resposta.statusText == 'No Content') {
                    cadastrarSensor();
                } else {
                    resposta.json().then(function (resposta) {
                        atualizarSensor(resposta[0].id);
                    });
                }
                    
            } else {
                throw "Houve um erro ao tentar listar os sensores!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function atualizarSensor(idSensor) {
    fetch(`/sensor/atualizar`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
               idSensor: idSensor 
            })
        }).then(function (resposta) {

            if (resposta.ok) {
                cadastrar(idSensor);
            } else if (resposta.status == 404) {
                window.alert("Deu 404!");
            } else {
                throw ("Houve um erro ao tentar realizar o update! Código da resposta: " + resposta.status);
            }
        }).catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function cadastrar(idSensor) {
    fetch("/carro/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            placaServer: placaVar,
            volumeServer: volumeVar,
            alturaServer: alturaVar,
            modeloServer: modeloVar,
            idSensor: idSensor
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                var sectionErrosLogin = document.getElementById("section_erros_login");
                sectionErrosLogin.style.backgroundColor = '#069006';
                
                finalizarAguardar("Cadastro realizado com sucesso! Redirecionando para tela de carros...");

                setTimeout(() => {
                    window.location = "carros.html";
                }, "2000");
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

function listarCarros() {
    let idMontadora = sessionStorage.ID_MONTADORA;

    fetch(`/carro/listar/${idMontadora}`)
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    let tabela = document.querySelector('table');
                    let frase = `<tr>
                        <th> id </th>
                        <th> Placa </th>
                        <th> Volume do Cárter </th>
                        <th> Altura do Cárter </th>
                        <th> Modelo </th>
                        <th> Editar </th>
                        <th> Excluir </th>
                    </tr>`;

                    for (let i = 0; i < resposta.length; i++) {
                        frase += `<tr>`;
                        frase += `<td> ${resposta[i].id} </td>`;
                        frase += `<td> ${resposta[i].placa} </td>`;
                        frase += `<td> ${resposta[i].volumecarter} </td>`;
                        frase += `<td> ${resposta[i].alturacarter} </td>`;
                        frase += `<td> ${resposta[i].modelo} </td>`;
                        frase += `<td>
                            <button onclick="editarCarro(${resposta[i].id})" class="btnTabela"> 
                                <img src="../img/icones/editarIcone.png" alt="Icone de edição" class="iconeTabela"> 
                            </button> 
                        </td>`;

                        frase += `<td>
                            <button onclick="excluirCarro(${resposta[i].id})" class="btnTabela"> 
                                <img src="../img/icones/excluirIcone.png" alt="Icone de excluir" class="iconeTabela"> 
                            </button> 
                        </td>`;
                        frase += `</tr>`;
                    }

                    tabela.innerHTML = frase;
                });
            } else {
                throw "Houve um erro ao tentar listar os carros!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function listarModelos() {
    let idMontadora = sessionStorage.ID_MONTADORA;

    fetch(`/modelo/listar/${idMontadora}`)
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                resposta.json().then(function (resposta) {
                    console.log("Dados recebidos: ", JSON.stringify(resposta));

                    let select = document.querySelector('#sel_modelos');
                    frase = '';

                    for (let i = 0; i < resposta.length; i++) {
                        frase += `<option value="${resposta[i].id}"> ${resposta[i].modelo} </option>`;
                    }

                    select.innerHTML = frase;
                });
            } else {
                throw "Houve um erro ao tentar listar os modelos!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function adicionarCarro() {
    location.href = "add_carro.html";
}