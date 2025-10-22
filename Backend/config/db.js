const mongoose=require('mongoose')
const dotenv=require('dotenv')

dotenv.config() 

const MONGO_URI = process.env.MONGO_URI;


const connectDb=async ()=>{
    try{
        await mongoose.connect(MONGO_URI)
    }catch(err){
        console.error('mongoodb connection error',err.message)
        process.exit(1)
    }
}

module.exports=connectDb
