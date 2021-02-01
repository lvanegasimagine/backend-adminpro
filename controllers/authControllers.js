const Usuario = require('../models/usuario');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');


const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        //Verificar Email

        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Verificar Contraseña

        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            });
        }

        //Generar el Token

        const token = await generarJWT(usuarioDB.id);

        res.status(200).json({
            ok: true,
            token: token
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Comuniquese con el Administrador'
        });
    }
};


module.exports = {
    login
}