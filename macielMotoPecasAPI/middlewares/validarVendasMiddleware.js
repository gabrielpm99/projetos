const Ajv = require('ajv');
const ajv = new Ajv();

const vendasSchema = require('../schemas/vendasSchema');

function validarVendas (req, res, next) 
{
    const venda = req.body;
    const validate = ajv.compile(vendasSchema);
    const valid = validate(venda);
    
    if(valid) {
        next();
    } else {
        res.status(400).json({ msg: "Dados inválidos", error: validate.errors });
    }
}

module.exports = validarVendas;
