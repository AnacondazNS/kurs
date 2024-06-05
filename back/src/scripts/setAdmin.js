const { User } = require("../db/models")

module.exports = async (id) => {
    await User.update( {role: 'ADMIN'}, {where: {id}})
}