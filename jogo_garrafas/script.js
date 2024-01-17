const qtd_garrafas = 8;
const lista_garrafas = document.querySelector(".lista_garrafas");
const escolhidas = document.querySelector(".escolhidas");

let garrafas_sorteadas = [];

const correto = new Audio("src/correto.mp3");
const errado = new Audio("src/errado.mp3");
const vitoria = new Audio("src/vitoria.mp3");
correto.volume = 0.4;
errado.volume = 0.1;
vitoria.volume = 0.3;

function sortear_garrafas () 
{
    let numero = Math.round(Math.random() * (qtd_garrafas-1));

    if (garrafas_sorteadas.includes(numero)) {
        sortear_garrafas();
    } else {
        garrafas_sorteadas.push(numero);
    }
}

for (let i = 0; i < qtd_garrafas; i++) {
    const garrafa = document.createElement("li");
    const garrafa_img = document.createElement("img");

    garrafa_img.src = `src/garrafa${i}.png`;
    garrafa.classList.add("garrafa")
    garrafa.id = i;

    garrafa.addEventListener('click', click_garrafa);

    garrafa.appendChild(garrafa_img);
    lista_garrafas.appendChild(garrafa);

    sortear_garrafas();
}

function click_garrafa (e) 
{
    escolher_garrafa(e.target.parentNode)
}

function escolher_garrafa (garrafa) 
{
    checar_garrafa(garrafa);
    escolhidas.appendChild(garrafa);
}

function mensagem_vitoria () 
{
    const main = document.querySelector("main");
    const container = document.createElement("section");
    const mensagem = document.createElement("h1");

    container.classList.add("mensagem_container");
    mensagem.classList.add("mensagem");

    mensagem.innerHTML = "Você ganhou!";
    container.appendChild(mensagem);

    main.appendChild(container);
}

function checar_garrafa (garrafa) 
{
    if (garrafa.id == garrafas_sorteadas[0]) {
        garrafa.removeEventListener('click', click_garrafa);
        garrafas_sorteadas.shift();
        correto.play();
        
        if(escolhidas.children.length == qtd_garrafas-1) {
            mensagem_vitoria();
            vitoria.play();
            setTimeout(recomecar_jogo, 5000);
        }
    } else {
        setTimeout(retornar_garrafa, 1000, garrafa);
        errado.play();
    }
}

function retornar_garrafa (garrafa) 
{
    lista_garrafas.appendChild(garrafa);
}

function recomecar_jogo () 
{
    location.reload()
}
