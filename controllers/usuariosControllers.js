const Usuario = require('../models/usuario');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');


const getUsuarios = async(req, res) => {

    // Muestra los campos que nosotros definamos(view)
    // const usuarios = await Usuario.find({}, 'nombre email google');

    // Muestra todos los usuarios
    const usuarios = await Usuario.find();

    res.json({
        ok: true,
        usuarios,
        uid: req.uid
    });
};

const crearUsuarios = async(req, res = response) => {

    //El req es lo que manda el usuario

    const { email, password } = req.body;

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

        // Encriptar Contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        //Guardar Usuario
        await usuario.save();

        //Generar Token
        const token = await generarJWT(usuario.id);


        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado revisar log'
        });
    }


};

const actualizarUsuarios = async(req, res = response) => {

    //TODO Validar token y comprobar si es el usuario correcto

    const uid = req.params.id;
    try {

        const usuarioDB = await usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe el usuario por ese id'
            });
        }

        const { password, google, email, ...campos } = req.body;

        if (usuarioDB.email !== email) {

            const existeEmail = await Usuario.findOne({ email });

            if (existeEmail) {
                res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                });
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });


        res.json({
            ok: true,
            usuario: usuarioActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        });
    }
}

const borrarUsuario = async(req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe el usuario por ese id'
            });
        }
        await Usuario.findByIdAndDelete(uid);

        res.status(200).json({
            ok: true,
            msg: 'Usuario Eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado'
        });
    }

}

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuarios,
    borrarUsuario
}