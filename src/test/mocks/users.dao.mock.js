import {generateUser, generateUsers} from './users.mock.js'


export default class UsersDaoMock {
    
    get = async (params) =>{
            return generateUsers(params.quantity)
    }
    
    getBy = async (params) =>{
        if(params?.name === 'No Existe'){
            return null
        }
    
        return generateUser()
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