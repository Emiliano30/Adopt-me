import { expect } from "chai";
import asyncHandler from '../utils/asyncHandler.js';


describe('AsyncHandler', () => {
    it('Debe enviar el error al next', async () => {
        const error = new Error('Error de prueba');
        const next = (recivedError) => {
            expect(recivedError).to.equal(error);
        }
        const handler = asyncHandler(async (req, res, next) => {
            throw error;
        });

        await handler({}, {}, next)
    })
})