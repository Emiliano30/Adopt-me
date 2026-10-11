import winston from 'winston'

const customLevels = {
    levels:{
        fatal:0, error:1, warning:2, info:3, http:4, debug:5
    }
}

const devLogger = winston.createLogger({
    levels: customLevels.levels,
    level: 'debug',
    transports: [new winston.transports.Console()]
})

const prodLogger = winston.createLogger({
    levels: customLevels.levels,
    level: 'info',
    transports:[
        new winston.transports.Console(),
        new winston.transports.File({filename: 'errors.log', level: 'error'})
    ]
})

export const addLogger = (req,res,next)=>{
    const isProduction = process.env.NODE_ENV === 'production';

    if(isProduction){
        req.logger = prodLogger
    }else{
        req.logger = devLogger
    };

    req.logger.http(
        `${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`
    );

    next()
}

export const logger = process.env.NODE_ENV === 'production' ? prodLogger : devLogger