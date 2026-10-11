import PetDTO from "../dto/Pet.dto.js";
import { petsService } from "../services/index.js"
import asyncHandler from '../utils/asyncHandler.js'
import CustomError from '../utils/CustomError.js'
import __dirname from "../utils/index.js";

const getAllPets = asyncHandler(async(req,res)=>{
    const pets = await petsService.getAll();
    res.send({status:"success",payload:pets})
})

const createPet = asyncHandler(async(req,res)=> {
    const {name,specie,birthDate} = req.body;
    if(!name||!specie||!birthDate) throw new CustomError("Incomplete values",400)
    const pet = PetDTO.getPetInputFrom({name,specie,birthDate});
    const result = await petsService.create(pet);
    res.send({status:"success",payload:result})
})

const updatePet = asyncHandler(async(req,res) =>{
    const petUpdateBody = req.body;
    const petId = req.params.pid;
    const result = await petsService.update(petId,petUpdateBody);
    res.send({status:"success",message:"pet updated"})
})

const deletePet = asyncHandler(async(req,res)=> {
    const petId = req.params.pid;
    const result = await petsService.delete(petId);
    res.send({status:"success",message:"pet deleted"});
})

const createPetWithImage = asyncHandler(async(req,res) =>{
    const file = req.file;
    const {name,specie,birthDate} = req.body;
    if(!name||!specie||!birthDate) throw new CustomError("Incomplete values",400)
    req.logger.debug(file);
    const pet = PetDTO.getPetInputFrom({
        name,
        specie,
        birthDate,
        image:`${__dirname}/../public/img/${file.filename}`
    });
    req.logger.debug(pet);
    const result = await petsService.create(pet);
    res.send({status:"success",payload:result})
})

export default {
    getAllPets,
    createPet,
    updatePet,
    deletePet,
    createPetWithImage
}