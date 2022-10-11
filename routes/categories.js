/*
 host + api/cateries 
*/
const {Router} = require('express');
const router = Router();

const {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
    } = require('../controllers/categories');

const {validarJWT} = require('../middlewares/validar-jwt');

router.use(validarJWT);

router.get('/',getCategories);
router.post('/newCategory',createCategory);
router.put('/updateCategory/:id',updateCategory);
router.delete('/deleteCategory:id',deleteCategory);


module.exports = router;