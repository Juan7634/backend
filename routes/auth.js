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
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('apellido1', 'El apellido paterno es obligatorio es obligatorio').not().isEmpty(),
        check('apellido2', 'El apellido paterno es obligatorio es obligatorio').not().isEmpty(),
        check('CP','El codigo postal es obligatorio').not().isEmpty(),
        check('numero','El numero de la vivienda es obligatorio').not().isEmpty(),
        check('ciudad','El nombre de la ciudad es obligatorio').not().isEmpty(),
        check('estado', 'El nombre del estado es obligatorio').not().isEmpty(),
        check('pais','El nombre del pais es obligatorio').not().isEmpty(),
        check('puesto','El nombre del puesto es obligatorio').not().isEmpty(),
        check('sueldo','El sueldo es un campo obligatorio').not().isEmpty(),
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