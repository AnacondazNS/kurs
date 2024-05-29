const { User } = require("../db/models")
const bcrypt = require('bcrypt')

module.exports = async () => {
    const hasUser = await User.findOne({where: {email:"admin"}})
    if(hasUser){
        return false
    }

    const hash = bcrypt.hashSync('Admin123', 5)
    const user = await User.create({name: "admin", email:"admin", password: hash, role: "ADMIN"})
    return user
}