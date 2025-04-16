import express from 'express';
import 'dotenv/config'
import cors from 'cors'
import connectDB  from './config/database.js';
import userRoute from './routes/userRoutes.js'
import productRoute from './routes/productRoutes.js';
import orderRoute from './routes/orderRoutes.js';
import connectCloudinary from './config/clodinary.js';



const app = express();

const port = process.env.PORT || 3000;
connectCloudinary();
connectDB();

app.use(express.json())



app.use(cors({
  origin:process.env.CLIENT_URL 
    
}))
console.log(process.env.CLIENT_URL)

app.use('/api/user',userRoute)
app.use('/api/product',productRoute)
app.use('/api/order',orderRoute)


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
