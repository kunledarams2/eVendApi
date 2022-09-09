import express from "express";
import User from "../models/Users.js";
import {hashPassword} from "../models/Users.js"
import bcrypt from "bcryptjs"
import Jwt  from "jsonwebtoken";
import  'dotenv/config'
import { generateJwt } from "../utli/helper.js";


const router = express.Router()

router.post('/', async (req, res)=>{

    try {

     const{email, password}= req.body

    // check if req body is empty
    if (!email || !password) {
     return   res.status(400).json({
            error: true,
            message: "Email or Password cannot be empty"
        })
    }

    // check user with email exist 
    const user =  await User.findOne({emailAddress:email})
   
    // verify if password is valid
 
    const isValidPassword = await bcrypt.compare(password, user.password)
    // console.log(`password ${password} => ${user.password} ${isValidPassword} `)
    if (user && isValidPassword) {
        
        
        // create token

        const {error, token} = await generateJwt(email, user._id,)
        if(error){
            return res.status(500).json({
                error:true,
                message:"Couldn't create access token. Please try again later"
            })
        }
      
        user.token = token
        await user.save()

        // Successful
        res.status(200).json({
            success :true,
            message: "Login successful",
            data:user
        })
    }else{
        res.status(400).json({
            error:true,
            message:"Invalid credentials"
        })
    }

        
    } catch (error) {
        res.status(500).json({
            error:true,
            message:"An error occur"
        })
    }
    


})

router.patch('/forgot_password', async(req, res)=>{

})

router.patch('/reset_password', async(req, res)=>{

})

export default router