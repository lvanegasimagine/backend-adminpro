/*
    Ruta: /api/usuarios
*/

const { Router } = require('express');
const { getUsuarios, crearUsuarios } = require('../controllers/usuariosControllers');
const { check } = require('express-validator');

const router = Router();

router.get('/', getUsuarios);
router.post('/', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail()
], crearUsuarios);

module.exports = router;