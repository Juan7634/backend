/*
    host + /api/people
*/

const {Router} = require('express');
const router = Router();

const {validarJWT} = require('../middlewares/validar-jwt');

const {getPeople,getAllPeople, createPeople,updatePeople,deletePeople} = require('../controllers/people');

// router.use(validarJWT);

router.get('/',getAllPeople);
router.get('/:id',getPeople);
router.post('/add',createPeople);
router.put('/update/:id',updatePeople);
router.delete('/delete/:id',deletePeople);


module.exports = router;


