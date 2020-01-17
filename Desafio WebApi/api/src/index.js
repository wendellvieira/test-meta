const express = require('express')
const bodyParser = require("body-parser")
const App = express()
const port = 3000
const cors = require('cors')

App.use( cors() )
App.use( express.json() )
App.use( bodyParser.urlencoded({ extended: true }) )

const Contatos = require("./Controllers/Contatos")
App.use( "/", Contatos )


App.listen(port, () => {
    console.log('server is rinning in ' + port )
})
