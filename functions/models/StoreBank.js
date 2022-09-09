
import mongoose from "mongoose";

const StoreBankSchema = mongoose.Schema({
    bankName:{
        type:String,
        require:true
    },
    bankAccount:{
        type:String,
        require:true
    },
    bankBVN:{
        type:String,
        require:true
    },
    storeId:{
        type:String,
        require:true
    },
    status:{
        type:String,
        default:"Pending"
    }
})

export default mongoose.model("StoreBank", StoreBankSchema)