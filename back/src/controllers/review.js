const { Review, Book, User, BookReview } = require("../db/models")
const { getPagination } = require("../utils/pagination")

module.exports = new class ReviewController{
    async getByBookId(req,res){
        const { id } = req.params
        const {limit, offset} = getPagination(req)

        const data = await Review.findAndCountAll({
            include: [{
                model: Book,
                where: { id: id },
            }, {
                model: User,
            }],
            limit, 
            offset
        })

        const count = data.count
        const rows = data.rows.map(item => ({
            id: item.dataValues.id, 
            name: item.dataValues.name, 
            desc: item.dataValues.desc, 
            stars: item.dataValues.stars,
            user: {
                id: item.User.id,
                name: item.User.name
            },
        }))

        return res.json({count, rows})

    }

    async add(req,res){
        const UserId = req.user.id
        const {id} = req.params
        const {name, desc, stars} = req.body
        
        const data = await Review.create({name ,desc, stars, UserId})
        const link = await BookReview.create({ReviewId: data.dataValues.id, BookId: id})

        return res.json({message: "REVIEW ADDED"})
    }

    async delete(req,res){
        const role = req.user.role
        const {id} = req.params

        if(role !== "ADMIN"){
            return res.status(401).json({message: "ACCESS_DENIDED"})
        }
        await Review.destroy({where: {id}})
        
        return res.json({message: "REMOVED"})
    }
}