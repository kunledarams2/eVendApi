
import mongoose from "mongoose";

const OrderProductSchema = mongoose.Schema({
    quantity:{
        type:Number,
        require:true
    },
    colorSelected:{
        type:String,
        require:true
    },
    sizeSelected:{
        type:String,
        require:true
    },
    deliveryAddress:{
        type:String,
        require:true
    },
    userId:{
        type:String,
        require:true
    },
    productId:{
        type:String,
        require:true
    },
    storeId:{
        type:String,
        require:true
    },
    paymentMethod:{
        type:String,
        require:true
    },
    status:{
        type:String,
        default:"Pending"
    }, 
    amount:{
        type:String,
        require:true
    }


})


export default mongoose.model("OrderProduct", OrderProductSchema)