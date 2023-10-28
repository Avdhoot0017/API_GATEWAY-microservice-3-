const { UserRepository } = require('../repository');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');
const { Auth }  = require('../utils/common')


const  Apperror   = require('../utils/errors/app-error');
const { application } = require('express');

const userRepo = new UserRepository();

async function createUser(data)
{

    try {
        const user = await userRepo.create(data);
    
        return user;
        
        
    } catch (error) {

    if(error.name == 'SequelizeUniqueConstraintError')
    {

        throw new Apperror('cannot create a new user Object' , StatusCodes.INTERNAL_SERVER_ERROR);
       
    }   
    }
}


async function signIn(data)
{
    try {
         const user = await userRepo.getuserByEmail(data.email);
         if(!user)
         {
            throw new Apperror('cannot find corresponding email', StatusCodes.NOT_FOUND);
         }

         const passMatching = Auth.checkPAss(data.pasword,user.pasword);
         if(!passMatching)
         {

            throw new Apperror('invalid passowrd', StatusCodes.BAD_REQUEST);

         }

         const jwt = Auth.createToken({id: user.id, email: user.email});
         return jwt;
          



        
    } catch (error) {

        if(error instanceof Apperror) throw error;

        console.log(error);
 
        throw new Apperror('somethong went wrong from service',StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}



async function isAuthenticated(token)
{
    try {
        if(!token)
        {

            throw new Apperror('missing jwt token',StatusCodes.BAD_REQUEST);

        }

        const respone = Auth.verifyToken(token);
        const user = await userRepo.get(respone.id);
        if(!user)
        {
            throw new Apperror('No user found ',StatusCodes.NOT_FOUND);

        }

        return user.id;

        
    } catch (error) {

        if(error instanceof Apperror) throw error;



        if(error.name == 'JsonWebTokenError')
        {
            throw new Apperror('inVAlid jwt Token',StatusCodes.BAD_REQUEST);

        }

        console.log(error);
        throw new Apperror('something went wrong',StatusCodes.BAD_REQUEST);

    
    

        
        
    }
}






module.exports = {
    createUser, 
    signIn,
    isAuthenticated
}
