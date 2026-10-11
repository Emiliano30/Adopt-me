import mongoose from "mongoose";
import {logger} from '../utils/logger.js';

process.loadEnvFile?.();

const MONGO_URL = process.env.MONGO_URL

class MongoSingleton {
    static #instance

    constructor(){
        this.#connectMongoDB();
    }

    static getInstance(){
        if(this.#instance){
            logger.info('MongoSingleton instance already exists')
        }else{
            this.#instance = new MongoSingleton()
        }
        return this.#instance
    }

    #connectMongoDB = async()=>{
        if (!MONGO_URL) {
        logger.warning('No se proporcionó MONGO_URL. El servidor continuará sin base de datos.');
        return;
        }
        
        try {
            await mongoose.connect(MONGO_URL);
            logger.info('MongoDB connected')
        } catch (error) {
            logger.error(`Error connection ${error.message}`);
            process.exit(1)
        }
    }

}

export default MongoSingleton