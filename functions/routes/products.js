import express  from "express";
import Product from "../models/Product.js";
import Stores from "../models/Stores.js";
import { verifyToken }  from "../middleware/auth.js";

const router = express.Router()

// create product

router.post('/', verifyToken, async(req, res)=>{
    try {

     const {name,price, colors, sizes, description, subCategoryId, storeId, unit, images } = req.body
    //  console.log(req.body)

    if(!name || !price || !colors || !sizes || !description || !subCategoryId || !storeId || !unit || !images){
        return  res.status(404).json({
            error:true,
            message:"All field are required..."
        })
    }

    // check if store is activated
    const store = await Stores.findById({_id:storeId})
    console.log(store.status)
    // if (store.status=="Inactive") {
    //     return  res.status(404).json({
    //         error:true,
    //         message:" Store is not yet activated..."
    //     })
    // }

    const product = Product({
        name:name,
        price:price,
        sizes:sizes,
        colors:colors,
        images:images,
        unit:unit,
        storeId:storeId,
        subCategoryId:subCategoryId,
        description:description
    })

    await product.save().then(()=>{
         //success
    res.status(200).json({
        success:true,
        message:"Product added successful",
        data:product
    })
    })
        
    } catch (error) {
        res.status(500).json({
            error :true,
            message:`An error occured: ${error}`

        })
    }
    


})

// fetch product by id
router.get('/:productId', verifyToken, async(req, res)=>{
    try {
        const product = await Product.findById(req.params.productId)
        if(product ==null){
            return res.status(404).send({
                error:true,
                message:"Product doesnot exist"
            })
        }
        res.status(200).send({
            success:true,
            message:"Successful",
            data:product
        })
        
    } catch (error) {
        res.status(500).json({
            error :true,
            message:`An error occured: ${error}`

        })
    }
} )

// fetch product by subCategoryId 
router.get('/subCategories/:subCategoryId', verifyToken, async(req, res)=>{
    try {
       
        const subCatProduct = await Product.find({subCategoryId:req.params.subCategoryId})
        if(subCatProduct.length==0){
            return res.status(404).json({
                error:true,
                message:"Product does not exist"
            })
        }
        res.status(200).json({
            success:true,
            message:"Successful",
            data:subCatProduct
        })
        
    } catch (error) {
        res.status(500).json({
            error :true,
            message:`An error occured: ${error}`

        })
    }
})

// fetch product by storeId
router.get('/stores/:storeId?', verifyToken, async(req, res)=>{
    try {

        const searchParams = req.body.subCategoryId
        // console.log(searchParams)

        const storeProduct = await Product.find({storeId:req.params.storeId, subCategoryId:req.body.subCategoryId})
        console.log(storeProduct)
        if(storeProduct.length==0){
            return res.status(404).json({
                error:true,
                message:"Product does not exist"
            })
        }

        res.status(200).json({
            success:true,
            message:"Successful",
            data:storeProduct
        })
 


    } catch (error) {
        
    }
 
})


// delete product by id
router.delete('/:productId', verifyToken, async(req, res)=>{
    try {
        await Product.remove(req.params.productId).then(()=>{
            res.status(200).send({
                success:true,
                message:"Deleted Successful"
            })
        })
        
    } catch (error) {
        res.status(500).json({
            error :true,
            message:`An error occured: ${error}`

        })
    }
})

// update product
router.patch('/:productId', verifyToken, async(req, res)=>{
    try {
         const data=await Product.updateOne({_id:req.params.productId, set},{$set:{
            price:req.body.price,
            unit:req.body.unit,
    

        }}).then(()=>{
            res.status(200).json({
                success:true,
                message:"Successful",
                data:data
            })
        })
    } catch (error) {
        res.status(500).json({
            error :true,
            message:`An error occured: ${error}`

        })
    }
})




export default router