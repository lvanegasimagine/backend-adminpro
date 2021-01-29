/*
    Ruta: /api/usuarios
*/

const { Router } = require('express');
const { getUsuarios, crearUsuarios } = require('../controllers/usuariosControllers')

const router = Router();

router.get('/', getUsuarios);
router.post('/', crearUsuarios);

module.exports = router;