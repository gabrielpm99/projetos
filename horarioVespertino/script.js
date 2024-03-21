//Pega a lista de aulas e o título, com o nome da turma
const aulasList = pegarElementoId("lista_aulas");
const tituloTurma = pegarElementoId("titulo_turma");


//Pega a lista onde estão as turmas
const turmasLista = pegarElementoId("turmas");


//Pega os botões dos dias da semana e os das turmas
const btnsDias = document.querySelectorAll(".dias");
const btnsTurmas = document.querySelectorAll(".turmas");


//Armazena o dia, turma e ênfase escolhidos
var diaEscolhido;
var turmaEscolhida;


//Armazena o id dos botões pressionados
var idDia, idTurma;



//Pega as informações do arquivo ".json"
//E também chama a função que irá montar e exibir o horário
async function apiHorarios() 
{
    const conexao = await fetch("https://gabrielpm99.github.io/projetos/horarioVespertino/horario.json");
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


    //Função que retira a classe "hidden" das turmas
    mostrarTurmas();


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

    for(let i = 1; i <= 5; i++) {
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
        case "Erika":
            return '#ff99ff';
        case "Sueli":
            return '#66ffff';
        case "Bruno":
            return '#00cc66';
        case "Heloisa":
            return '#ffccff';
        case "Bendita":
            return '#7030a0';
        case "Silvana":
            return '#d9d2e9';
        case "Antônio":
            return '#ccffcc';
        case "Lúcia":
            return '#ff9900';
        case "João Carlos":
            return '#ffff99';
        case "Teresa":
            return '#ffe599';
        case "Kaline":
            return '#a64d79';
        case "Luciana":
            return '#b2b2b2';
        case "Renan":
            return '#a71195';
        case "Carlos Alex":
            return '#ffcc66';
        case "Robson":
            return '#6fa8dc';
        case "Douglas":
            return '#3d85c6';
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

    guardarUltimoHorarioAcessado(idDia, idTurma);
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


//Essa função irá retornar o elemento de acordo com o ID passado por parâmetro
function pegarElementoId(elemento) 
{
    return document.getElementById(elemento);
}


//Essa função guarda no LocalStorage o último horário acessado
function guardarUltimoHorarioAcessado(dia, turma) 
{
    localStorage.setItem("dia", dia);
    localStorage.setItem("turma", turma);
}


//Essa função retira a classe "hidden" das turmas quando o botão dos dias for clicado
function mostrarTurmas () 
{
    turmasLista.classList.remove("hidden");
}


//Toda vez que a página for aberta, irá mostrar o último horário que você consultou
window.addEventListener('load', () => 
{
    const btns = [pegarElementoId(localStorage.getItem("dia")),
        pegarElementoId(localStorage.getItem("turma")),
    ];

    btns.forEach((btn) => btn.click());
});
