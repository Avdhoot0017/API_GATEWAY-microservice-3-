const express = require('express');
const { userController} = require('../../controllers');
const { signInmiddlewares } = require('../../middlewares');

const router = express.Router();

//localhost:5000/api/v1/user/signIn

router.post('/signUp',signInmiddlewares.validateAuthRequest,userController.createuser);
router.post('/signIn',signInmiddlewares.validateAuthRequest,userController.signIn);



module.exports = router;
