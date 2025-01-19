const express = require('express');
const vendasRoute = require('./routes/vendasRoute');

const app = express();
app.use(express.json());

const port = process.env.PORT || 3000;

app.use('/vendas', vendasRoute);

app.listen(port);
