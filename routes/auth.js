/*
    Rutas de Usuarios / Auth
    host + /api/auth
 */

const {Router} = require('express');
const {check} = require('express-validator');
const validarCampos = require('../middlewares/validar-campos');
const {createUser, loginUsuario, revalidarToken} = require('../controllers/auth');
const {validarJWT} = require('../middlewares/validar-jwt');

const router = Router();

router.post(
    '/new',
    [
        check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty().isLength({min: 6})
    ], //Validaciones
    validarCampos,
    createUser
    );


router.post('/',
        [
            check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
            check('password', 'La contraseña es obligatoria y debe ser de 6 caracteres').not().isEmpty().isLength({min: 6})
        ],
        validarCampos,
        loginUsuario);

router.get('/renew',validarJWT, revalidarToken);


module.exports = router;