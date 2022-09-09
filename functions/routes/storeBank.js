import express  from "express";
import { verifyToken } from "../middleware/auth.js";
import StoreBank from "../models/StoreBank.js";
import { error } from "../utli/helper.js";

const router = express.Router()

// create bank by store

router.post('/', verifyToken, async (req, res)=>{
    try {
        const{bankName, bankAccount, bankBVN}=req.body

        if (!bankName || !bankAccount || !bankBVN) {
         return  res.status(400).json({
            error:true,
            message:"All Fields  Are Required... "
           }) 
        }

        const storeBank = StoreBank({
            bankName:bankName,
            bankAccount:bankAccount,
            bankBVN:bankBVN,

        })
        await storeBank.save().then(()=>{
            res.status(200).json({
                success:true,
                message:"Successful",

            })
        })
        
    } catch (err) {
        error(res, err)
    }
})

// get all banks
router.get('/', verifyToken, async(req, res)=>{
    try {
        const data=  await StoreBank.find().then(()=>{
            res.status(200).json({
                success:true,
                message:"Successful",
                data:data
    
            })
        })
        
    } catch (err) {
        error(res,err )
    }

 
})

// get bank by storeId
router.get('/stores/:storeId', verifyToken, async(req, res)=>{

    try {

        const storeBank = await StoreBank.findOne({storeId:req.params.storeId}).then(()=>{
            res.status(200).json({
                success:true,
                message:"Successful",
                data:storeBank
            })
        })
        
    } catch (error) {
        error(res,err )
    }
   
})

// update bankdetail by storeId
router.patch('/stores/banks/:storeId', verifyToken, async(req, res)=>{
    try {
        const{bankName, bankAccount}=req.body
        await StoreBank.updateOne({storeId:req.params.storeId}, {$set:{
            bankName:bankName,
            bankAccount:bankAccount
        }}).then(()=>{
            res.status(200).send({
                success:true,
                message:"Update Successful"
            })
        })
        
    } catch (err) {
        error(res, err)
    }
    
})

// delete bank 
router.delete('/delete/:storeBankId', verifyToken, async(req, res)=>{
    try {
        await StoreBank.remove({_id:req.params.storeBankId}).then(()=>{
            res.status(200).json({
                success:true,
                message:"Store Bank deleted successful..."
            })
        })
    } catch (err) {
        error(res, err)
    }
})

export default router