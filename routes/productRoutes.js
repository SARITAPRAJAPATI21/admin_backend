import express from 'express'
import {addProduct,removeprod,listProducts,updateprod}from '../controller/productController.js';

const productRoute =express.Router();

productRoute.post('/add',addProduct)


productRoute.post('/remove',removeprod)
productRoute.get('/list',listProducts)
productRoute.post('/update',updateprod)

export default productRoute;
