//Pega a lista de aulas e o título, com o nome da turma
const aulasList = pegarElementoId("lista_aulas");
const tituloTurma = pegarElementoId("titulo_turma");


//Pega os botões dos dias da semana e os das turmas
const btnsDias = document.querySelectorAll(".dias");
const btnsTurmas = document.querySelectorAll(".turmas");


//Pega os botões de escolha entre Regular e Técnico
const regularTecnicoBtns = document.querySelectorAll(".regTec");


//Armazena o dia, turma e ênfase escolhidos
var diaEscolhido;
var turmaEscolhida;
var enfaseEscolhida;


//Armazena o id dos botões pressionados
var idDia, idTurma, idEnfase;



//Pega as informações do arquivo ".json"
//E também chama a função que irá montar e exibir o horário
async function apiHorarios() 
{
    const conexao = await fetch("https://gabrielpm99.github.io/projetos/horario/horario.json");
    const conexaoConvertida = await conexao.json();

    exibirHorario(montarHorario(conexaoConvertida[diaEscolhido][turmaEscolhida]));
}


//Adiciona um evento em cada botão dos dias da semana
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


    //Armazena o id do botão
    idDia = btn.id;
}));


//Adiciona um evento em cada botão das turmas
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


        //Armazena o id do botão
        idTurma = btn.id;
    }));


//Adiciona um evento em cada botão de escolha entre Regular ou Técnico
regularTecnicoBtns.forEach((btn) => btn.addEventListener('click', () => 
{
    //Armazena a ênfase escolhida
    escolherEnfase(btn);
    
    //Função que irá analisar qual foi escolhido, ou Regular ou Técnico
    regular_ou_tecnico(btn.innerHTML);

    //Função que adiciona um estilo específico para o botão pressionado
    selecionado(regularTecnicoBtns, btn);


    //Armazena o id do botão
    idEnfase = btn.id;
}));


//Armazena o nome do dia, da turma e da ênfase nas respectivas variáveis
function escolherDia(dia) 
{
    diaEscolhido = dia.innerHTML;
}

function escolherTurma(turma) 
{
    turmaEscolhida = turma.innerHTML;
}

function escolherEnfase(enfase) 
{
    enfaseEscolhida = enfase.innerHTML;
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
        case "Álvaro":
            return '#cdba82';
        case "Kaline":
            return '#cdba82';
    }
}


//Exibe o horário na página
//E altera o nome da turma no título da página
function exibirHorario(horario) 
{ 
    tituloTurma.innerHTML = turmaEscolhida;
    aulasList.innerHTML = horario;

    guardarUltimoHorarioAcessado(idEnfase, idDia, idTurma);
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
    btnSelecionado.classList.add("selecionado");
}


//Essa função irá mostrar as turmas da ênfase escolhida
function regular_ou_tecnico(enfase) 
{
    //Pega a primeira letra da string e coloca ela em minúsculo
    const escolhido = enfase.split('')[0].toLowerCase();

    //Dependendo da ênfase escolhida, esse switch case irá mostrar a ênfase escolhida e esconder a outra
    switch(escolhido) {
        case "r": 
            //Mostra o "Regular"
            pegarElementoId("regular").classList.remove("hidden");

            //Esconde o "Técnico"
            pegarElementoId("tecnico").classList.add("hidden");
        break;
        case "t":
            //Esconde o "Regular"
            pegarElementoId("regular").classList.add("hidden");

            //Mostra o "Técnico"
            pegarElementoId("tecnico").classList.remove("hidden");
        break;
    }
}


//Essa função irá retornar o elemento de acordo com o ID passado por parâmetro
function pegarElementoId(elemento) 
{
    return document.getElementById(elemento);
}


//Essa função guarda no LocalStorage o último horário acessado
function guardarUltimoHorarioAcessado(enfase, dia, turma) 
{
    localStorage.setItem("dia", dia);
    localStorage.setItem("turma", turma);
    localStorage.setItem("enfase", enfase);

    console.log(enfase,dia,turma)
}


//Toda vez que a página for aberta, irá mostrar o último horário que você consultou
window.addEventListener('load', () => 
{
    const btns = [pegarElementoId(localStorage.getItem("dia")),
        pegarElementoId(localStorage.getItem("turma")),
        pegarElementoId(localStorage.getItem("enfase"))
    ];

    btns.forEach((btn) => btn.click());
});
