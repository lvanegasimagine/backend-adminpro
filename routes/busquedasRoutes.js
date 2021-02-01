/*
    Ruta: /api/todo/:fernando
*/

const { Router } = require('express');
const { getTodo } = require('../controllers/busquedaControllers');
// const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/:busqueda', [
    validarJWT
], getTodo);

module.exports = router;