
import mongoose from "mongoose";

const SubCategoriesSchema = mongoose.Schema({
    name:{
        type:String, 
        require:true,
    },
    imagePath:{
        type:String,
        require:true
    },
    categoryId:{
        type:String,
        require:true
    }

})

export default mongoose.model("SubCategories", SubCategoriesSchema)