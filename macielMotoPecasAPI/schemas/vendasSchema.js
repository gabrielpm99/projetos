module.exports = {
    type: "object",
    properties: {
        produto: {type: "string"},
        preco: {type: "number"},
        quantidade: {type: "integer"}
    },
    required: ["produto", "preco", "quantidade"],
    additionalProperties: false
}
