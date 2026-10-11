

const errorHandler = (error,req,res,next)=>{

    req.logger?.error(`${error.name}: ${error.message} - ${error.stack}`)
    res.status(error.status || 500).json({
        status:'error',
        message:error.message || 'Internal Server Error'
    })
}

export default errorHandler