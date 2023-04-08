const express = require('express');
const router = express.Router();



// Importing the controllers
const cafeController = require('./../controller/cafe')


router.post('/cafe/signup', cafeController.signup);

router.post('/cafe/login', cafeController.login);



module.exports = router;