const Usuario = require('../models/usuario');
const { response } = require('express');

const getUsuarios = async(req, res) => {

    // Muestra los campos que nosotros definamos(view)
    // const usuarios = await Usuario.find({}, 'nombre email google');

    // Muestra todos los usuarios
    const usuarios = await Usuario.find();

    res.json({
        ok: true,
        usuarios
    });
};

const crearUsuarios = async(req, res = response) => {

    //El req es lo que manda el usuario

    const { email, password, nombre } = req.body;

    try {
        // Esta linea captura el email del body
        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'Correo ya registrado'
            });
        };

        const usuario = new Usuario(req.body);

        await usuario.save();

        res.json({
            ok: true,
            usuario
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado revisar log'
        });
    }


};

module.exports = {
    getUsuarios,
    crearUsuarios
}