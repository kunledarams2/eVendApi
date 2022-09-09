import mongoose from "mongoose";

const CategorySchema = mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    imagePath:{
        type:String,
        require:true
    },

})

export default mongoose.model('Categories', CategorySchema)