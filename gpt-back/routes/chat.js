import express from 'express'
import ThreadModel from '../models/Thread.Model.js'
import { getOpenAiApiResponse } from '../utils/openai.js'


const chatRouter=express.Router() 


// tes route with sample chat data 
chatRouter.post("/test",async(req,res)=>{

    try{    
         const thread=new ThreadModel({
            threaId:'12344',
            title:'testing wiht some sample chats'
         })

         const response=await thread.save() 
         res.send(response)

    }catch(err){
            console.log(err)
            res.status(500).json({error:'failed to save in db '})
    }
})

chatRouter.get("/thread",async(req ,res)=>{
    try{
        const threads=await ThreadModel.find({})
        // descending order of updatedAt ... most recent data on top 
        res.json(threads)

    }catch(err){
        console.log(err)
        res.status(500).json({error:"failed to fetch chats"})
    }
})


chatRouter.get("/thread/:threadId",async(req,res)=>{
    try{

        const {threadId}=req.params 
        const thread=await ThreadModel.findById(threadId)

        if(!threadId){
            res.status(404).json({error:'thread not found'})
        }

        res.json(thread.messages)
    }catch(err){
        console.log(err)
        res.status(500).json({error:'failed to fetch the chat'})
    }
})


chatRouter.delete("/thread/:threadId",async(req,res)=>{

    const {threadId}=req.params 
    try{
        const deletedThread=await ThreadModel.findByIdAndDelete(threadId)

        if(!deletedThread){
            res.status(404).json({})
        }

        res.status(200).json({succes:true,output:'thread deleted successfully',deletedThread})
        
    }catch(err){
        console.log(err)
        res.status(500).json({error:'failed to delete thread '})
    }
})

chatRouter.post('/chat',async(req,res)=>{

    const {threadId,message}=req.body ;

    if(!threadId || !message){
        res.status(404).json({error:'missing required fields'})
    }

    try{
        const thread=await ThreadModel.findOne(threadId)

        if(!thread){
            // create a new thread and store in db 
            thread=new ThreadModel({
                threadId,
                title:message,
                messages:[{
                    role:'user',content:message 
                }]
            })
        }else{
            thread.messages.push({role:"user",content:message})
        }

        const assistantreply=await getOpenAiApiResponse(message)

        thread.messages.push({role:"assistant",content:assistantreply})
        thread.updatedAt=new Date() 

        await thread.save() 
        res.json({reply:assistantreply})
    }catch(err){
        console.log('cannot get data for the chat')
        res.status(500).json({error:'not able to get fetch this chat  something went wrong'})

    }
})

export default chatRouter