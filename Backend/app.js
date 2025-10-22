const express=require('express')
const cors=require('cors')
const dotenv=require("dotenv")
const connectDb = require('./config/db')
const itemRouter = require('./routes/itemRoutes')

const app=express() 

dotenv.config() 

connectDb() 

app.use(cors("*"))
app.use(express.json())

app.use('/api/items',itemRouter)


app.listen(3000,()=>{
    console.log("server is listeing on port 3000")
})