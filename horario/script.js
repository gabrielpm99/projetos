//Pega a lista de aulas e o título, com o nome da turma
const aulasList = document.getElementById("lista_aulas");
const tituloTurma = document.getElementById("titulo_turma");


//Pega os botões dos dias da semana e os das turmas
const btnsDias = document.querySelectorAll(".dias");
const btnsTurmas = document.querySelectorAll(".turmas");


//Armazena o dia e turma escolhidos
var diaEscolhido;
var turmaEscolhida;


//Pega as informações do arquivo ".json"
//E também chama a função que irá montar e exibir o horário
async function apiHorarios() 
{
    const conexao = await fetch("https://gabrielpm99.github.io/projetos/horario/horario.json");
    const conexaoConvertida = await conexao.json();

    exibirHorario(montarHorario(conexaoConvertida[diaEscolhido][turmaEscolhida]));
}


//Adiciona um evento em cada botão
btnsDias.forEach((btn) => btn.addEventListener('click', () => 
{
    //Armazena o dia escolhido
    escolherDia(btn);
    
    //Chama a função que irá buscar o horário no arquivo .json. Porém, só irá funcionar caso a turma já tenha sido escolhida
    if(turmaEscolhida != undefined) {
        apiHorarios();
    }

    //Função que adiciona um estilo específico para o botão pressionado
    selecionado(btnsDias, btn);
}));

btnsTurmas.forEach((btn) => btn.addEventListener('click', () => 
    {
        //Armazena a turma escolhida
        escolherTurma(btn);
        
        //Chama a função que irá buscar o horário no arquivo .json. Porém, só irá funcionar caso o dia já tenha sido escolhido
        if(diaEscolhido != undefined) {
            apiHorarios();
        }

        //Função que adiciona um estilo específico para o botão pressionado
        selecionado(btnsTurmas, btn);
    }));


//Armazena o nome do dia e da turma nas respectivas variáveis
function escolherDia(dia) 
{
    diaEscolhido = dia.innerHTML;
}

function escolherTurma(turma) 
{
    turmaEscolhida = turma.innerHTML;
}


//Monta os elementos da lista
function montarHorario(horario) 
{
    var array = "";

    for(let i = 1; i <= 6; i++) {
        //Monta uma tag "li" em formato de string
        const elemento = `<li style="background-color: ${adicionaCor(horario[i].professor)};" class='aulas'>${horario[i].materia} - ${horario[i].professor}</li>`;

        //Armazena cada string à variável array, formando uma string com várias tags
        array += elemento;
    }

    return array;
}


//Adiciona cor ao elemento, de acordo com o professor
function adicionaCor(elemento) 
{
    switch(elemento) {
        case "Lílian":
            return '#ae64a5';
        case "Ronaldo":
            return '#72b6d8';
        case "José Milanez":
            return '#c38f54';
        case "Ricardo":
            return '#9a98ae';
        case "Lizandre":
            return '#b0b7d2';
        case "Renan":
            return '#b64b5f';
        case "Paulo Sérgio":
            return '#b6466e';
        case "Regina":
            return '#b49a55';
        case "Fábio":
            return '#5d8261';
        case "Paulo":
            return '#98a8c1';
        case "Anderson":
            return '#8e946e';
        case "Tálisson":
            return '#bc9ab0';
        case "Andréia":
            return '#ba9544';
        case "Isabela":
            return '#417cb4';
        case "Robson":
            return '#719aba';
        case "Luciana":
            return '#978957';
        case "Heloisa":
            return '#453b43';
    }
}


//Exibe o horário na página
//E altera o nome da turma no título da página
function exibirHorario(horario) 
{ 
    tituloTurma.innerHTML = turmaEscolhida;
    aulasList.innerHTML = horario;
}


//Adiciona um estilo específico para o elemento selecionado
function selecionado(elementos, btnSelecionado) 
{
    //Remove a classe "selecionado" de todos os botões
    elementos.forEach((elemento) => 
    {
        elemento.classList.remove("selecionado");
    });

    //Adiciona a classe "selecionado" apenas ao botão pressionado
    btnSelecionado.classList.toggle("selecionado");
}