
import mongoose from "mongoose";

const ProductsSchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    price:{
        type:Number,
        require:true
    },
    colors:{
        type:Array,
        require:true
    },
    sizes:{
        type:Array,
        require:true
    },
    unit:{
        type:Number,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    images:{
        type:Array,
        require:true
    },
    subCategoryId:{
        type:String,
        require:true
    },
    storeId:{
        type:String,
        require:true
    }
})

export default mongoose.model('Products', ProductsSchema)