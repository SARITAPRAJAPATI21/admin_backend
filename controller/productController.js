import productModel from '../models/prod.js'

const addProduct = async(req,res)=>{
    const { name, price,description  } = req.body;
   try { 
     console.log("product add section controller",req.body)
    const existingprod = await productModel.findOne({ name });

    if (existingprod) { 
        console.log('product aalready exits')
        return res.status(400).json({ message: 'prod already exists', product:existingprod }); }

        else{ 
            const newProd = new productModel({ name, price,description });
            await newProd.save();
            return res.status(201).json({ message: 'Prod added successfully'});
          }
       // Create new product
       
   } catch (error) {
    console.log("internal error ")
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
