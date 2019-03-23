const jwt = require("jsonwebtoken");
const jwtConfig = require("../../config/jwt");

const CreatePermission = (req,res,next) =>{
    const bearerHeader = req.headers["authorization"];
    const bearerToken =  bearerHeader.split(" ")[1]
    //decode token
    let decoded = jwt.verify(bearerToken,jwtConfig.SECRET,(err,payload)=>{
        if(err){
            res.status(401).send({msg:err.message})
        }else{
            //check if is permissioned
            let userPermission = payload.user.perm
            console.log(userPermission)
            if(userPermission.includes("c")){
                //authorized
                next();
            }else{
                res.status(401).send({msg:"Unauthorized"});
            }
        }
    });
}
const UpdatePermission = (req,res,next) =>{
    const bearerHeader = req.headers["authorization"];
    const bearerToken =  bearerHeader.split(" ")[1]
    //decode token
    let decoded = jwt.verify(bearerToken,jwtConfig.SECRET,(err,payload)=>{
        if(err){
            res.status(401).send({msg:err.message})
        }else{
            //check if is permissioned
            let userPermission = payload.user.perm
            console.log(userPermission)
            if(userPermission.includes("u")){
                //authorized
                next();
            }else{
                res.status(401).send({msg:"Unauthorized"});
            }
        }
    });
}
const DeletePermission = (req,res,next) =>{
    const bearerHeader = req.headers["authorization"];
    const bearerToken =  bearerHeader.split(" ")[1]
    //decode token
    let decoded = jwt.verify(bearerToken,jwtConfig.SECRET,(err,payload)=>{
        if(err){
            res.status(401).send({msg:err.message})
        }else{
            //check if is permissioned
            let userPermission = payload.user.perm
            console.log(userPermission)
            if(userPermission.includes("d")){
                //authorized
                next();
            }else{
                res.status(401).send({msg:"Unauthorized"});
            }
        }
    });
}

module.exports.Update = UpdatePermission
module.exports.Delete = DeletePermission
module.exports.Create = CreatePermission
