require('dotenv').config()
const express = require('express')
const cors = require('cors')
const db = require('./src/db')
const models = require('./src/db/models')
const router  = require('./src/routes')
const uploader = require('express-fileupload')

// SCRIPTS

const createGenre = require('./src/scripts/createGenre')
const createBook = require('./src/scripts/createBook')
const setAdmin = require('./src/scripts/setAdmin')
const createDefaultAdmin = require('./src/scripts/createDefaultAdmin')
// SCRIPTS

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use(uploader())
app.use('/api', router)


const start = async () => {
    try{
        await db.sync()
        await createDefaultAdmin()
        app.listen(PORT, () => console.log(`Server started on ${PORT} port`))
    }catch(err){
        console.error(err)
    }
}

start()




