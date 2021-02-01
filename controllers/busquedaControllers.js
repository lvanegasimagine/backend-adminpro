const { response } = require('express');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const getTodo = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const regex = new RegExp(busqueda, 'i');

    const [usuarios, medico, hospital] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Medico.find({ nombre: regex }),
        Hospital.find({ nombre: regex })
    ]);

    try {
        res.status(200).json({
            ok: true,
            usuarios,
            medico,
            hospital
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }

}

const getDocumentoColeccion = async(req, res = response) => {

    const busqueda = req.params.busqueda;
    const tabla = req.params.tabla;
    const regex = new RegExp(busqueda, 'i');

    try {

        switch (tabla) {
            case 'medicos':
                const dataMedico = await Medico.find({ nombre: regex }).populate('usuario', 'nombre img').populate('hospital', 'nombre img');
                res.status(200).json({
                    ok: true,
                    resultados: dataMedico
                });

                break;
            case 'hospitales':
                const dataHospital = await Hospital.find({ nombre: regex }).populate('usuario', 'nombre img');
                res.status(200).json({
                    ok: true,
                    resultados: dataHospital
                });
                break;
            case 'usuarios':
                const dataUsuario = await Usuario.find({ nombre: regex });
                res.status(200).json({
                    ok: true,
                    resultados: dataUsuario
                });
                break;

            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'La tabla tiene que ser usuarios/medicos/hospitales'
                });
        }
    } catch (error) {

    }
}

module.exports = {
    getTodo,
    getDocumentoColeccion
}