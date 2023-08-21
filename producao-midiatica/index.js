//IDEIAS!!!

//TROCAR OS TEXTOS POR IMAGENS, E QUANDO CLICAR NELAS, FAZER OS TEXTOS APARECEREM.
//USAR UMA FONTE "ESCRITA À MÃO" NAS INFORMAÇÕES SOBRE CANAIS, CANTORES E ETC.

const imagens = document.querySelectorAll(".item-imagem");

imagens.forEach((imagem) => imagem.addEventListener("click", () => 
{
    const botaoPlay = imagem.parentNode.querySelector(".item-icone");
    
    imagem.parentNode.querySelector(".item-texto").classList.toggle("hidden");
   
    if(botaoPlay) {
        botaoPlay.classList.toggle("hidden");
    }
}))

const botoes = document.querySelectorAll(".item-icone");

botoes.forEach((botao) => botao.addEventListener('click', () => 
{
    botao.parentNode.querySelector('audio').play()
}))
