const crudRepository = require('./crud-Repo');
const { User } = require('../models')

class userRepository extends crudRepository{

    constructor()
    {
        super(User);

    }


    async  getuserByEmail(email)
    {
        const user = await User.findOne({where: {email: email}});
        return user;

    }


}

module.exports = userRepository;