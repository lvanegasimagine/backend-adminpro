/*
    Ruta: /api/medicos
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getMedico, getMedicoById, crearMedico, actualizarMedico, EliminarMedico } = require('../controllers/medicosControllers');

const router = Router();

router.get('/', validarJWT, getMedico);

router.post('/', [validarJWT,
    check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
    check('hospital', 'El hospitalID debe de ser valido').isMongoId(),
    validarCampos
], crearMedico);

router.put('/:id', [validarJWT,
    check('nombre', 'El nombre del hospital es necesario').not().isEmpty(),
    check('hospital', 'El hospitalID debe de ser valido').isMongoId(),
    validarCampos
], actualizarMedico);

router.get('/:id', validarJWT, getMedicoById);

router.delete('/:id', validarJWT, EliminarMedico);

module.exports = router;