const Usuario = require('../models/usuario');

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

const crearUsuarios = async(req, res) => {

    //El req es lo que manda el usuario

    // const { email, password, nombre } = req.body;

    const usuario = new Usuario(req.body);

    await usuario.save();

    res.json({
        ok: true,
        usuario
    });
};

module.exports = {
    getUsuarios,
    crearUsuarios
}