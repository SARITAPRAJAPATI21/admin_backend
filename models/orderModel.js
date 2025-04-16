import mongoose from "mongoose";


const OrderSchema =new mongoose.Schema({
    userId :{type:String,require:true,unique: false},
    items:{type:Array,require:true},
    amount:{type:Number,require:true},
    address :{type:Object,require:true},
    status:{type:String,require:true,default:'order placed'},
    paymentMethod:{type:String,require:true},
    payment:{type:Boolean,require:true,default:false},
    date:{type:Date,require:true},
   

});
const OrderModel= mongoose.model('orders',OrderSchema);
export default OrderModel;