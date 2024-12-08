const fs = require("fs");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json())
app.use(cors());

app.listen(3000);

app.post("/", (req, res) => 
    {
        const data = JSON.parse(fs.readFileSync("../data/livros.json", "utf8", (err, data) => JSON.parse(data)));
        const element = req.body;

        data.livros.push(element);

        armazenarDados(data);
    });


app.get("/", (req, res) => 
    {
        const data = JSON.parse(fs.readFileSync("../data/livros.json", "utf8", (err, data) => JSON.parse(data)));

        res.json(data);
    });


function armazenarDados (data) 
    {
        fs.writeFileSync("../data/livros.json", JSON.stringify(data));
    }
