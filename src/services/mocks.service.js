import UserRepository from "../repository/UserRepository.js";
import PetRepository from "../repository/PetRepository.js";
import UsersDaoMock from "../test/mocks/users.dao.mock.js";
import PetsDaoMock from "../test/mocks/pets.dao.mock.js";

const userDaoMocks = new UsersDaoMock();
const petDaoMocks = new PetsDaoMock();

const userServiceMock = new UserRepository(userDaoMocks);
const petServiceMock = new PetRepository(petDaoMocks);

export {userServiceMock, petServiceMock}