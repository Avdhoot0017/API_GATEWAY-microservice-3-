const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { serverConfig } = require('../../config')







 function checkPAss(plainPass,encryptedPass)
{

    try {

        return bcrypt.compareSync(plainPass,encryptedPass);
        
    } catch (error) {
        console.log(error);
        throw error;

    }


}


function createToken(input)
{

    try {
        return jwt.sign(input, serverConfig.JWR_SECRET , {expiresIn: serverConfig.JWT_EXPIRY});

        
    } catch (error) {

        console.log(error);
        throw error; 
        
    }


}



module.exports = {

    checkPAss,
    createToken


}