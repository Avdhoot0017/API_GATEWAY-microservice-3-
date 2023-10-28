const { UserRepository } = require('../repository');
const { StatusCodes } = require('http-status-codes');


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


module.exports = {
    createUser
}
