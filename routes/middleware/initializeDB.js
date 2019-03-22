const Type = require("../../models/type");
const TPS = require("../../models/tps");
const Asset = require("../../models/assets");
const Role = require("../../models/roles");
const User = require("../../models/users");


const dbInit = (req,res,next) =>{
    let newTypeA = Type.create({
        name:"orphanage"
    })
    let newTypeB = Type.create({
        name:"vehical"
    })
    let newTps = TPS.create({
        name:"Nairobi Children's Home",
        alias:"NHC",
        location:"Nairobi",
        address:"Nairobi,Kenya",
        phone:"0700000001",
        typeId:1,
        status:true,
        description:"caters for children"
    })
    let newAsset = Asset.create({
        name:"Ambulance",
        pic:"",
        tag:"",
        cost:"2000000",
        valuation:"2000000",
        insurance:"Jubilee Insurance",
        tpsId:1,
        typeId:2
    })
    let newRole = Role.create({
        name:"Admin"
    })
    let newUser = User.create({
        firstName:"admin",
        lastName:"admin",
        alias:"admin",
        phone:"",
        email:"admin@mail.com",
        idno:"10000000",
        dob:"1/1/19",
        resetCode:"",
        permissions:"",
        password:"pass",
        confirmed:true,
        roleId:1,
        tpsId:1
    });

    Promise.all([newTypeA,newTypeB]).then(values=>{
        Promise.all([newTps,newAsset,newRole]).then(values=>{
            Promise.all([newUser]).then(values=>{
                next();
            })
        })
    }).catch(err=>{
        res.status(500).send({err})
    })

}

module.exports = dbInit