const express = require('express');
const { userController} = require('../../controllers');
const { signInmiddlewares } = require('../../middlewares');
const { checkAUTH } = require('../../middlewares/AUTH_REQ_MIDDLEWARES');

const router = express.Router();

//localhost:5000/api/v1/user/signIn

router.post('/signUp',signInmiddlewares.validateAuthRequest,userController.createuser);
router.post('/signIn',signInmiddlewares.validateAuthRequest,userController.signIn);
router.post('/role',signInmiddlewares.checkAUTH,signInmiddlewares.isadmin, userController.addroletoUSer);



module.exports = router;
