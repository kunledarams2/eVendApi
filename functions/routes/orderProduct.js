import express  from "express";
import OrderProduct from "../models/OrderProduct.js";
import Product from "../models/Product.js";
import Users from "../models/Users.js"
import { verifyToken } from "../middleware/auth.js";
import { error } from "../utli/helper.js";


const router = express.Router()

// create Product order

router.post('/', verifyToken, async (req, res)=>{
    try {
        console.log(req.user.userId)
        const{quantity, paymentMethod, deliveryAddress, storeId, productId, sizeSelected, colorSelected, amount}=req.body

        if (!quantity || !paymentMethod || !deliveryAddress || !storeId || !productId ) {
           return res.status(400).json({
            error:true,
            message:"All fields are required..."
           })
        }

        const order = OrderProduct({
            quantity:quantity,
            paymentMethod:paymentMethod,
            deliveryAddress:deliveryAddress,
            storeId:storeId,
            productId:productId,
            userId:req.user.userId,
            sizeSelected:sizeSelected,
            colorSelected:colorSelected,
            amount:amount


        })


       
        await order.save().then(()=>{
            res.status(200).json({
                success:true,
                message:"Successful",
                data:order
            })
        })


    } catch (err) {
        error(res, err)
    }
})

// get order by userId
router.get('/users/orders', verifyToken, async(req, res)=>{

    try {
        const userOrders = await OrderProduct.find({userId:req.user.userId}) 
        const orderProduct =[]
        let price =""
        let amount =0

      for (const data of userOrders) {
        orderProduct.push(await Product.findById({ _id: data.productId }))

        //   for (const data of orderProduct) {
        //      price = data.price
        //      amount = parseInt(price) * parseInt(quantity)
        //   }
        //   console.log(`price: ${price}  amount:${amount}`)

        }
  
        // console.log(orderProduct)
        res.status(200).json({
            success:true,
            message:"Successful",
            data:{
                orders:userOrders,
                products:orderProduct
            }
        })

        
    } catch (err) {
        error(res, err)
    }
})

// get order by storeId
router.get('/stores/orders/', verifyToken, async(req, res)=>{

    try {
        const userOrders = await OrderProduct.find({userId:req.user.userId}) 
        const orderProduct =[]
        let price =""
        let amount =0

      for (const data of userOrders) {
        orderProduct.push(await Product.findById({ _id: data.productId }))

        //   for (const data of orderProduct) {
        //      price = data.price
        //      amount = parseInt(price) * parseInt(quantity)
        //   }
        //   console.log(`price: ${price}  amount:${amount}`)

        }
  
        // console.log(orderProduct)
        res.status(200).json({
            success:true,
            message:"Successful",
            data:{
                orders:userOrders,
                products:orderProduct
            }
        })

        
    } catch (err) {
        error(res, err)
    }
})


export default router