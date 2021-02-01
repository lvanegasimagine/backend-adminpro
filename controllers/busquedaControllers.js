const { response } = require('express');

const getTodo = (req, res = response) => {

    const busqueda = req.params.busqueda;

    try {
        res.status(200).json({
            ok: true,
            msg: busqueda
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

module.exports = {
    getTodo
}