
import mongoose from "mongoose";

const StoreShema= mongoose.Schema({

    email:{
        type:String, 
        require:true
    },
    phoneNumber:{
        type:String,
        require:true,
    },
    address:{
        type:String,
        require:true
    },
    accountType:{
        type:String,
        default: 'ADMIN'
    },
    password:{
        type:String,
        require:true
    },
    status:{
        type:String,
        default:'Inactive'
    },
    createdAt:{
        type:Date,
        default :Date.now
    },
    token:{
        type:String,
        require:true
    },
    // storeId:{
    //     status:{
    //         type:String,
    //         default:'Inactive'
    
    //     },
    //     name:{
    //         type:String,
    //         require:true
    //     },
    
    //     email:{
    //         type:String,
    //         require:true
    //     }

    // }
})

const storeInfo = mongoose.Schema({
    status:{
        type:String,
        default:'Inactive'

    },
    name:{
        type:String,
        require:true
    },

    email:{
        type:String,
        require:true
    }
})

export default mongoose.model('store', StoreShema)