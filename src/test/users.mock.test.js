import {expect} from 'chai';
import {generateUser, generateUsers} from './mocks/users.mock.js';
import UserRepository from '../repository/UserRepository.js';
import UsersDaoMock from './mocks/users.dao.mock.js'

describe('Mock de usuarios', ()=>{
    it('Debe generar un usuario con datos validos', async ()=>{
        const user = await generateUser();

        expect(user).to.have.property('first_name');
        expect(user).to.have.property('last_name');
        expect(user).to.have.property('email');
        expect(user).to.have.property('password');
        expect(user).to.have.property('role');
        expect(user).to.have.property('pets');
    });

    it('Debe generar la cantidad de usuarios solicitada', async ()=>{
        const users = await generateUsers(10);

        expect(users).to.be.an('array');
        expect(users).to.have.lengthOf(10)
    });

})

describe('UserRepository con Mock DAO', ()=>{
    it('Debe obtener usuario sin utilizar MondoDB', async()=>{
        const usersDaoMock = new UsersDaoMock();
        const userRepository = new UserRepository(usersDaoMock);

        const users = await userRepository.getAll({quantity:5});

        expect(users).to.be.an('array');
        expect(users).to.have.lengthOf(5)
    });

    it('Debe obtener una usuario por criterio sin utilizar MongoDB', async()=>{
        const usersDaoMock = new UsersDaoMock();
        const userRepository = new UserRepository(usersDaoMock);

        const user = await userRepository.getBy({name:'Juan'});

        expect(user).to.be.an('object');
        expect(user).to.have.property('first_name');
        expect(user).to.have.property('last_name')
    })

    it('Debe devolver null cuando el usuario no existe', async()=>{
        const usersDaoMock = new UsersDaoMock();
        const userRepository = new UserRepository(usersDaoMock);

        const user = await userRepository.getBy({name:'No Existe'})

        expect(user).to.be.null
    })
})