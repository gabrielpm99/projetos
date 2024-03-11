const lista = document.getElementById("listaBilhetes");
const reset = document.getElementById("reset");
var quantidadeBilhetes = 100;
//Array onde ficam todos os bilhetes/elementos criados.
var arrayBilhetesDesconstruidos = [];


//Este evento resgata o array de bilhetes salvo no Local Storage e checa se ele existe,
//caso exista, irá atribuir esse array salvo ao array que irá ser construído.
//Caso não exista, aí o código irá gerar um array até o número 100.
window.addEventListener('load', () => 
{
    const bilhetes_salvos = JSON.parse(localStorage.getItem("bilhetes"));
    
    if(bilhetes_salvos) {
        arrayBilhetesDesconstruidos = bilhetes_salvos;
    } else {
        for(let i = 0; i < quantidadeBilhetes; i++) {
            arrayBilhetesDesconstruidos.push({num: i+1});
        }
    }

    rifa(arrayBilhetesDesconstruidos);
});


reset.addEventListener('click', () => resetar());


//Esta função é responsável por pegar o array de bilhetes e construir-los e mostrar-los na tela.
function rifa(arrayBilhetes) 
{
    arrayBilhetes.forEach((bilhete) => 
    {
        //Constrói o elemento e logo depois motra-o na tela.
        mostrar_bilhetes(construir_bilhetes(bilhete));
    });
}


//Esta função é responsável por mostrar os bilhetes na tela.
function mostrar_bilhetes(bilhete) 
{
    lista.appendChild(bilhete);
}


//Esta função é responsável por construir os bilhetes.
function construir_bilhetes(bilhete) 
{
    const elemento = document.createElement("li");
    elemento.id = bilhete.num-1;
    const vendido = "<img src='src/x.png' alt='Bilhete vendido'>"
    
    //Checa se o número é ímpar, caso seja, adiciona uma cor de fundo mais clara a ele.
    if(bilhete.num % 2 == 0) {
        elemento.classList.add("light_color");
    }

    //Checa se o bilhete contém a propriedade "vendido", caso tenha, aparecerá um X no lugar do número.
    if(bilhete.foiVendido) {
        elemento.innerHTML = vendido;
    } else {
        elemento.innerHTML = `<p>${bilhete.num}</p>`
    }

    bilhetesVendidos(elemento, vendido);

    //Retorna o elemento para que ele seja mostrado na tela
    return elemento;
}


//Esta função adiciona um evento de clique para informar que o bilhete foi vendido, além de atualizar o Local Storage.
function bilhetesVendidos(elemento, vendido) 
{
    elemento.addEventListener('click', () => 
    {
        elemento.innerHTML = vendido;
        
        //Caso o bilhete seja vendido, essa linha de código irá adicionar a propriedade "foiVendido" nele.
        arrayBilhetesDesconstruidos[parseInt(elemento.id)].foiVendido = true;
        
        //Esta linha de código irá atualizar o Local Storage.
        localStorage.setItem("bilhetes", JSON.stringify(arrayBilhetesDesconstruidos));
    });
}



function resetar() 
{
    localStorage.removeItem("bilhetes");
    location.reload();
}
