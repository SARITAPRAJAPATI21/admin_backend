import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'



const registerUser = async(req,res)=>{
    const { name, email, password } = req.body;
    console.log("regiser user")

   try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Generate JWT token
    //onst token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'User registered successfully'});
    
   }
    catch (error) {
    res.status(500).json({ message: 'Server error', error });
    
   }
}

const loginUser = async(req,res)=> {
    console.log("login user")
    try {
      const { email, password } = req.body;
      console.log("info user",email,password)
      const user = await User.findOne({ email });
  
      if (!user) return res.status(400).json({ error: "Invalid email or password" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid email or password same" });
  
     const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.json({  success:true ,message: "Login successful"  ,token});
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  };



const ResetPassword = async(req,res)=>{
  const {email,cpassword}=req.body;
  console.log(email,cpassword)
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(404).json({ message: "User not found" });

    const hashedPassword = await bcrypt.hash(cpassword, 10);
    existingUser.password = hashedPassword;
    await existingUser.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
   
    console.log("Internal Sever")
    return res.json({message:"Internal server"})
    
  }


}
export {loginUser,registerUser,ResetPassword}