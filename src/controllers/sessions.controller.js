import { usersService } from "../services/index.js";
import { createHash, passwordValidation } from "../utils/index.js";
import asyncHandler from '../utils/asyncHandler.js'
import CustomError from '../utils/CustomError.js'
import jwt from 'jsonwebtoken';
import UserDTO from '../dto/User.dto.js';

const register = asyncHandler(async (req, res) => {
    
    const { first_name, last_name, email, password } = req.body;
    if (!first_name || !last_name || !email || !password) throw new CustomError("Incomplete values",400)
    const exists = await usersService.getUserByEmail(email);
    if (exists) throw new CustomError("User already exists",400)
    const hashedPassword = await createHash(password);
    const user = {
        first_name,
        last_name,
        email,
        password: hashedPassword
    }
    let result = await usersService.create(user);
    req.logger.info(`Usuario registrado con id: ${result._id}`);
    res.send({ status: "success", payload: result._id });

})

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) throw new CustomError("Incomplete values",400)
    const user = await usersService.getUserByEmail(email);
    if(!user) throw new CustomError("User doesn't exist",404);
    const isValidPassword = await passwordValidation(user,password);
    if(!isValidPassword) throw new CustomError("Incorrect password",400);
    const userDto = UserDTO.getUserTokenFrom(user);
    const token = jwt.sign(userDto,'tokenSecretJWT',{expiresIn:"1h"});
    res.cookie('coderCookie',token,{maxAge:3600000}).send({status:"success",message:"Logged in"})
})

const current = asyncHandler(async(req,res) =>{
    const cookie = req.cookies['coderCookie']
    const user = jwt.verify(cookie,'tokenSecretJWT');
    if(user)
        return res.send({status:"success",payload:user})
})

const unprotectedLogin  = asyncHandler(async(req,res) =>{
    const { email, password } = req.body;
    if (!email || !password) throw new CustomError("Incomplete values",400)
    const user = await usersService.getUserByEmail(email);
    if(!user) throw new CustomError("User doesn't exist",404);
    const isValidPassword = await passwordValidation(user,password);
    if(!isValidPassword) throw new CustomError("Incorrect password",400);
    const token = jwt.sign(user,'tokenSecretJWT',{expiresIn:"1h"});
    res.cookie('unprotectedCookie',token,{maxAge:3600000}).send({status:"success",message:"Unprotected Logged in"})
})
const unprotectedCurrent = asyncHandler(async(req,res)=>{
    const cookie = req.cookies['unprotectedCookie']
    const user = jwt.verify(cookie,'tokenSecretJWT');
    if(user)
        return res.send({status:"success",payload:user})
})
export default {
    current,
    login,
    register,
    unprotectedLogin,
    unprotectedCurrent
}