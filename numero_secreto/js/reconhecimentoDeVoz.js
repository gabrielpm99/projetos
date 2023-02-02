window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;

const mensagem = document.querySelector("[data-mensagem]");

const recognition = new SpeechRecognition();

recognition.lang = 'pt-Br';
recognition.start();

recognition.addEventListener('result', onSpeak);

function onSpeak (e) 
{
	const chute = e.results[0][0].transcript;
	exibirChuteNaTela(chute);
	validarChute(chute)
	gameOver(chute);
}

function exibirChuteNaTela (chute) 
{
	mensagem.innerHTML = `
		<p class="paragrafo">Você disse:</p>
		<span class="box">${chute}</span>
	`;
}


recognition.addEventListener('end', ativarMicrofone);

function ativarMicrofone () 
{
	recognition.start()
}
