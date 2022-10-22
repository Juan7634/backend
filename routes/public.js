/*
 host + api/ppublic
*/
const {Router} = require('express');
const router = Router();


const {getProducts} = require('../controllers/public');

module.exports = router.get('/',getProducts);



