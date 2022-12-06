/*
 host + api/proveedor 
*/
const {Router} = require('express');
const router = Router();

const {createProveedor,
    getAllProveedores,
    getProveedor} = require('../controllers/proveedor');

const {validarJWT} = require('../middlewares/validar-jwt');


router.use(validarJWT);

router.get('/',getAllProveedores);
router.post('/add', createProveedor);
// router.put('/update',);
// router.delete('/',);


module.exports = router;
