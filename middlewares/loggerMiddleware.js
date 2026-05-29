
const logger = (req,res,next)=>{
    console.log("Request received with method: " + req.method + " on URL:" + req.originalUrl);
    next();
}

module.exports = logger;