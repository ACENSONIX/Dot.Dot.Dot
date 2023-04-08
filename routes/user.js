const express= require('express');

const router= express.Router();




// Importing the controllers
const userController= require('./../controller/user')

// Importing the middlewares
// const authMiddleware= require('./../middlewares/auth');
const models = require('../utils/allModels');

// User Routes
router.post('/user/signup', userController.signup);

router.post('/user/login', userController.login);

router.get('/user/profile', userController.getUser);

router.get('/user/profile/:id', userController.getUser)

router.get('/user/employee', userController.getEmployedUser);

router.get('/user/employee/:id', userController.getEmployedUser);

router.post('/user/flag/:id', userController.flagUser);

router.get('/user/flag/:id', userController.viewFlaggedUser);

module.exports= router;