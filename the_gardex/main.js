const pokedex = document.querySelector("[data-pokedex]")

async function buscarPokemons (pokemon) 
{
	let quantidadeDePokemons = 28;

	for(let i = 0; i < quantidadeDePokemons; i++) {
		const conexao = await fetch(`https://pokeapi.co/api/v2/pokemon/${i+1}/`);
		const conexaoConvertida = await conexao.json();

		pokedex.appendChild(montarPokemons(conexaoConvertida, i+1));
	}
}

buscarPokemons()

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
