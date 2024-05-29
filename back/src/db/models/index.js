const db = require('../index')
const {DataTypes} = require('sequelize')

const id = {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true}

const User = db.define('User', {
    id,
    name: {type: DataTypes.STRING},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Book = db.define('Book', {
    id,
    name: {type: DataTypes.STRING},
    desc: {type: DataTypes.TEXT},
    pdfPath: {type: DataTypes.STRING},
    readCount: {type: DataTypes.INTEGER, defaultValue: 0},
    author: {type: DataTypes.STRING},
    publishingHouse: {type: DataTypes.STRING},
    series: {type: DataTypes.STRING},
    isPublished: {type: DataTypes.BOOLEAN, defaultValue: false}
})

const Genre = db.define('Genre', {
    id,
    name: {type: DataTypes.STRING},
    desc: {type: DataTypes.TEXT}
})

const Review = db.define('Review', {
    id,
    name: {type: DataTypes.STRING},
    desc: {type: DataTypes.STRING},
    stars: {type: DataTypes.INTEGER}
})

const BookReview = db.define('Book_Review', {
    id,
})

const Bookmark = db.define('Bookmark', {
    id,
    page: {type: DataTypes.INTEGER}
})

const ReadStat = db.define('ReadStat', {
    id,
})


User.hasMany(Review)
Review.belongsTo(User)

Genre.hasMany(Book)
Book.belongsTo(Genre)

Book.belongsToMany(Review, {through: BookReview })
Review.belongsToMany(Book, {through: BookReview })

Book.belongsToMany(User, {through: Bookmark})
User.belongsToMany(Book, {through: Bookmark})

Book.belongsToMany(User, {through: ReadStat})
User.belongsToMany(Book, {through: ReadStat})

module.exports = {User, Book, Genre, BookReview, Review, Bookmark, ReadStat}