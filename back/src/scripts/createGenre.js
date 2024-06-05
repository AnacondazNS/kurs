const { Genre } = require("../db/models")

module.exports = async ({name, desc}) => {
    await Genre.create({name, desc})
}