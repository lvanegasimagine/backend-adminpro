/*
    Ruta: /api/uploads/:fernando
*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const expressFileUpload = require('express-fileupload');
const { fileUpload, retornaImagen } = require('../controllers/uploadsControllers');

const router = Router();

router.use(expressFileUpload());

router.put('/:tipo/:id', [validarJWT], fileUpload);
router.get('/:tipo/:foto', retornaImagen);

module.exports = router;