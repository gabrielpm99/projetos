const recusa = document.querySelector(".btn-recuso");
const limiteX = screen.width - (recusa.offsetWidth);
const limiteY = screen.height - (recusa.offsetHeight);

recusa.addEventListener('click', () => 
{
    recusa.style.position = 'absolute';

    let xAleatorio = Math.floor(Math.random() * limiteX/2);
    let yAleatorio = Math.floor(Math.random() * limiteY/2);
    const aleatoriedade = Math.round(Math.random());

    if (aleatoriedade === 1) {
        xAleatorio * 1;
    } else {
        xAleatorio = xAleatorio * -1;
    }

    recusa.style.right = `${xAleatorio}px`;
    recusa.style.top = `${yAleatorio}px`;
})
