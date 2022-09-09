import express  from "express";
import { verifyToken }  from "../middleware/auth.js";
import Categories from "../models/Categories.js";


const router = express.Router()

// create category

router.post('/', verifyToken, async(req, res)=>{
    try {
        const {name, imagePath}=req.body

        // check if fields are not empty
        if(!name || !imagePath){
            return    res.status(400).json({
                error:true,
                message:"All Fields are required..."
            })
        }
        

        //check if category already exist
        const category = await Categories.findOne({name})
        // console.log(category)
        if(category){
        return    res.status(400).json({
                error:true,
                message:"Category already exist"
            })
        }

        const mCategory = Categories({
            name:name,
            imagePath:imagePath

        })

        await mCategory.save()
        // success 
        res.status(200).json({
            success:true,
            message:"Category added successful",
            data:mCategory
        })

    } catch (error) {
        res.status(500).json({
            error :true,
            message:`An error occured: ${error}`

        })
    }
})

// fetch category by id
router.get('/:categoryId', verifyToken, async(req, res)=>{
    try {

        const category = await Categories.findById(req.params.categoryId)
        // console.log(category)
        if (category == null) {
            return  res.send({
                error:true,
                message:"Store does not exist",
                data:category
        
            })
          }
          res.send({
            success:true,
            message:"Successful",
            data:category
    
        })

        
    } catch (error) {
        res.status(500).json({
            error :true,
            message:`An error occured: ${error}`

        })
    }
})

// fetch all categories
router.get('/', verifyToken, async (req, res)=>{
    try{

        const categories = await Categories.find();
       
        res.send({
            success:true,
            message:"Successful",
            data:categories

        })
       
    }catch(err){
        res.send({
            error:true,
            message:"An error occur"
        });
    }
 
});

// delete category by id

router.delete('/:categoryId', verifyToken, async (res, req)=>{
    const result = await Categories.remove({_id:req.params.categoryId})
    res.status(200).send({
        success:true,
        message:"Category deleted successful"
    })
})

// update category by id



export default router