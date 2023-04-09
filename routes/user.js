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

router.post('/user/hire/:id', userController.work);

router.get('/user/profile', userController.getUser);

router.get('/user/profile/:id', userController.getUser)

// router.get('/user/employee/', userController.getEmployedUser);

router.get('/user/employee/:id', userController.getEmployedUser);

router.post('/user/flag/:id', userController.flagUser);

router.get('/user/flag', userController.viewFlaggedUser);

router.post('/user/search' , userController.searchUserImage);

// router.post('/user/verify-user',userController)

router.post('/user/verify-user/:id',userController.verifyDocuments);

router.post('/user/import'  , userController.importUser);

router.post('/user/import-user', userController.addUserFromImport);

module.exports= router;