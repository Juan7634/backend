/*
     host + api/users 

*/

const {Router} = require('express');


const router = Router();

const {getUser,getUsers,createUser,updateUser,deleteUser} = require('../controllers/users');

router.get('/:id',getUser);
router.get('/',getUsers);
router.post('/add',createUser);
router.put('/update/:id',updateUser)
router.delete('/delete/:id',deleteUser);


module.exports = router;