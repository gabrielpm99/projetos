const grid = document.querySelector("[data-gridNature]");

async function apiNatures () 
{
	const conexao = await fetch("http://localhost:3000/naturezas");
	const conexaoConvertida = await conexao.json();

	conexaoConvertida.forEach((elemento) => 
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
