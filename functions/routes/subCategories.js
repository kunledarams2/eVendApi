import express  from "express";
import SubCategories from "../models/SubCategories.js";
import { verifyToken }  from "../middleware/auth.js";
import Categories from "../models/Categories.js";

const router = express.Router()

// create sub-categories
router.post("/", verifyToken, async(req, res)=>{
    try {
        const {name,imagePath, categoryId}= req.body
        if(!name || !categoryId){
        return    res.status(404).json({
                error:true,
                message:"All field are required..."
            })
        }

        // check if subCategory already exist

        const nameSubCat = await SubCategories.findOne({name})
        if(nameSubCat){
            return res.status(404).json({
                error:true,
                message:"Category already exist..."
            })
        } 

        // check if the category id exist
        const category =  await Categories.findById({_id:categoryId})
        if(category == null){
            return res.status(404).json({
                error:true,
                message:"Category does not exist..."
            })
        }
        // console.log(category)

        const subCat = SubCategories({
            name:name,
            imagePath:imagePath,
            categoryId:categoryId
        })

        await subCat.save().then(()=>{
            res.status(200).json({
                success :true,
                message:"Sub-Category added succcessful",
                data:subCat
            })
        })
    // success
   

    } catch (error) {
        res.status(500).json({
            error :true,
            message:"An error occured."

        })
    }
})

// fetch all sub-categories
router.get('/', verifyToken, async(req, res)=>{
    try {
        const subCat = await SubCategories.find()
        res.status(200).json({
            success:true,
            message:'Successful',
            data:subCat
        })
    } catch (error) {
        res.status(500).json({
            error :true,
            message:`An error occured: ${error}`

        })
    }
})

router.get('/:subCategoryId', verifyToken, async(req, res)=>{

    try {
        
        const subCategory = await SubCategories.findById(req.params.subCategoryId)
        // console.log(category)
        if (subCategory == null) {
            return  res.send({
                error:true,
                message:"Sub-Category does not exist",
                data:subCategory
        
            })
          }
          res.send({
            success:true,
            message:"Successful",
            data:subCategory
    
        })
    } catch (error) {
        res.status(500).json({
            error :true,
            message:`An error occured: ${error}`

        })
    }
})


// delete category by id

router.delete('/:subCategoryId', verifyToken, async (res, req)=>{
    try {
        const result = await Categories.remove({_id:req.params.subCategoryId})
        res.status(200).send({
            success:true,
            message:"Subcategory deleted successful"
        })
    } catch (error) {
        res.status(500).json({
            error :true,
            message:`An error occured: ${error}`

        })
    }
   
})

export default router






