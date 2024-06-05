const path = require("path")
const { Genre, Book } = require("../db/models")
const { getPagination } = require("../utils/pagination")
const fs = require('fs')

const PATH_STATIC = path.join(__dirname, '..', '..', 'static')

module.exports = new class GenreController{
    async list(req,res){
        const {limit, offset} = getPagination(req)
        const data = await Genre.findAndCountAll({limit, offset})

        return res.json(data)
    }
    
    async getById(req,res){
        const { id} = req.params
        const data = await Genre.findOne({where: {id}})

        if(!data){
            return res.status(400).json({message: "NOT_FOUND"})
        }

        return res.json(data)
    }

    getPreviewById(req,res){
        const {id} = req.params
        const fullPath = path.join(__dirname, '..', '..', 'static', 'genre-previews', `${id}.jpg`)

        const file = fs.readFileSync(fullPath, 'utf-8')
        if(!file){
            return res.status(404).json({message: "NOT_FOUND"})
        }
        return res.sendFile(fullPath)
    }

    async create(req,res){
        try{
            const {name, desc} = req.body
            const {preview} = req.files
    
            if(!name || !desc || !preview && !(preview.mimetype === "image/jpeg" || preview.mimetype === "image/jpg")){
                throw new Error('CHOOSE_FIELDS')
            }

            const result = await Genre.create({name, desc})
            preview.mv(path.join(PATH_STATIC, 'genre-previews', `${result.id}.jpg`))
            return res.json(result)
        }catch(err){
            return res.status(400).json(err.message)
        }
    }

    async remove(req,res){
        try{
            const {id} = req.params

            await Genre.destroy({where: {id}})
            await Book.destroy({where: {GenreId: id}})

            try{
                const file = fs.readFileSync(path.join(PATH_STATIC, 'genre-previews', `${id}.jpg`), 'utf-8')
                if(file){
                    fs.unlinkSync(path.join(PATH_STATIC, 'genre-previews', `${id}.jpg`))
                }
            }catch(err){
                console.error(err)
            }

            return res.json({message: "DELETED"})
        }catch(err){
            console.error(err)
            return res.status(400).json(err.message)
        }
    }
    
    async update(req,res){
        try{
            const {id} = req.params
            const {name, desc} = req.body
            const {preview} = req.files

            await Genre.update({name, desc}, {where: {id}})

            try{
                if(preview && (preview.mimetype === "image/jpeg" || preview.mimetype === "image/jpg")){
                    const file = fs.readFileSync(path.join(PATH_STATIC, 'genre-previews', `${id}.jpg`), 'utf-8')
                    if(file){
                        fs.unlinkSync(path.join(PATH_STATIC, 'genre-previews', `${id}.jpg`))
                    }
                    preview.mv(path.join(PATH_STATIC, 'genre-previews', `${id}.jpg`))
                }
            }catch(err){
                return res.status(400).json({message: "UPDATED_WITHOUT_PREVIEW"})
            }

            return res.json({message: "UPDATED"})
        }catch(err){
            return res.status(400).json(err.message)
        }
    }
}