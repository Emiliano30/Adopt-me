import {expect} from 'chai';
import {generatePet, generatePets} from './mocks/pets.mock.js';
import PetRepository from '../repository/PetRepository.js';
import PetsDaoMock from './mocks/pets.dao.mock.js'

describe('Mock de mascotas', ()=>{
    it('Debe generar un mascota con datos validos', ()=>{
        const pet = generatePet();

        expect(pet).to.have.property('name');
        expect(pet).to.have.property('specie');
        expect(pet).to.have.property('birthDate');
        expect(pet).to.have.property('adopted');
        expect(pet).to.have.property('image');
    });

    it('Debe generar la cantidad de mascotas solicitada', ()=>{
        const pets = generatePets(10);

        expect(pets).to.be.an('array');
        expect(pets).to.have.lengthOf(10)
    });

})

describe('PetRepository con Mock DAO', ()=>{
    it('Debe obtener mascotas sin utilizar MondoDB', async()=>{
        const petsDaoMock = new PetsDaoMock();
        const petRepository = new PetRepository(petsDaoMock);

        const pets = await petRepository.getAll({quantity:5});

        expect(pets).to.be.an('array');
        expect(pets).to.have.lengthOf(5)
    });

    it('Debe obtener una mascota por criterio sin utilizar MongoDB', async()=>{
        const petsDaoMock = new PetsDaoMock();
        const petRepository = new PetRepository(petsDaoMock);

        const pet = await petRepository.getBy({name:'Lucky'});

        expect(pet).to.be.an('object');
        expect(pet).to.have.property('name');
        expect(pet).to.have.property('specie')
    })

    it('Debe devolver null cuando la mascota no existe', async()=>{
        const petsDaoMock = new PetsDaoMock();
        const petRepository = new PetRepository(petsDaoMock);

        const pet = await petRepository.getBy({name:'No Existe'})

        expect(pet).to.be.null
    })
})