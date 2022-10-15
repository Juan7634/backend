//Productos
/*
    host + api/products
*/


const {Router} = require('express');
const router = Router();

const {validarJWT} = require('../middlewares/validar-jwt');
const {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
    } = require('../controllers/product');
 
router.use(validarJWT);


router.get('/',getProducts);
router.post('/add',createProduct);
router.put('/update/:id',updateProduct);
router.delete('/delete/:id',deleteProduct);

module.exports = router;