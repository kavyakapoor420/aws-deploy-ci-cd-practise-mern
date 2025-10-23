

export const getOpenAiApiResponse=async(message)=>{
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
                //content:req.body.message 
                content:message
            }]
        })
    }

    try{

         const response=await fetch("https://api.openai.com/v1/chat/completions",options)
         const data=await response.json() 

         const replyFromApi=data.choices[0].message.content
         
         console.log(replyFromApi)

         return replyFromApi 
    }catch(err){
        console.log(err)

    }
}