const Hospital = require('../models/hospital');
const { response } = require('express');
const hospital = require('../models/hospital');

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

const actualizarHospital = async(req, res = response) => {

    const hospitalID = req.params.id;
    const usuarioID = req.params.uid;

    try {

        const hospitalDB = await Hospital.findById(hospitalID);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital No encontrado por ID'
            })
        }

        const cambioHospital = {
            ...req.body,
            usurio: usuarioID
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(hospitalID, cambioHospital, { new: true });

        res.status(200).json({
            ok: false,
            hospital: hospitalActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }
}

const EliminarHospital = async(req, res = response) => {

    const hospitalID = req.params.id;

    try {

        const hospitalDB = await Hospital.findById(hospitalID);

        if (!hospitalDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Hospital No encontrado por ID'
            })
        }

        await Hospital.findByIdAndDelete(hospitalID);

        res.status(200).json({
            ok: false,
            msg: 'Hospital Eliminado'
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