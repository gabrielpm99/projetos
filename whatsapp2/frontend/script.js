// Elementos do Login
const loginContainer = document.getElementById("login");
const loginForm = document.getElementById("login_form");
const nome = document.getElementById("nome");

// Elementos do Chat
const chatContainer = document.getElementById("chat");
const mensagem = document.getElementById("mensagem");
const chatForm = document.getElementById("chat_form");

const mensagensEnviadas = document.getElementById("mensagens");


var mensagensSalvas = [];


const usuario = { id: "", nome: "", cor: ""};

let websocket;
let processarMensagem = ({ data }) => 
{
    const {idRemetente, nomeRemetente, corRemetente, mensagem} = JSON.parse(data);

    const elemento = idRemetente == usuario.id
        ? criarPropriaMensagem(mensagem)
        : criarOutraMensagem(mensagem, nomeRemetente, corRemetente)

    mensagensEnviadas.appendChild(elemento);

    rolarTela();

    salvarMensagens(idRemetente, nomeRemetente, corRemetente, mensagem);
}


// Esta função irá criar um usuário, mostrar o "chat" e conectar com o servidor
function logar (event) 
{
    event.preventDefault();
    usuario.id = criarId();
    usuario.nome = nome.value;
    usuario.cor = corAleatoria();

    loginContainer.style.display = "none";
    chatContainer.style.display = "flex";

    websocket = new WebSocket("wss://whatsapp2-u2sn.onrender.com");
    websocket.onmessage = processarMensagem;

    mostrarMensagensSalvas();
}


// Esta função cria uma cor aleatória em hexadecimal
function corAleatoria () 
{
    let cor = "#";

    while (cor.length < 7) {
        cor += Math.ceil(Math.random() * 10);
    }

    return cor;
}


function enviarMensagem (event) 
{
    event.preventDefault();

    const objMensagem = {
        idRemetente: usuario.id,
        nomeRemetente: usuario.nome,
        corRemetente: usuario.cor,
        mensagem: mensagem.value
    };

    websocket.send(JSON.stringify(objMensagem));
    mensagem.value = "";
}


function criarPropriaMensagem (msg) 
{
    const div = document.createElement("div");
    div.classList.add("propria_mensagem");
    div.innerHTML = msg;

    return div;
}


function criarOutraMensagem (msg, nome, cor) 
{
    const div = document.createElement("div");
    const span = document.createElement("span");
    
    div.classList.add("outra_mensagem");
    span.classList.add("quem_enviou");

    span.innerHTML = nome;
    span.style.color = cor;

    div.appendChild(span);
    div.innerHTML += msg;

    return div;
}


function rolarTela () 
{
    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    })
}


function salvarMensagens (id, nome, cor, msg) 
{
    const mensagens = JSON.parse(localStorage.getItem("mensagens"));
    
    if(mensagens) {
        mensagensSalvas = mensagens;
    }

    mensagensSalvas.push({
        id: id,
        nome: nome,
        cor: cor,
        msg: msg
    });

    localStorage.setItem("mensagens", JSON.stringify(mensagensSalvas));
}


function mostrarMensagensSalvas () 
{
    const mensagens = JSON.parse(localStorage.getItem("mensagens"));

    if(mensagens) {
        mensagens.forEach((mensagem) => 
        {
            if(mensagem.id == localStorage.getItem("id")) {
                mensagensEnviadas.appendChild(criarPropriaMensagem(mensagem.msg));
            } else {
                mensagensEnviadas.appendChild(criarOutraMensagem(mensagem.msg, mensagem.nome, mensagem.cor));
            }
        });
    }
}


function criarId() 
{
    const idSalvo = localStorage.getItem("id");
    
    if(idSalvo) {
        return idSalvo;
    } else {
        localStorage.setItem("id", crypto.randomUUID());
        return localStorage.getItem("id");
    }
}


// Quando o botão "Entrar" do login for pressionado, irá chamar a função "logar"
loginForm.addEventListener("submit", logar);
chatForm.addEventListener("submit", enviarMensagem);
