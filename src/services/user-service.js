const { UserRepository, roleRepository } = require('../repository');
const { StatusCodes } = require('http-status-codes');
const bcrypt = require('bcrypt');
const { Auth, Enums }  = require('../utils/common');
const { ADMIN,CUSTOMER,FLIGHT_COMPANY } = Enums.USERS_ROLES;


const  Apperror   = require('../utils/errors/app-error');
const { application } = require('express');

const userRepo = new UserRepository();
const RoleRepo = new roleRepository();


async function createUser(data)
{

    try {
        const user = await userRepo.create(data);
        const role = await RoleRepo.getRolebyname(CUSTOMER);
        user.addRole(role);


    
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


async function addRoletoUser(data)
{
    try {

        const user = await userRepo.get(data.id);

        if(!user)
        {
            throw new Apperror('not user found for given ID', StatusCodes.BAD_REQUEST);

        }

        const role = await RoleRepo.getRolebyname(data.role);

        if(!role)
        {
            throw new Apperror('not role found for given name', StatusCodes.BAD_REQUEST);

        }

        user.addRole(role);
        return user;

        
    } catch (error) {

        if(error instanceof Apperror) throw error;

        console.log(error);
 
        throw new Apperror('somethong went wrong from service',StatusCodes.INTERNAL_SERVER_ERROR);
        
    }
}

async function isadmin(id)
{

    try {

        const user = await userRepo.get(id);

        if(!user)
        {
            throw new Apperror('not user found for given ID', StatusCodes.BAD_REQUEST);

        }

        const adminrole = await RoleRepo.getRolebyname(ADMIN);

        if(!adminrole)
        {
            throw new Apperror('not role found for given name', StatusCodes.BAD_REQUEST);

        }


        return user.hasRole(adminrole);


        
    } catch (error) {

        if(error instanceof Apperror) throw error;

        console.log(error);
 
        throw new Apperror('somethong went wrong from service',StatusCodes.INTERNAL_SERVER_ERROR);
        
    }


}






module.exports = {
    createUser, 
    signIn,
    isAuthenticated,
    addRoletoUser ,
    isadmin
}
