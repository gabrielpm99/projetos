const db = new XMLHttpRequest();
db.open("GET", "http://localhost:3000");
db.onload = () => 
{
    if (db.status >= 200 && db.status < 300) {
        // Se a solicitação for bem sucedida, manipular os dados recebidos
        var dados = JSON.parse(db.responseText);
        transformarDadosDb(dados);
    } else {
        // Se houver um erro na solicitação, exibir uma mensagem de erro
        console.error('Erro ao obter os dados:', db.statusText);
    }
};

db.onerror = function () {
    // Se houver um erro na conexão, exibir uma mensagem de erro
    console.error('Erro de conexão ao obter os dados.');
};

db.send();

const materias = ["Artes", "Biologia", "Química", "História", "UC2", "UC1", "UC3", "UC4", "UC5", "UC6", "Português", "Matemática", "Filosofia", "Sociologia", "Educação Física", "Geografia", "Eletiva 1", "Espanhol", "Inglês", "Física", "Projeto de Vida"].sort();
const seta_direita = buscarElemento("seta_direita");
const seta_esquerda = buscarElemento("seta_esquerda");
const materiaAtual = buscarElemento("nav_anchor");


const pendentes = buscarElemento("pendentes");
const finalizadas = buscarElemento("finalizadas");
const entreguesContainer = buscarElemento("entregues_container");
var pendentes_finalizadas = "";


const dataAtual = new Date();


const atividadesArray = [];

const atividadesContainer = buscarElemento("atividades_container");



pendentes.addEventListener("click", () => 
{
    adicionarEscolhido(pendentes, entreguesContainer);
    mostrarAtividades(materiaAtual.innerHTML, pendentes_finalizadas);
});
finalizadas.addEventListener("click", () => 
{
    adicionarEscolhido(finalizadas, entreguesContainer);
    mostrarAtividades(materiaAtual.innerHTML, pendentes_finalizadas);
});



seta_direita.addEventListener("click", () => 
{ 
    pos = posicaoMateria(materiaAtual);
    proxPos = pos+1;
    
    if(pos == materias.length-1) {
        proxPos = 0;
    }
    
    proxMateria = materias[proxPos];

    mostrarNaTela(materiaAtual, proxMateria);
    mostrarAtividades(materiaAtual.innerHTML, pendentes_finalizadas);
});


seta_esquerda.addEventListener("click", () => 
{
    pos = posicaoMateria(materiaAtual);
    posAnterior = pos-1;

    if(pos == 0) {
        posAnterior = materias.length-1;
    }

    MateriaAnterior = materias[posAnterior];

    mostrarNaTela(materiaAtual, MateriaAnterior);
    mostrarAtividades(materiaAtual.innerHTML, pendentes_finalizadas);
});



function transformarDadosDb (dados) 
{
    dados.forEach((dado) => 
    {  
        const objAtividade = {
            materia: dado.MATERIA,
            data: dado.DATA_ENTREGA,
            titulo: dado.TITULO,
            informacoes: dado.INFORMACOES
        };
        
        atividadesArray.push(objAtividade);
    });
}

function mostrarAtividades (materia, estado) 
{
    const atividadesFiltradas = atividadesArray.filter((atividade) => 
    {
        return atividade.materia == materia;
    });

    const atividadesFiltradasEstado = atividadesFiltradas.filter((atividade) => 
    {
        const dataAlterada = `2024-${atividade.data.slice(3,5)}-${atividade.data.slice(0,2)}`;
        const dataAtividade = new Date(dataAlterada);
        
        atividade.estado = dataAtividade > dataAtual ? "pendentes" : "finalizadas";

        return atividade.estado == estado;
    });

    criarCards(atividadesFiltradasEstado);
}

function criarCards (arrayAtividades) 
{
    var elementos = "";
    
    arrayAtividades.forEach((atividade) => 
    {
        const div = `
            <div class="atividades_card">
                <div>
                    <p class="card_data">${atividade.data}</p>
                    
                </div>
                <div class="card_informacoes">
                    <h1>${atividade.titulo}</h1>
                    <p>${atividade.informacoes}</p>
                </div>
            </div>
        `;   

        elementos += div;
    });

    atividadesContainer.innerHTML = elementos;
}

function adicionarEscolhido (elemento, pai) 
{
    for(let i = 0; i < pai.children.length; i++) {
        pai.children[i].classList.remove("escolhido");
    }

    elemento.classList.add("escolhido");
    pendentes_finalizadas = elemento.id;
}

function mostrarNaTela (output, value) 
{
    output.innerHTML = value;
}

//Busca o índice da matéria que está sendo mostrada no site.
function posicaoMateria (materia) 
{
    return materias.indexOf(materia.innerHTML);
}

//Busca um elemento no DOM.
function buscarElemento(id) 
{
    return document.getElementById(id);
}


window.addEventListener("load", () => mostrarAtividades(materiaAtual.innerHTML, pendentes_finalizadas));
