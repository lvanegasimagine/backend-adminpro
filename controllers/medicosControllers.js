const Medico = require('../models/medico');
const { response } = require('express');

const getMedico = async(req, res = response) => {
    try {

        const medicos = await Medico.find().populate('usuario', 'nombre').populate('hospital', 'nombre');

        res.status(200).json({
            ok: true,
            medicos
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }
}

const getMedicoById = async(req, res = response) => {

    const id = req.params.id;
    try {

        const medico = await Medico.findById(id).populate('usuario', 'nombre').populate('hospital', 'nombre');

        res.status(200).json({
            ok: true,
            medico
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

        res.status(200).json({
            ok: true,
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

const actualizarMedico = async(req, res = response) => {

    const medicosID = req.params.id;
    const usuarioID = req.params.uid;

    try {

        const medicoDB = await Medico.findById(medicosID);

        if (!medicoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Medico No encontrado por ID'
            })
        }

        const cambioMedico = {
            ...req.body,
            usurio: usuarioID
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(medicosID, cambioMedico, { new: true });

        res.status(200).json({
            ok: true,
            medico: medicoActualizado
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Error Inesperado'
        })
    }
}

const EliminarMedico = async(req, res = response) => {

    const medicoID = req.params.id;

    try {

        const medicosDB = await Medico.findById(medicoID);

        if (!medicosDB) {
            return res.status(404).json({
                ok: true,
                msg: 'Medico No encontrado por ID'
            })
        }

        await Medico.findByIdAndDelete(medicoID);

        res.status(200).json({
            ok: false,
            msg: 'Medico Eliminado'
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
    getMedicoById,
    crearMedico,
    actualizarMedico,
    EliminarMedico
}