const { Schema, model } = require("../assets/MongoConnect");

const Contato = new Schema(
    {
        id: String,
        nome: {
            type: String, 
            required: true
        },
        canal: {
            type: String,
            enum: ["email", "celular", "fixo"],
            required: true
        },
        valor: {
            type: String, 
            required: true
        },
        obs: String
    }, 
    {
        collection: 'contatos'
    }
)

module.exports = model( 'Contato', Contato )