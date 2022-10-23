const {Router} = require('express');

const router = Router();

const {getEmployee,getAllEmployees,createEmployee,updateEmployee,deleteEmployee} = require('../controllers/employee');


router.get('/',getAllEmployees);
router.get('/:id',getEmployee);
router.post('/add',createEmployee);
router.put('/update/:id',updateEmployee);
router.delete('/delete/:id',deleteEmployee);


module.exports = router;