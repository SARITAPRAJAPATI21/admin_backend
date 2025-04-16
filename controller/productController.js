import productModel from '../models/prod.js'
import { v2 as cloudinary } from "cloudinary";

const addProduct = async(req,res)=>{
 
    
   try { 

       const { name, price,description  } = req.body;
       const image1=req.files.image1 && req.files.image1[0];
        const image2=req.files.image2 && req.files.image2[0];
        const image3= req.files.image3 && req.files.image3[0];
        const image4=req.files.image4 && req.files.image4[0];
        const images=[image1,image2,image3,image4].filter((item)=> item!==undefined) 

      
        let imageUrl =await Promise.all(
            images.map(async(item)=>{
                let result =await cloudinary.uploader.upload(item.path,{resource_type :'image'})
                return result.secure_url
            })

        )
        console.log("product add section controller",imageUrl)
             
      const productData={
        name,
        description,
        price:Number(price),
        image:imageUrl,
        date:Date.now()
      }
      const product= new productModel(productData)
      await product.save();
      return res.json({message:"product added "})

  
       
   } catch (error) {
    console.log("internal error ",error)
    return res.status(500).json({ message: 'internal error ', error });
    
   }
} 

const removeprod=async(req,res)=>{ 
   
    try {
        console.log("product remove section controller",req.body)
        await productModel.findOneAndDelete(req.body.id);
        res.json({success:true,message:"removed successfully"})
        
    } catch (error) {
        console.log("internal error ")
    res.status(500).json({ message: 'internal error ', error });
    }

} 
const listProducts = async(req,res)=>{
    try {
        console.log('list product')
        const products = await productModel.find({});
        console.log('list product',products)
        res.json({success:true,products})
    } catch (error) {
        console.log(error)
        res.json({succes:false ,error:error.message})
        
    }

}
const updateprod = async(req,res)=>{
     const { name,price,description} =req.body; 
  
    try {  
        console.log('update quete')
        const existingprod = await productModel.findOne({name });
        if (!existingprod) return res.status(404).json({ message: "prodtct not found" });

        existingprod.name=name;
        existingprod.price=price;
        existingprod.description=description;

        await existingprod.save();
        return res.status(201).json({ message: "product update successfully" });

       
    } catch (error) {
        console.log(error)
        res.json({succes:false ,error:error.message})
        
    }

}

export {addProduct,removeprod,listProducts,updateprod}
