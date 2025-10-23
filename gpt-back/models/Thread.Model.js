import mongoose from 'mongoose'

const messageSchema=new mongoose.Schema({
    role:{
        type:String,
        enum:['user','assitant'],
        required:true 
    },
    content:{
        type:String,
        required:true 
    },
    timestamp:{
        type:Date,
        default:Date.now 
    }
})

const threadSchema=new mongoose.Schema({
    threadId:{
        type:String,
        required:true,
        unique:true 
    },
    title:{
        type:String,
        default:"new chat "
    },
    messages:[messageSchema],
    createdAT:{
        type:Date,
        default:Date.now 
    },
    updatedAt:{
        type:Date,
        default:Date.now 
    }
})

const ThreadModel=mongoose.model("ThreadModel",threadSchema)

export default ThreadModel