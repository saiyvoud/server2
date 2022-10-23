import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from 'dotenv'
dotenv.config();
const SAIT_KEY = parseInt(process.env.SALT);
const SECREATE_KEY = process.env.SECREATE_KEY;

export const generateToken =(data)=>{
  return  jwt.sign({data},SECREATE_KEY,{expiresIn: "7d"})
}
export const genPassword = async (password)=>{
    const saltHash = await bcrypt.genSalt(SAIT_KEY);
     console.log("saltHash",saltHash)
    const hashPassword = await bcrypt.hash(password, saltHash)
     console.log("hashPassword",hashPassword);
    return hashPassword
}
export const comparePassword = async (loginPassword, password)=>{
  return await bcrypt.compare(loginPassword, password)
}
