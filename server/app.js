const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const { API_VERSION } = require('./config')

//Load routings
const userRoutes = require('./routes/user')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) //para que lo encode en .json

//Configure Header HTTP
//...

//Routes basic
app.use(`/api/${API_VERSION}`, userRoutes)

module.exports = app
