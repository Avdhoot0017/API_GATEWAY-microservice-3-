const { UserRepository } = require('../repository');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');
const { Auth }  = require('../utils/common')


const  Apperror   = require('../utils/errors/app-error')

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






module.exports = {
    createUser, 
    signIn
}
