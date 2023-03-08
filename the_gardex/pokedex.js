async function conexao () 
{
	const api = await fetch("https://pokeapi.co/api/v2/pokemon/");
	const apiConvertida = await api.json();

	return apiConvertida;
}

export const pokemons = {
	conexao
}
