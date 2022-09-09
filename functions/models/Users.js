import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const UserSchema = mongoose.Schema({
    userId:{type:String, unique:true, require:true},
    firstName :{
        type:String,
        required: true

    },
    lastName : {
        type:String,
        required: true
        
    },
    phoneNumber : {
        type:String,
        required: true
        
    },
    emailAddress : {
        type:String,
        required: true
        
    },
    password : {
        type:String,
        required: true
        
    },
    token : {
        type:String,
       default :null
        
    },
    active:{type:Boolean, default:false},
    created_at:{
        type:Date,
        default :Date.now
    } 

})

 export async function  hashPassword(password){
try{ 
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}catch(error){
    throw new Error("Hashing failed", error)
}
}

const User = mongoose.model('users', UserSchema)
// module.exports  = { hashPassword,User }
 export default  User;

