const Medico = require('../models/medico');
const { response } = require('express');

const getMedico = async(req, res = response) => {
    try {

        const medicos = await Medico.find().populate('usuario', 'nombre').populate('hospital', 'nombre');

        res.status(400).json({
            ok: false,
            msg: medicos
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }
}

const crearMedico = async(req, res = response) => {

    const uidUsuario = req.uid;
    const medico = new Medico({
        usuario: uidUsuario,
        ...req.body
    });

    try {

        const medicoDB = await medico.save();

        res.status(400).json({
            ok: false,
            medico: medicoDB
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }
}

const actualizarMedico = (req, res = response) => {
    try {
        res.status(400).json({
            ok: false,
            msg: 'Actualizar Medicos'
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }
}

const EliminarMedico = (req, res = response) => {
    try {
        res.status(400).json({
            ok: false,
            msg: 'Eliminar Medico'
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }
}

module.exports = {
    getMedico,
    crearMedico,
    actualizarMedico,
    EliminarMedico
}