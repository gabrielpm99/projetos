const paraLer = document.getElementById("paraLer");

async function buscarLivros () 
{
    const conexao = await fetch("http://localhost:3000", {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then((res) => res.json()).then((data) => mostrarLivros(data));
}

buscarLivros()


function mostrarLivros (data) 
{
    data.livros.forEach((e) => {
        const elemento = `
        <li class="books-item">
            <a href="${e.link}">
                <img src="${e.imagem}" alt="Imagem do livro ${e.nome}">
                <p>${e.nome}</p>
            </a>
        </li>
        `;

        paraLer.innerHTML += elemento;
    });
}
