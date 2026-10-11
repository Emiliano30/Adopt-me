import express from 'express';
import cookieParser from 'cookie-parser';

import MongoSingleton from './config/mongoose.config.js';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mockingRouter from './routes/mocks.router.js';
import errorHandler from './middleware/errorHandler.js';
import {addLogger, logger} from './utils/logger.js'

await MongoSingleton.getInstance()

const app = express();
const PORT = process.env.PORT||8080;


app.use(express.json());
app.use(cookieParser());
app.use(addLogger);

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks',mockingRouter)
app.get('/loggerTest',(req,res)=>{
    req.logger.fatal('fatal log');
    req.logger.error('error log');
    req.logger.warning('warning log');
    req.logger.info('info log');
    req.logger.http('http log');
    req.logger.debug('debug log');
    res.send('Los logs fueron probado')
})

app.use(errorHandler)

app.listen(PORT,()=>logger.info(`Listening on http://localhost:${PORT}`))

export default app
