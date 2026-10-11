import { usersService } from "../services/index.js"
import asyncHandler from '../utils/asyncHandler.js'
import CustomError from '../utils/CustomError.js'

const getAllUsers = asyncHandler(async(req,res)=>{
    const users = await usersService.getAll();
    res.send({status:"success",payload:users})
})

const getUser = asyncHandler(async(req,res)=> {
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) throw new CustomError("User not found",404)
    res.send({status:"success",payload:user})
})

const updateUser =asyncHandler(async(req,res)=>{
    const updateBody = req.body;
    const userId = req.params.uid;
    const user = await usersService.getUserById(userId);
    if(!user) throw new CustomError("User not found",404)
    const result = await usersService.update(userId,updateBody);
    res.send({status:"success",message:"User updated"})
})

const deleteUser = asyncHandler(async(req,res) =>{
    const userId = req.params.uid;
    const result = await usersService.getUserById(userId);
    res.send({status:"success",message:"User deleted"})
})

export default {
    deleteUser,
    getAllUsers,
    getUser,
    updateUser
}