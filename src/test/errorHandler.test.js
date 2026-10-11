import { expect } from 'chai';
import supertest from 'supertest';
import express from 'express';
import errorHandler from '../middleware/errorHandler.js';
import CustomError from '../utils/CustomError.js';

const app = express();
app.use(express.json());

app.get('/test/error', (req, res, next) => {
    next(new CustomError('Error de prueba', 400))
});

app.use(errorHandler);

describe('Error Handler', () => {
    it('Debe capturar un error CustomError', async () => {
        const response = await supertest(app).get('/test/error').expect(400);

        expect(response.body).to.be.an('object');
        expect(response.body).to.have.property('message', 'Error de prueba');
        expect(response.body).to.have.property('status', 'error');
    })
})