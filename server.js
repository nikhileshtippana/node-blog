const express = require('express')
const mongoose = require('mongoose')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

const MONGO_USER = process.env.MONGO_USER
const MONGO_PASS = process.env.MONGO_PASS
const MONGO_URL = process.env.MONGO_URL
let DB_URL = 'mongodb://localhost:27017/blog'

if (MONGO_USER && MONGO_PASS && MONGO_URL ) {
    DB_URL = `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_URL}`
}
mongoose.connect(DB_URL).catch(err => { console.error(err) })

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

// Routers
app.use('/articles', articleRouter)

app.get('/', async (req, res) => {
    res.redirect('/articles')
})

app.get('/status', async (req, res) => {
    if (mongoose.connection.readyState === 1) {
        res.send('UP')
    } else {
        res.status(503).send()
    }
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => { console.log(`Listening on port ${PORT}`) })