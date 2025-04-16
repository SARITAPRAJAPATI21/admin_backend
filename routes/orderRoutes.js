import express from 'express'
import { placeOrder,orderId,allOrders,updateStatus} from '../controller/orderController.js'
const orderRoute =express.Router();


//user features
orderRoute.post('/orderId',orderId)

// admin feature
orderRoute.get('/list',allOrders)
orderRoute.post('/update',updateStatus)

//payemnt
orderRoute.post('/place',placeOrder)

export default orderRoute