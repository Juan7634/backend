/*

    host + api/purchases

*/



const {Router} = require('express');
const router = Router();

const {validarJWT} = require('../middlewares/validar-jwt');
const {
    getPurchase,
    getAllPurchase,
    createPurchase,
    updatePurchase,
    deletePurchase   

} = require('../controllers/purchases');

router.get('/',getAllPurchase);
router.get('/:id', getPurchase);
router.post('/create',createPurchase);
router.put('/update/:id',updatePurchase);
router.delete('/delete/:id',deletePurchase);


module.exports = router;