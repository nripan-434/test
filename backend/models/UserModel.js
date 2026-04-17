import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        select:false,
        required:true
    }
})

const UserModel = mongoose.model('Users',UserSchema)
export default UserModel