import { petServiceMock, userServiceMock } from "../services/mocks.service.js";
import { usersService, petsService} from '../services/index.js'
import asyncHandler from "../utils/asyncHandler.js";

const getUsersMocks = asyncHandler(async(req,res)=>{
    const quantity = 50;
    const users = await userServiceMock.getAll({quantity});
    res.send({status:"success",payload:users})
})

const getPetsMock = asyncHandler(async(req,res)=>{
    const quantity = 100;
    const pets = await petServiceMock.getAll({quantity});
    res.send({status:"success",payload:pets})
})

const createData = asyncHandler(async(req,res)=>{
    const {users,pets} = req.body;
    const responseUsers = await userServiceMock.getAll({quantity:users});
    const responsePets = await petServiceMock.getAll({quantity:pets});
    for (const user of responseUsers){
        await usersService.create(user)
    };

    for (const pet of responsePets){
        await petsService.create(pet)
    }
    res.send({status:'success',message:'Datos creado y guardados con exito!'})
})

export default {
    getUsersMocks,
    getPetsMock,
    createData
}