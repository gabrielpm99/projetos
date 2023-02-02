const menorValor = document.querySelector("[data-menor-valor]");
const maiorValor = document.querySelector("[data-maior-valor]");
const valores = document.querySelectorAll(".valores");

let numeroSecreto;

valores.forEach((valor) => 
{
	valor.addEventListener("input", sortearNumero);
})

function sortearNumero () 
{
	numeroSecreto = parseInt(Math.random() * (maiorValor.value - menorValor.value) + menorValor.value);
}

sortearNumero();
