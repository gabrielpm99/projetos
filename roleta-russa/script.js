const lista_participantes = document.querySelector(".lista-participantes");

const campo_participante = document.querySelector(".campo-add");
const btn_add = document.querySelector(".button-add");

const btn_play = document.querySelector(".btn-play");

const botoes = document.querySelector(".botoes");


function criar_participante () 
{
    if(campo_participante.value != "" && lista_participantes.children.length <= 14) {
        const novo_participante = document.createElement("li");
        novo_participante.classList.add("participante");
        novo_participante.innerHTML = `${campo_participante.value} `;

        botao_deletar = document.createElement("button");
        botao_deletar.classList.add("delete");
        botao_deletar.innerHTML = "X";
        
        botao_deletar.addEventListener('click', (event) => 
        {
            event.target.parentNode.remove();
        })

        novo_participante.appendChild(botao_deletar)

        lista_participantes.appendChild(novo_participante);

        campo_participante.value = "";
    }
}


btn_add.addEventListener('click', () => criar_participante());
campo_participante.addEventListener('keydown', (event) => 
{
    if(event.key === "Enter") {
        criar_participante();
    }
});



const som_tiro = new Audio('src/tiro.mp3');
const som_vitoria = new Audio('src/vitoria.mp3');

function sortear_participante () 
{
    const numero_sorteado = Math.floor(Math.random()*lista_participantes.children.length);

    lista_participantes.children[numero_sorteado].classList.add("eliminado");

    som_tiro.play();

    setTimeout(() => eliminar_participante(numero_sorteado), 1500);
}


function eliminar_participante (eliminado) 
{
    lista_participantes.children[eliminado].remove();

    if(lista_participantes.children.length > 1) {
        setTimeout(() => sortear_participante(), 1000);
    } else {
        const ganhador = lista_participantes.children[0];
        const coroa = document.createElement("img");
        coroa.src = "src/coroa.png";

        ganhador.classList.add("vitorioso")
        ganhador.appendChild(coroa);
        lista_participantes.style.justifyContent = "center";

        som_vitoria.play();

        setTimeout(() => replay(), 4000);
    }
}


function replay () 
{
    lista_participantes.children[0].remove();

    botoes.style.visibility = "initial";
}


btn_play.addEventListener('click', () => 
{
    if(lista_participantes.children.length > 1) {
        const deletar = document.querySelectorAll(".delete");

        deletar.forEach((botao) => botao.remove());
        
            botoes.style.visibility = "hidden";

        sortear_participante()
    }
});
