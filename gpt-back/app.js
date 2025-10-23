// using apis endpoints from openai 
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import chatRouter from './routes/chat.js'

const app=express() 

const openAi_Api_key='hellow rold '
const MONGO_URI='mongodb+srv://kavyakapoor413:oreokapoor@cluster01.4zpagwq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster01'


app.use(cors("*"))
app.use(express.json())  // parse incoming request 

const connectDb=async()=>{
    try{
        await mongoose.connect(MONGO_URI)
        console.log("connected with database ")
    }catch(err){
        console.log("error connecting in mongo database",err)
    }
}


app.post("/test",async(req,res)=>{

    const options={
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer ${openAi_Api_key}`
        },
        body:JSON.stringify({
            model:"gpt-4o-mini",
            messages:[{
                role:"user",
                content:req.body.message 
            }]
        })
    }

    try{

         const response=await fetch("https://api.openai.com/v1/chat/completions",options)
         const data=await response.json() 

         const replyFromApi=data.choices[0].message.content
         
         console.log(replyFromApi)

         res.send(data)
    }catch(err){
        console.log(err)

    }
})

app.use('/api/chats',chatRouter)

app.listen(3000,()=>{
    connectDb() 
    console.log("server is liseting on port 3000")
})


//using model of openai 

import OpenAi from 'openai'
import { model } from 'mongoose'
import chatRouter from './routes/chat'

const client=new OpenAi({
    apiKey:'hellow rodl'
})


const response=await client.responses.create({
    model:"gpt-4o-mini",
    instructions:"u r coding assistant that talks like a pirate",
    input:"are semicolon optional in javascript"
})

console.log(response.output_text)