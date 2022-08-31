//Obtener eventos
/*
    host + api/events
*/

const {Router} = require('express');
const router = Router();

const {crearEventos, getEventos,actualizarEventos,eliminarEventos} = require('../controllers/events');
const {validarJWT} = require('../middlewares/validar-jwt');

router.use(validarJWT);

router.get('/',getEventos);
router.post('/',crearEventos);
router.put('/:id',actualizarEventos);
router.delete('/:id',eliminarEventos);

module.exports = router;

