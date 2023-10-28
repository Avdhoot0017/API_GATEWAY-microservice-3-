
const {UserService}  = require('../services');
const {successresponce , errorresponce} = require('../utils/common');
const { StatusCodes } = require('http-status-codes');




async function createuser(req,res)
 {

    try {

        const user = await UserService.createUser({

            email: req.body.email,
            pasword: req.body.pasword,


        });

        


        successresponce.data = user;


        return res.status(StatusCodes.CREATED).json(successresponce)
        
    } catch (error) {

        

        errorresponce.error = error;
        

        return res.status(error.statusCode).json(errorresponce);


        
        
    }
 }





 async function signIn(req,res)
 {

    try {

        const user = await UserService.signIn({

            email: req.body.email,
            pasword: req.body.pasword,


        });

        


        successresponce.data = user;


        return res.status(StatusCodes.CREATED).json(successresponce)
        
    } catch (error) {


        console.log(error);

        

        errorresponce.error = error;
        

        return res.status(error.statusCode).json(errorresponce);


        
        
    }
 }


 module.exports = {
    createuser,
    signIn
 }