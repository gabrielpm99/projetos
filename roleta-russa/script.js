const lista_participantes = document.querySelector(".lista-participantes");

const campo_participante = document.querySelector(".campo-add");
const btn_add = document.querySelector(".button-add");

const btn_play = document.querySelector(".btn-play");

function criar_participante () 
{
    if(campo_participante.value != "" && lista_participantes.children.length <= 14) {
        const novo_participante = document.createElement("li");
        novo_participante.classList.add("participante");
        novo_participante.innerHTML = `
            ${campo_participante.value}<button class="delete">X</button>
        `;

        lista_participantes.appendChild(novo_participante);

        novo_participante.addEventListener('click', (event) => 
        {
            event.target.parentNode.remove();
        })

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



const tiro = new Audio('src/tiro.mp3')

function sortear_participante () 
{
    const numero_sorteado = Math.floor(Math.random()*lista_participantes.children.length);

    lista_participantes.children[numero_sorteado].classList.add("eliminado");

    tiro.play();

    setTimeout(() => eliminar_participante(numero_sorteado), 1500);
}

function eliminar_participante (eliminado) 
{
    lista_participantes.children[eliminado].remove();
}

btn_play.addEventListener('click', () => sortear_participante());
