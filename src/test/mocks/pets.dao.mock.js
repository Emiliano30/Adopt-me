import {generatePet, generatePets} from './pets.mock.js'

export default class PetsDaoMock {

    get = async (params) =>{
        return generatePets(params.quantity)
    }

    getBy = async (params) =>{
        if(params?.name === 'No Existe'){
            return null
        }

        return generatePet()
    }

    save = async (doc) =>{
        return{
            ...doc,
            _id: 'mock-id-123'
        }
    }

    update = async (id,doc) =>{
        return {
            _id:id,
            ...doc
        }
    }

    delete = async (id) =>{
        return{
            _id:id,
            deleted:true
        }
    }
}