const express=require('express')
const dotenv=require('dotenv')
const morgan=require('morgan')
const bodyparser=require('body-parser')
const path=require('path')
const connectDB = require('./server/database/connection')

const app=express()

dotenv.config({path:'config.env'})
const PORT = process.env.PORT||8080

//printing log requests using morgan
app.use(morgan(`tiny`))

connectDB()

//parse requerst to body parser
app.use(bodyparser.urlencoded({extended:true}))

//set view engine
app.set("view engine","ejs")

//LOADING ASSETS    //INCASE IF WE CREAT AN FOLDER INSIDE THE VIEW FOLDER: app.set("views",path.resolve(__dirname,"views/ejs");)
app.use('/css', express.static(path.resolve(__dirname,"assets/css")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))

//HEAR WE LOAD THE ROUTERS
app.use('/', require('./server/routes/router'))

app.listen(PORT, ()=>{console.log(`Server is running on http://localhost:${PORT}`)})