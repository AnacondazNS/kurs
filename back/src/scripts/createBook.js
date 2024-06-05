const { Book } = require("../db/models")

module.exports = async ({name, desc, genre, author, publishingHouse, series}) => {
    await Book.create({name,desc, GenreId: genre.id, author, publishingHouse, series})
}