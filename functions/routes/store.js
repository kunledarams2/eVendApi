
import express  from "express";
import  Jwt from "jsonwebtoken";
import Stores from "../models/Stores.js";
import User from "../models/Users.js";
import { hashPassword } from "../models/Users.js";
import 'dotenv/config'
import { verifyToken } from "../middleware/auth.js";




const router = express.Router()

// create store

router.post('/', async(req, res)=>{

    try {
        const {email, password, name, address, phoneNumber}= req.body

    if (!email || !password || !name || !address || !phoneNumber) {
        return res.status(404).json({
            error:true,
            message:'All fields are required...'
        })
        
    }
  
    // check if store already exist
     const mStore = await Stores.findOne({email:email})
     if(mStore){
        return res.status(404).json({
            error:true,
            message:'Store Already Exist..'
        })
     }

    const store = await Stores({
        email:email,
        address:address,
        phoneNumber:phoneNumber
        
    })
 

      // generate session token
      const token = Jwt.sign({
        userId: store._id, email
    }, process.env.TOKEN_KEY,{
        expiresIn:"2h"
    })

    store.password = await hashPassword(password)
    store.token = token
    console.log(store)

    await store.save()
    res.status(200).json({
        success : true,
        message:"Store Created Successful",
        data:store,
    })

        
    } catch (error) {
        res.status(500).json({
            error:true,
            message:"An error occured",

        })
    }

    

})

// get  single store
router.get('/:storeId', verifyToken, async (req, res)=>{
    try{
      const store = await Stores.findById(req.params.storeId)
   
      if (store == null) {
        return  res.send({
            error:true,
            message:"Store does not exist",
            data:store
    
        })
      }
      res.send({
        success:true,
        message:"Successful",
        data:store

    })

    }catch(err){
        res.send(err)
    }
    

})

// get all stores
router.get('/', async (req, res)=>{
    try{

        const stores = await Stores.find();
       
        res.send({
            success:true,
            message:"Successful",
            data:stores

        })
       
    }catch(err){
        res.send(err);
    }
 
});

export default router

