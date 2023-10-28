const express = require('express');
const { signInmiddlewares } = require('../../middlewares')


const router = express.Router();

    
    const { infoController } = require('../../controllers');
    const userRoutes = require('./userRoutes');

   // localhost:5000/api/v1/info  //with header with token
router.get('/info' ,signInmiddlewares.checkAUTH, infoController.info);
router.use('/user',userRoutes);

module.exports = router;