import {expect} from 'chai';
import supertest from 'supertest';
import app from '../app.js'

describe('Logger',()=>{
    it('Debe responder status 200 en el endpoint /loggerTest', async()=>{
        const response = await supertest(app).get('/loggerTest');

        expect(response.status).to.equal(200);
        expect(response.text).to.include('Los logs fueron probado')
    })
})
