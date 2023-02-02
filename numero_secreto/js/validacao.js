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
		document.body.classList.add("gameOver")
		container.innerHTML = `
		<h1 class="acertouTitle">Você acertou!</h1>
		<h2 class="acertouSub">O número secreto era <span style="text-decoration: underline;">${numeroSecreto}</span></h2>
		
		<button class="btn" data-reiniciarBtn>Jogar novamente</button>

		<div class="fogos-container">
			<img src="fogos.gif" class="fogos">
			<img src="fogos.gif" class="fogos">
		</div>
		`;
		
		const reiniciarBtn = document.querySelector("[data-reiniciarBtn]")
		
		reiniciarJogo(reiniciarBtn);

		;

		

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


function reiniciarJogo (botao) 
{
	botao.addEventListener('click', () => 
	{
		window.location.reload();
	})
}


function gameOver (chute) 
{
	if (chute == "game over") {
		recognition.removeEventListener('end', ativarMicrofone);

		container.innerHTML = `
		<h1 class="gameOverTexto">Game over</h1>

		<button class="comecarBtn" data-comecarBtn>Começar</button>
		`

		const comecarBtn = document.querySelector("[data-comecarBtn]")

		reiniciarJogo(comecarBtn);

		document.body.classList.add("gameOver");
	}
}
