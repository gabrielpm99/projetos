let cep;

async function buscaEndereco (cep) 
{
	const mensagemErro = document.querySelector("[data-erro]");
	mensagemErro.innerHTML = '';

	const bairro = document.querySelector("[data-bairro]");
	const endereco = document.querySelector("[data-endereco]");
	const cidade = document.querySelector("[data-cidade]");
	const uf = document.querySelector("[data-uf]");

	const inputs = [bairro, endereco, cidade, uf];

	try {
		const consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json`);
		const consultaCepConvertido = await consultaCep.json();

		if(consultaCepConvertido.erro) {
			mensagemErro.innerHTML = `<p>Este CEP não existe. Tente novamente</p>`

			limparInputs(inputs);
			return;
		}

		uf.value = consultaCepConvertido.uf;
		cidade.value = consultaCepConvertido.localidade;
		endereco.value = consultaCepConvertido.logradouro;
		bairro.value = consultaCepConvertido.bairro;

	
	} catch (erro) {
		mensagemErro.innerHTML = `<p>O CEP deve conter 8 dígitos</p>`

		limparInputs(inputs);
	}
}

const cepInput = document.querySelector("[data-cepInput]");

cepInput.addEventListener('focusout', () => buscaEndereco(cepInput.value));

function limparInputs (inputs) 
{
	inputs.forEach((input) => input.value = '');
}
