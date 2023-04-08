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

// router.get('/user/profile', authMiddleware, userController.profile)

// router.post('/user/update', authMiddleware, userController.update)

// router.post('/user/delete', authMiddleware, userController.delete)

module.exports= router;