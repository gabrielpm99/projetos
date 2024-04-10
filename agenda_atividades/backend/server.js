const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

// Configuração da conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "agenda159Atividades",
  database: "agendaatividades"
});

// Conectar ao banco de dados
connection.connect((error) => {
    if (error) {
      console.error("Erro ao conectar ao banco de dados:", error);
      return;
    }
    console.log("Conexão bem sucedida com o banco de dados");
});


// Configuração do CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Permitir solicitações de qualquer origem
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});


// Rota para obter os dados do banco de dados
app.get("/", (req, res) => {
  connection.query("SELECT * FROM atividades", (error, results) => {
    if (error) {
      res.status(500).send("Erro ao recuperar os dados do banco de dados");
      return;
    }
    res.json(results);
  });
});


app.post('/inserir', (req, res) => {
  const { materia, data, titulo, informacoes } = req.body;

  connection.query(`INSERT INTO atividades (MATERIA, DATA_ENTREGA, TITULO, INFORMACOES) VALUES (${materia}, ${data}, ${titulo}, ${informacoes})`, (error, results) => {
    if (error) {
      res.status(500).send('Erro ao inserir os dados no banco de dados');
      return;
    }
    res.send('Dados inseridos com sucesso');
  });
});


// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});
