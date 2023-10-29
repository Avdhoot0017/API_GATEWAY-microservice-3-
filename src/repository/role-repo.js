const crudRepository = require('./crud-Repo');
const { role } = require('../models')

class RoleRepository extends crudRepository{

    constructor()
    {
        super(role);

    }


    async  getRolebyname(name)
    {
        const role1 = await role.findOne({where: {name: name}});      
        return role1;

    }


}

module.exports = RoleRepository