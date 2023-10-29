const dotenv = require('dotenv');

dotenv.config();


module.exports = {

    PORT: process.env.PORT,
    SALT_ROUNDS : process.env.SALT_ROUNDS,
    JWT_EXPIRY : process.env.JWT_EXPIRY,
    JWR_SECRET: process.env.JWR_SECRET,
    FLIGHT_SERVICE : process.env.FLIGHT_SERVICE,
    BOOKING_SERVICE : process.env.BOOKING_SERVICE

}