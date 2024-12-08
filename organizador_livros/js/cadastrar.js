const form = document.getElementById("form-cadastrar");
const inputs = document.querySelectorAll(".cadastrar-input");

var dados = {}

form.addEventListener("submit", (e) => 
    {
        e.preventDefault();

        inputs.forEach((e) => {
            dados[e.id] = e.value
        });

        cadastrarLivro(dados);
    });


async function cadastrarLivro (data) 
    {
        const conexao = await fetch("http://localhost:3000", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
    }
