const express = require('express');
const router = express.Router();

const vendasMid = require('../middlewares/validarVendasMiddleware');

const { Vendas } = require('../db/models');


router.post('/', vendasMid);


router.get('/', async (req, res) => {
    try {
        const vendas = await Vendas.findAll();
        res.status(200).json({ vendas: vendas });
    } catch (error) {
        res.status(500).json({ error: "Erro ao buscar vendas" });
        console.error(error);
    }
});

router.post('/', async (req, res) => {
    try {
        const venda = await Vendas.create(req.body);
        res.status(200).json({ msg: "Venda cadastrada com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: "Não foi possível cadastrar a venda" });
        console.error(error);
    }
});

module.exports = router;
