//Productos
/*
    host + api/products
*/


const {Router} = require('express');
const router = Router();

const {validarJWT} = require('../middlewares/validar-jwt');


router.use(validarJWT);


router.get('/',);
router.post('/add',);
router.put('/update',);
router.delete('/delete',);

module.exports = router;