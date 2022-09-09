import express, { json } from "express";
import { v4 as uuidv4 } from 'uuid';
import UserModels  from '../models/Users.js';
import { hashPassword } from "../models/Users.js";
import bcrypt from "bcryptjs";
import Jwt  from "jsonwebtoken";
import { UUID } from "bson";


// const UserModels = require('../models/Users');


const router = express.Router();

// router.use((req, res, next)=>{
//     console.log('Time: ', Date.now())
//     next()
// })

// const users = [
//     {
//     firstName :"John",
//     lastName :"Ola",
//     age : 10
// }
// ]

// Get All User
router.get('/', async (req, res)=>{
    try{
        console.log(UserModels)
        const users = await UserModels.find();
       
        res.send({
            success:true,
            message:"Successful",
            data:users

        })
       
    }catch(err){
        res.send(err);
    }
 
});

// Get single user
router.get('/:userId', async (req, res)=>{
    try{
      const user = await UserModels.findById(req.params.userId)
      console.log(user)
      if (user == null) {
        return  res.send({
            error:true,
            message:"User does not exist",
            data:user
    
        })
      }
      res.send({
        success:true,
        message:"Successful",
        data:user

    })

    }catch(err){
        res.send(err)
    }
    

})

// delete single user 
router.delete('/:userId', async (req, res)=>{
    try {
        const result = await UserModels.remove({_id: req.params.userId})
        res.json({
            success:true,
            message:"User deleted successful"
        })
    } catch (err) {
        res.send(err)
    }

})

// update single user

router.patch('/:userId', async (req, res)=>{
    try {
        const result = await UserModels.updateOne({_id:req.params.userId}, {$set:{
            emailAddress:req.body.emailAddress,
            phoneNumber:req.body.phoneNumber}})
        
            res.status(200).json({
                success: true,
                message : "Updated successful"
            })
        
        
    } catch (err) {

        res.status(500).json({
            error :true,
            message:"An error occured."

        })
    }
})

// reset password
router.put('/:userId/password', async(req, res)=>{

    try {
        const{newPassword, currentPassword} = req.body
        console.log("update password ......", req.params.userId)
        // find the user 
        const userOne = UserModels.find((c=> c.userId == parseInt(req.params.userId)))
        // const user = UserModels.findOne({_id:req.params.userId})
        console.log(userOne)
        // res.send(userOne)
       
        // if(user.size.length ==0){
        //  return res.status(409).send("User not found...")
        // }

        // const result = UserModels.updateOne({_id:req.params.userId}, {$set:{password:newPassword}})
        // res.json(result)

     
        // res.send("UpdatePassword") 
    } catch (error) {
        
    }
    
})

// create user
router.post('/', async(req, res)=>{


    try {

        const{ firstName, lastName, phoneNumber, emailAddress, password} = req.body

        // check all required fields are not empty
        if(!(firstName, lastName, phoneNumber,emailAddress, password)){
          return  res.status(400).send('All fields are required... ')
        }

        

        // check if user already exist
        const userExist = await UserModels.findOne({emailAddress})
        if(userExist){
          return  res.status(409).json({
            error:true,
            message: "User with this email already exist"
          })
        };
    
        // Encrypt user password
        const mpassword = await hashPassword(password)
    
        const user = new UserModels({
            firstName,
            lastName,
            phoneNumber, 
            emailAddress,

        });
    
        // create token
        const token = Jwt.sign({userId: user._id, emailAddress},
            "kudakunle783984", {
                expiresIn:"2h"
            }
            )
    
            // save user token
            user.token = token
            user.userId = uuidv4()
            user.password = mpassword

        const saveUser = await user.save();
        res.status(200).json({
            success:true,
            message:"Registration Success",
            data:user

        })
    } catch(err){
        res.status(500).json({
            error:true,
            message:"Registration failed"
        })
    }
 
});



export default router;