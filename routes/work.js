const express= require('express');

const router= express.Router();

const workController= require('./../controller/work');


router.post('/work' , workController.addWork);

router.patch('/work' , workController.updateWork);


