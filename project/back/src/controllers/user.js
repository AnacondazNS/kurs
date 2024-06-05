const { User } = require('../db/models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = new class UserController{

    generateToken(id, name, email, role){
        return jwt.sign({id, name ,email, role}, process.env.SECRET_KEY, {expiresIn: '24h'})
    }

    async me(req,res){
        try{
            const {id: userId} = req.user
            const {id, name, email, createdAt, role} = await User.findOne({where: {id: userId}})
            return res.json({id, name, email, createdAt, role})
        }catch(err){
            return res.status(400).json(err)
        }
    }

    async login(req,res){
        try{

        const {email, password} = req.body
        
        const hasUser = await User.findOne({where: {email}})
        if(!hasUser){
            return res.status(400).json({message: "USER_NOT_FOUND"})
        }

        const isCorrect = bcrypt.compareSync(password,hasUser.password)
        if(!isCorrect){
            return res.status(400).json({message: "INVALID_PASSWORD"})
        }

        const token = this.generateToken(hasUser.id, hasUser.name, email, hasUser.role)

        return res.json({token})
    }catch(err){
        console.log(err)
        return res.status(400).json(err)
    }
    }

    async register(req,res){
        try{
            const {name, email, password} = req.body
            const hasUser = await User.findOne({where: {email}})
            if(hasUser){
                return res.status(400).json({message: "USER_EXISTS_WITH_EMAIL"})
            }
            const hashedPass = bcrypt.hashSync(password, 5)
            await User.create({name, email, password: hashedPass})
            return res.json({message: "REGISTERED"})
        }catch(err){
            return res.status(400).json(err)
        }
    }

    async check(req,res) {
        try{
            const {id, name, email, role} = req.user
            return res.json({token: this.generateToken(id, name, email, role)})
        }catch(err){
            return res.status(400).json(err)
        }
    }
}