const express = require('express');

const router = express.Router();

    
    const { infoController } = require('../../controllers');
    const userRoutes = require('./userRoutes');


router.get('/info' , infoController.info);
router.use('/signUp',userRoutes);

module.exports = router;