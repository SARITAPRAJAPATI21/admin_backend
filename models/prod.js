import mongoose from "mongoose";

const productSchema =new mongoose.Schema({
    name :{type:String,require:true,unique :true},
    price:{type:Number,require:true},
    description:{type:String,require:true},
   

});


const productModel=mongoose.models.product || mongoose.model('product',productSchema);
export default productModel;