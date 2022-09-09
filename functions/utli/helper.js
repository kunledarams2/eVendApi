
import  Jwt  from "jsonwebtoken";
import 'dotenv/config'

export const generateJwt = async(email, userId ) =>{

    try{

        const ntoken = Jwt.sign({
            userId: userId, email
        },"kudakunle783984",{ expiresIn: "5h"})

        // const payload = {id: userId, email}
        // console.log(payload)
        //   token = Jwt.sign(payload,"kudakunle783984", {expiresIn:options
        //     })
           
        return {error:false, token:ntoken}
    }catch(error){
        return {error:true}
    }
}

export const error = async(res, error)=>{
    res.status(500).json({
        error :true,
        message:`An error occured: ${error}`

    })
}

 