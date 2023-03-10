const pokedex = document.querySelector("[data-pokedex]")
const verMais = document.querySelector("[data-verMais]")

let quantidadeDePokemons = 28;

verMais.addEventListener('click', () => 
{
	quantidadeDePokemons += 28;
	apiPokemons();
});

async function apiPokemons (pokemon) 
{
	for(let i = quantidadeDePokemons - 28; i < quantidadeDePokemons; i++) {
		const conexao = await fetch(`https://pokeapi.co/api/v2/pokemon/${i+1}/`);
		const conexaoConvertida = await conexao.json();

		pokedex.appendChild(montarPokemons(conexaoConvertida, i+1));
	}
}

apiPokemons()

function montarPokemons (pokemon, ordem) 
{
	const elementoPokemon = document.createElement("li");

	const tipo = pokemon.types[0].type.name;

	elementoPokemon.innerHTML = `
			<img src="${pokemon.sprites.front_default}">
			<p class="numero">${"N° " + ("0000").slice(JSON.stringify(ordem).length) + ordem}</p>
			<h2>${capFirstLetter(pokemon.name)}</h2>
			<div class="d-flex justify-content-around">
				<p class="tipo ${tipo}">${capFirstLetter(tipo)}</p>
				${checarSegundoTipo(pokemon)}
			</div>
	`;

	return elementoPokemon;
}

function checarSegundoTipo (pokemon) 
{
	if (pokemon.types[1]) {
		const tipo2 = pokemon.types[1].type.name;

		return `<p class="tipo ${tipo2}">${capFirstLetter(tipo2)}</p>`;
	} else {
		return "";
	}
}

function capFirstLetter (palavra) 
{
	return (palavra).charAt(0).toUpperCase() + (palavra).slice(1);
}
