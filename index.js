import express from 'express';
import 'dotenv/config'
import cors from 'cors'
import connectDB  from './config/database.js';
import userRoute from './routes/userRoutes.js'
import productRoute from './routes/productRoutes.js';

const app = express();

const port = process.env.PORT || 3000;
connectDB();

app.use(express.json())



app.use(cors({
  origin:'https://admin-dashboard-nmi4xeqaj-saritas-projects-ee5fd3a5.vercel.app/' 
    
}))
console.log(process.env.CLIENT_URL)

app.use('/api/user',userRoute)
app.use('/api/product',productRoute)

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
