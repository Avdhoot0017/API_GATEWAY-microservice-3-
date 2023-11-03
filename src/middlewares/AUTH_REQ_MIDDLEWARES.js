const { StatusCodes } = require('http-status-codes');
const { errorresponce } = require('../utils/common');
const Apperror = require('../utils/errors/app-error');
const {UserService} = require('../services');

function validateAuthRequest(req,res,next){
    if(!req.body.email){

        errorresponce.message = 'something went wrong while authentication ';
        errorresponce.error = new Apperror(["email not found"] , StatusCodes.BAD_REQUEST );
         return res.status(StatusCodes.BAD_REQUEST).json(errorresponce);
    }


     if(!req.body.pasword){

        errorresponce.message = 'something went wrong while authentication ';
        errorresponce.error = new Apperror(["password not found"] , StatusCodes.BAD_REQUEST );
         return res.status(StatusCodes.BAD_REQUEST).json(errorresponce);
    }

    next();

}



async function checkAUTH(req,res,next)
{

    try {
        const isAuthenticatedMidware = await UserService.isAuthenticated(req.headers['x-acess-token']);
        if(isAuthenticatedMidware)
        {
            req.user = isAuthenticatedMidware;//this is done for down microservices to acess user directly from req;
            next();
        }
        
    } catch (error) {

        return res.status(error.StatusCodes).json(error);
        
    }
}

async function isadmin(req,res,next)
{
    const responce = await UserService.isadmin(req.user)
    if(!responce)
    {
        return res.status(StatusCodes.UNAUTHORIZED).json({message: 'user not authorized for this'});

    }

    next();


}



module.exports = {

    validateAuthRequest,
    checkAUTH,
    isadmin
}