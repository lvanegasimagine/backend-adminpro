const Hospital = require('../models/hospital');
const { response } = require('express');

const getHospitales = async(req, res = response) => {

    try {
        const hospitales = await Hospital.find().populate('usuario', 'nombre email');

        res.status(400).json({
            ok: false,
            hospitales
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }
}

const crearHospital = async(req, res = response) => {

    const uidUsuario = req.uid;
    const hospital = new Hospital({
        usuario: uidUsuario,
        ...req.body
    });

    try {

        const hospitalDB = await hospital.save();

        res.status(400).json({
            ok: false,
            hospital: hospitalDB
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }
}

const actualizarHospital = (req, res = response) => {
    try {
        res.status(400).json({
            ok: false,
            msg: 'Actualizar Hospitales'
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }
}

const EliminarHospital = (req, res = response) => {
    try {
        res.status(400).json({
            ok: false,
            msg: 'Eliminar Hospitales'
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
    getHospitales,
    crearHospital,
    actualizarHospital,
    EliminarHospital
}