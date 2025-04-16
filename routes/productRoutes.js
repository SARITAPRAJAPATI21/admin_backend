import express from 'express'
import {addProduct,removeprod,listProducts,updateprod}from '../controller/productController.js';
import upload from '../middleware/multer.js';

const productRoute =express.Router();

productRoute.post('/add', upload.fields(
    [   {name:"image1",maxCount:9999},
        {name:"image2",maxCount:99999},
        {name:"image3",maxCount:9999},
        {name:"image4",maxCount:99999}]),addProduct)


productRoute.post('/remove',removeprod)
productRoute.get('/list',listProducts)
productRoute.post('/update',updateprod)

export default productRoute;
