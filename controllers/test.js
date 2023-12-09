const { request, response } = require('express')

const testing = (req, res) => {// endpoint
    //const { msj, msj2 } = req.query
    return res.json({
        msj: `hola`
    })
}

module.exports = { testing }

