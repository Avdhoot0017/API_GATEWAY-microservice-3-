const express = require('express');
const { userController} = require('../../controllers');

const router = express.Router();

router.post('/signUp',userController.createuser);
router.post('/signIn',userController.signIn);



module.exports = router;
