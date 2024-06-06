const path = require("path")
const { Book, Review, Genre, Bookmark } = require("../db/models")
const { getPagination } = require("../utils/pagination")
const fs = require('fs')
const { Op } = require("sequelize")

//Предоставляем путь к статическим файлам веб-приложения

const PATH_STATIC = path.join(__dirname, '..', '..', 'static')

module.exports = new class BookController{
    async list(req,res){
        try{
            const { role} = req.user

            const {ignorePublishStatus} = req.query

            const {limit, offset} = getPagination(req)
            
            const where = {}
            where.isPublished = true

            if(role && role === "ADMIN" && ignorePublishStatus){
                delete where.isPublished
            }
//создаём запрос на список книг и их колличество
            const data = await Book.findAndCountAll({offset, limit, where})
            return res.json(data)
        }catch(err){
            return res.status(400).json(err)
        }
    }
//Извлекаем данные из базы данных и создаём обьект обновления который замещает устаревшие данные
    async unpublishList(req,res){
        try{
            const {limit, offset} = getPagination(req)

            const data = await Book.findAndCountAll({offset, limit, where: {isPublished: false}})
            return res.json(data)
        }catch(err){
            return res.status(400).json(err)
        }
    }

    async update(req,res){
        try{
            const {id} = req.params
            const {name, desc, author, publishingHouse, series, genreId, isPublish} = req.body

            const updObj = {}
            if(name){
                updObj.name = name
            }
            if(desc){
                updObj.desc = desc
            }
            if(author){
                updObj.author = author
            }
            if(publishingHouse){
                updObj.publishingHouse = publishingHouse
            }
            if(series){
                updObj.series = series
            }
            if(genreId){
                updObj.GenreId = genreId
            }
            if(isPublish && (Boolean(isPublish) === false || Boolean(isPublish) === true)){
                updObj.isPublished = isPublish
            }

            const obj = await Book.findOne({where: {id}})
            if(!obj){
                return res.status(404).json({message: "NOT_FOUND"})
            }

            const upd = await Book.update(updObj,{where: {id}})

            if(req.files){
                const {preview, pdf} = req.files

                if(pdf){
                    try{
                        if(pdf && pdf.mimetype === "application/pdf"){
                            fs.unlinkSync(path.join(PATH_STATIC, 'books', `${id}.pdf`))
                            pdf.mv(path.join(PATH_STATIC, 'books', `${id}.pdf`))
                        }
                    }catch(err){
                        console.log(err)
                    }
                }
    
                if(preview){
                    try{
                        if(preview && (preview.mimetype === "image/jpeg") || preview.mimetype === "image/jpg"){
                            fs.unlinkSync(path.join(PATH_STATIC, 'previews', `${id}.jpg`))
                            preview.mv(path.join(PATH_STATIC, 'previews', `${id}.jpg`))
                        }
                    }catch(err){
                        console.log(err)
                    }
                }
            }

            return res.json({message: "UPDATED"})
        }catch(err){
            console.error(err)
            return res.status(400).json(err)
        }
    }

    async getPDFByBookId(req,res){
        try{
            const {id} = req.params
            const userId = req.user.id
            // определяем путь к пдф файлу
            const pathName = path.join(__dirname, '..', '..', 'static', 'books', `${id}.pdf`)
// читает файл пдф

            const file = fs.readFileSync(pathName,'utf-8')
            if(!file){
                return res.status(404).json({message: "NOT_FOUND"})
            }
// счётчик колличества прочтений

            const book = await Book.findOne({where: {id}})
            book.readCount++
            await book.save()

            return res.sendFile(pathName)
        }catch(err){
            return res.status(400).json(err)
        }
    }
//создание книги и проверка на все заполненные поля
    async createBook(req,res,next){
        try{
            const {name, desc, author, publishingHouse, series, genreId, isPublish} = req.body

            const {preview, pdf} = req.files
            
            if(!name || !desc || !author || !publishingHouse || !series || !genreId){
                throw new Error({message: "CHOOSE_FIELDS"})                
            }
            const result = await Book.create({name, desc, author, publishingHouse, series, GenreId: genreId, isPublished: isPublish})
//перемещаем пдф в статику
            try{
                if(pdf && pdf.mimetype === "application/pdf"){
                    pdf.mv(path.join(PATH_STATIC, 'books', `${result.id}.pdf`))
                }
            }catch(err){
                console.log(err)
            }
//перемещаем превью в статику
            try{
                if(preview && (preview.mimetype === "image/jpeg") || preview.mimetype === "image/jpg"){
                    preview.mv(path.join(PATH_STATIC, 'previews', `${result.id}.jpg`))
                }
            }catch(err){
                console.log(err)
            }
            return res.json(result)
        }catch(err){
            console.log(err)
            return res.status(400).json(err)
        }
    }
// удаление книги, после идёт процесс удаления пдф и превью
    async deleteById(req,res){
        try{
            const {id} =  req.params

            await Book.destroy({where: {id}})

            try{
                fs.unlinkSync(path.join(PATH_STATIC, 'books', `${id}.pdf`))
                fs.unlinkSync(path.join(PATH_STATIC, 'previews', `${id}.jpg`))
            }catch(err){
                console.error(err)
            }

            return res.json({message: "DELETED"})

        }catch(err){
            console.log(err)
            return res.status(400).json(err)
        }
    }

    async setBookMark(req,res) {
        try{
            const {id} = req.params
            const {page} = req.body
            const userId = req.user.id


            let bookmark = await Bookmark.findOne({where: {BookId: id, UserId: userId}})
            if(bookmark){
                if(bookmark.page === page){
                    await bookmark.destroy()
                    return res.json({message: "REMOVED"})
                }

                bookmark.page = page
                await bookmark.save()

                return res.json({message: "UPDATED"})
            }

            bookmark = await Bookmark.create({page, BookId: id, UserId: userId})

            return res.json({message: "SETTED"})
        }catch(err){

            return res.status(400).json(err)
        }
    }

    async getBookMark(req,res){
        try{
            const {id} = req.params
            const userId = req.user.id

            const bookmark = await Bookmark.findOne({where: {BookId: id, UserId: userId}})
            if(!bookmark){
                return res.status(404).json({message: "NOT_FOUND"})
            }

            return res.json(bookmark)
        }catch(err){

            return res.status(400).json(err)
        }
    }

    async getByGenreId(req,res){
        try{

            const {id} = req.params
            const {limit, offset} = getPagination(req)

            const data = await Book.findAndCountAll({offset, limit, where: {GenreId: id, isPublished: true}})
            return res.json(data)
        }catch(err){
            return res.status(400).json(err)
        }
    }

    async getById(req,res){
        try{
            const {id} = req.params

            const data = await Book.findOne({
                where: {id},
                include: [
                    {
                        model: Genre,
                        attributes: ['id', 'name', 'desc']
                    }
                ]
            })
            if(!data){
                return res.status(404).json({message: "NOT_FOUND"})
            }
            
            if(!data.dataValues.isPublished){
                return res.status(404).json({message: "NOT_FOUND"})
            }

            const reviews = await Review.findAll({
                include: [{
                    model: Book,
                    where: { id: id },
                }]
            });

            let totalStars = 0;
            let reviewsCount = 0
            reviews.forEach(review => {
                if(review.stars){
                    totalStars += review.stars;
                    reviewsCount++
                }
            });

            return res.json({...data.dataValues, avg_rate: totalStars / reviewsCount})
        }catch(err){
            return res.status(400).json(err)
        }
    }

    async getPopularList(req,res){
        try{
            const {limit, offset} = getPagination(req)
            
            const data = await Book.findAndCountAll({offset, limit, order: [['readCount', 'DESC']], where: {isPublished: true}})
            return res.json(data)
        }catch(err){
            return res.status(400).json(err)
        }
    }

    getPreviewById(req,res){
        const { id } = req.params

        const fullPath = path.join(__dirname, '..', '..', 'static', 'previews', `${id}.jpg`)

        const file = fs.readFileSync(fullPath, 'utf-8')
        if(!file){
            return res.status(404).json({message: "NOT_FOUND"})
        }
        return res.sendFile(fullPath)
    }

    async search(req,res){
        try{
            const {name} = req.query

            const genres = await Genre.findAll({where: {name: {[Op.like]: `%${name}%`}}, limit: 10})
            const books = await Book.findAll({where: {name: {[Op.like]: `%${name}%`}, isPublished: true}, limit: 10})

            const mapped = genres.map(item => ({id: item.id, name: item.name, type: "genre"}))
            mapped.push(...books.map(item => ({id: item.id, name: item.name, type: "book"})))
    
            return res.json(mapped)
        }catch(err){
            console.error(err)
            return res.status(400).json(err)
        }
    }
}