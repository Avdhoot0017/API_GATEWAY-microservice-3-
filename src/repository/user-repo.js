const crudRepository = require('./crud-Repo');
const { User } = require('../models')

class userRepository extends crudRepository{

    constructor()
    {
        super(User);

    }


}

module.exports = userRepository;