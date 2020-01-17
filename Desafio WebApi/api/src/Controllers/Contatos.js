const express = require('express')

const router = express.Router()

const Contato = require("../Models/Contato")

router.post("/", async ({body}, response) => {
    try {
        const Register = new Contato( body );
        await Register.save();
        response.json( Register );

    } catch ({message}) {
        response.status(400).json({ message })
    }
});

router.get("/", async ({query : { size: limit, page }}, response) => {

    limit = parseInt( limit || 10 )
    page =  parseInt( ( page || 0) * limit )

    Contato.find({}).skip(page).limit(limit).exec( (err, Contatos) => {            
        if( err ) response.status(401).send({ message: 'Error na solicitação' })
        else {
            if( !Contatos ) response.status(404).send({message: 'Nenhum Contato cadastrado!' })
            else response.json( Contatos )            
        }
    });

});

router.get("/:idContato", async ({ params: {idContato}}, response ) => {
    try {
        const findedContact = await Contato.findById(idContato)
        response.json(findedContact)
    } catch (error) {
        response.status(404).json({message: "Registro não encontrado"})
    }
});

router.put("/:idContato", async ({ params: {idContato}, body }, response ) => {
    try {
        const findedContact = await Contato.findByIdAndUpdate(idContato, body, {new: true, runValidators: true})
        response.json(findedContact)
    } catch (error) {
        response.status(404).json({message: "Registro não encontrado"})
    }
});

router.delete("/:idContato", async ({ params: {idContato} }, response ) => {
    try {
        const findedContact = await Contato.findByIdAndDelete( idContato )
        response.json(findedContact)
    } catch (error) {
        response.status(404).json({message: "Registro não encontrado"})
    }
});


module.exports = router