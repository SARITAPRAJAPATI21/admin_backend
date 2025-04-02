import express from 'express';
import 'dotenv/config'
import cors from 'cors'
import connectDB  from './config/database.js';
import userRoute from './routes/userRoutes.js'

const app = express();

const port = process.env.PORT || 3000;
connectDB();

app.use(express.json())
app.use(cors())
app.use('/api/user',userRoute)

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
