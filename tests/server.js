require("dotenv").config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const authRoutes = require("../routes/auth")
const employeeRoutes = require("../routes/employee")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")

mongoose.connect("mongodb://localhost:27017/JestTest", {usenewUrlParser: true})
    .then(
        app.listen(5000,()=>{
            console.log('Server started!')
        })        
    )

app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())
app.use('/api',authRoutes)
app.use('/api',employeeRoutes)

module.exports = app;