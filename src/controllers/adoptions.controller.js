import { adoptionsService, petsService, usersService } from "../services/index.js"
import asyncHandler from '../utils/asyncHandler.js'
import CustomError from '../utils/CustomError.js'

const getAllAdoptions = asyncHandler(async(req,res)=>{
    const result = await adoptionsService.getAll();
    res.send({status:"success",payload:result})
})

const getAdoption = asyncHandler(async(req,res)=>{
    const adoptionId = req.params.aid;
    const adoption = await adoptionsService.getBy({_id:adoptionId})
    if(!adoption) throw new CustomError("Adoption not found",404)
    res.send({status:"success",payload:adoption})
})

const createAdoption = asyncHandler(async(req,res)=>{
    const {uid,pid} = req.params;
    const user = await usersService.getUserById(uid);
    if(!user) throw new CustomError("user Not found",404)
    const pet = await petsService.getBy({_id:pid});
    if(!pet) throw new CustomError("Pet not found",404)
    if(pet.adopted) throw new CustomError("Pet is already adopted",400)
    user.pets.push(pet._id);
    await usersService.update(user._id,{pets:user.pets})
    await petsService.update(pet._id,{adopted:true,owner:user._id})
    await adoptionsService.create({owner:user._id,pet:pet._id})
    res.send({status:"success",message:"Pet adopted"})
})

export default {
    createAdoption,
    getAllAdoptions,
    getAdoption
}