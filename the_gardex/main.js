import {pokemons} from "./pokedex.js";

const pokedex = document.querySelector("[data-pokedex]")
let contador = 1;

async function buscarPokemons () 
{
	const api = await pokemons.conexao();
	const arrayPokemons = api.results;

	arrayPokemons.forEach((pokemon) => buscarApi(pokemon));
}

async function buscarApi (pokemon) 
{
	const conexao = await fetch(pokemon.url);
	const conexaoConvertida = await conexao.json();

	pokedex.appendChild(montarPokemons(conexaoConvertida));
	contador++
}

buscarPokemons()

function montarPokemons (pokemon) 
{
	const elementoPokemon = document.createElement("li");

	const tipo = pokemon.types[0].type.name;

	elementoPokemon.innerHTML = `
			<img src="${pokemon.sprites.front_default}">
			<p class="numero">${"N° " + ("000").slice(JSON.stringify(contador).length - 1) + contador}</p>
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
