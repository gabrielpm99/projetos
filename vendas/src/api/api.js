const express = require('express')
const cors = require('cors')
const path = require('path')
const { Vendas } = require('../db/models')

const app = express()

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(cors())

app.get('/vendas', async (req, res) => {
    try {
        const vendasObj = await Vendas.findAll()
        res.render('pages/index', {vendas: vendasObj})
    } catch (error) {
        res.status(400).json({error: error})
    }
})

app.post('/vendas', async (req, res) => {
    try {
        const venda = await Vendas.create(req.body)
        res.json({ msg: "Venda cadastrada com sucesso" })
    } catch (error) {
        res.status(400).json({error: error})
    }
})

app.delete('/vendas', async (req, res) => {
    try {
        const id = req.query.id
        const venda = await Vendas.findByPk(id)
        await venda.destroy()
    } catch (error) {
        res.status(400).json({error: error})
    }
})


app.listen(9000)
