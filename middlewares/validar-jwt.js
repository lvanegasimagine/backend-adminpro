const { response } = require('express');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    //Leer el TOKEN

    const token = req.header('x-token');

    //Validar que el token nos lo envie

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        console.log(uid);
        req.uid = uid;
        next();

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Token no valido'
        })
    }

}

module.exports = { validarJWT }