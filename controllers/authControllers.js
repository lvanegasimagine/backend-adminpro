const Usuario = require('../models/usuario');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const usuario = require('../models/usuario');


const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        //Verificar Email

        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        // Verificar Contraseña

        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            });
        }

        //Generar el Token y peticion para obtencion de ID

        const [token, id] = await Promise.all([
            generarJWT(usuario.id),
            usuario.id
        ]);

        res.status(200).json({
            id,
            ok: true,
            token: token,
            usuario
        });

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Comuniquese con el Administrador'
        });
    }
};

const googleSignIn = async(req, res = response) => {

    const googleToken = req.body.token;

    try {
        const { name, email, picture } = await googleVerify(googleToken);

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            //existe usuario
            usuario = usuarioDB;
            usuario.google = true;
        }

        //Guardar en DB
        await usuario.save();

        //Generar el Token

        const token = await generarJWT(usuario.id);

        res.status(200).json({
            ok: true,
            msg: 'Google Sign',
            token
        })

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token No es Correcto',
        });
    }
}

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    const token = await generarJWT(uid);

    const usuario = await Usuario.findById(uid);

    res.json({
        ok: true,
        token,
        usuario,
    })
}


module.exports = {
    login,
    googleSignIn,
    renewToken
}