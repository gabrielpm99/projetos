const grid = document.querySelector("[data-gridNature]");

async function apiNatures () 
{
	const conexao = await fetch("https://gabrielpm99.github.io/projetos/the_gardex/naturezas.json");
	const conexaoConvertida = await conexao.json();
	
	conexaoConvertida.naturezas.forEach((elemento) => 
	{
		for(let i = 0; i < elemento.row.length; i++) {
			grid.appendChild(criarGrid(elemento.row[i], elemento.cor[i]));
		}
	})
}

apiNatures()

function criarGrid (stat, cor)
{
	const li = document.createElement("li");
	li.textContent = stat;
	li.classList.add("natures");

	li.style.backgroundColor = cor;

	return li;
}
