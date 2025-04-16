import OrderModel from "../models/orderModel.js";
import productModel from "../models/prod.js";

// order by user cod on delivery method
const placeOrder = async (req, res) => {
  console.log("place order cod", req.body);
  try {
    const { userId, id, amount, address } = req.body;
    const product= await productModel.findOne({ _id:id})
    console.log(product)

 const orderData = {
      userId,
     items:product,
      amount:product.price,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new OrderModel(orderData);
    await newOrder.save();
    return res.json({ message: "order place successfully ",orderData});
  } catch (error) {
    console.log("inter error");
    return res.json({ error: "sever error ", error: error.message });
  }
};

// orders for admin panels
const allOrders = async (req, res) => {
  console.log(" all order list");
  try {
    const list= await OrderModel.find({});
    return res.json({ success: true, message: "orderlist" ,list});
  } catch (error) {
    console.log("inter error");
    return res.json({ error: "sever error ", error: error.message });
  }
};
//user order for fronted
const orderId = async (req, res) => {
  console.log("  order id",req.body.orderId);
  const {orderId} =req.body;
  try {
    const order= await OrderModel.findOne({ _id:orderId})
   return res.json({"succuess":true ,message:"order find",order})
  } catch (error) {
    return res.json({"succuess":false ,message:"product  notfind"})
    
  }
   

};
const updateStatus = async (req, res) => {
  
   const {id,status}=req.body;
  try {
      const order= await OrderModel.findByIdAndUpdate({_id:id},{status:status})
      console.log(" updte order");
       return res.json({message:"updatd",success:true,order})
  } catch (error) {
    console.log(" not updte order");
    return res.json({messag:"not update",success:false})
    
    

    
  }
};

export { orderId, allOrders, updateStatus, placeOrder };
