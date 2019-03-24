const jwt = require("jsonwebtoken");
const jwtConfig = require("../../config/jwt");

const UserVerification = (req,res,next) =>{
    const bearerHeader = req.headers["authorization"];
    const bearerToken =  bearerHeader.split(" ")[1]
    //decode token
    let decoded = jwt.verify(bearerToken,jwtConfig.SECRET,(err,payload)=>{
        if(err){
            res.status(401).send({msg:err.message})
        }else{
            console.log(userID,req.params.id)
            //check if is permissioned
            let userID = payload.user.id
            console.log(userID,req.params.id)
            if(userID === req.params.id){
                //authorized
                next();
            }else{
                res.status(401).send({msg:"Unauthorized"});
            }
        }
    });
}

module.exports = UserVerification;
