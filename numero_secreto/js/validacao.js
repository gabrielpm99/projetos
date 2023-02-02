const container = document.querySelector("[data-container]");

function validarChute (chute) 
{
	const chuteInt = parseInt(chute);

	validarTipo(chuteInt);
}



function validarTipo (chute) 
{
	if (Number.isNaN(chute)) {
		mensagem.innerHTML += `
				<p class="paragrafo">Este número não é válido</p>
			`;
	} else {
		validarNumeroBetween(chute);
	}
}



function validarNumeroBetween (chute) 
{
	if (chute < menorValor.value || chute > maiorValor.value) {
		mensagem.innerHTML += `
			<p class="paragrafo">O número precisa estar entre ${menorValor.value} e ${maiorValor.value}</p>
		`;
	} else {
		validarAcerto(chute);
	}
}



function validarAcerto (chute) 
{
	if (chute == numeroSecreto) {
		container.innerHTML = `
		<h1 class="titulo">Você acertou!</h1>
		<h2 class="subtitulo">O número secreto era <span style="text-decoration: underline;">${numeroSecreto}</span></h2>
		
		<button class="reiniciar-btn" data-reiniciarBtn>Jogar novamente</button>

		<div class="fogos-container">
			<img src="fogos.gif" class="fogos">
			<img src="fogos.gif" class="fogos">
		</div>
		`;

		const reiniciarBtn = document.querySelector("[data-reiniciarBtn]");

		reiniciarBtn.addEventListener('click', () => 
		{
			window.location.reload();
		})

	} else if (chute < numeroSecreto) {
		mensagem.innerHTML += `
			<p class="paragrafo">O número secreto é maior <i class="fa-solid fa-arrow-up icone"></i></p>
		`;
		} else {
			mensagem.innerHTML += `
			<p class="paragrafo">O número secreto é menor <i class="fa-solid fa-arrow-down icone"></i></p>
			`;
		}
}
