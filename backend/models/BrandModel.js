import mongoose from "mongoose";

const brandSchema = mongoose.Schema({
    brandname:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
   

})
const BrandModel = mongoose.model('Brands',brandSchema)
export default BrandModel