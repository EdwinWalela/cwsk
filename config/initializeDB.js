const Type = require("../models/type");
const TPS = require("../models/tps");
const Asset = require("../models/assets");
const Role = require("../models/roles");
const User = require("../models/users");
const Insurance = require("../models/insurance");
const Support = require("../models/support");
const Valuation = require("../models/assetValuation");


const dbInit = () =>{
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
        cost:2000000,
        valuation:2000000,
        insurance:"Jubilee Insurance",
        tpsId:1,
        typeId:2
    });
    let adminRole = Role.create({
        name:"Admin"
    });
    let newAdmin = User.create({
        firstName:"admin",
        lastName:"admin",
        alias:"admin",
        phone:"",
        email:"admin@mail.com",
        idno:"10000000",
        dob:"1/1/19",
        resetCode:"",
        permissions:["c","d","u"],
        password:"pass",
        confirmed:true,
        roleId:1,
        tpsId:1
    });
    let createOnlyRole = Role.create({
        name:"creator"
    });
    let updateOnlyRole = Role.create({
        name:"updater"
    });
    let createOnlyUser = User.create({
        firstName:"create",
        lastName:"only",
        alias:"creator",
        phone:"",
        email:"createonly@mail.com",
        idno:"10000001",
        dob:"1/1/19",
        resetCode:"",
        permissions:[],
        password:"pass",
        confirmed:true,
        roleId:2,
        tpsId:1
    });
    let updateOnlyUser = User.create({
        firstName:"update",
        lastName:"only",
        alias:"updater",
        phone:"",
        email:"updateonly@mail.com",
        idno:"10000002",
        dob:"1/1/19",
        resetCode:"",
        permissions:[],
        password:"pass",
        confirmed:true,
        roleId:3,
        tpsId:1
    });
    let insuranceA = Insurance.create({
        name:"first insurance",
        cost:"30000",
        details:"insuarance details",
        assetId:1
    })
    let insuranceB = Insurance.create({
        name:"second insurance",
        cost:"30000",
        details:"insuarance details",
        assetId:1
    })
    let insuranceC = Insurance.create({
        name:"third insurance",
        cost:"30000",
        details:"insuarance details",
        assetId:1
    })
    let insuranceD = Insurance.create({
        name:"fourth insurance",
        cost:"30000",
        details:"insuarance details",
        assetId:1
    })
    let supportA = Support.create({
        name:"support one",
        cost:"10000",
        details:"support details",
        assetId:1
    })
    let supportB = Support.create({
        name:"support two",
        cost:"10000",
        details:"support details",
        assetId:1
    })
    let supportC = Support.create({
        name:"support three",
        cost:"10000",
        details:"support details",
        assetId:1
    })
    let supportD = Support.create({
        name:"support four",
        cost:"10000",
        details:"support details",
        assetId:1
    })
    let valuationA = Valuation.create({
        price_now:"1800000",
        details:"valuation details",
        assetId:1
    })
    let valuationB = Valuation.create({
        price_now:"1600000",
        details:"valuation details",
        assetId:1
    })
    let valuationC = Valuation.create({
        price_now:"1500000",
        details:"valuation details",
        assetId:1
    })
    let valuationD = Valuation.create({
        price_now:"1200000",
        details:"valuation details",
        assetId:1
    })

    Promise.all([newTypeA,newTypeB]).then(values=>{
        Promise.all([newTps,newAsset,adminRole,createOnlyRole,updateOnlyRole]).then(values=>{
            Promise.all([
                newAdmin,createOnlyUser,updateOnlyUser,insuranceA,
                insuranceB,insuranceC,insuranceD
            ]).then(values=>{
                Promise.all([
                    supportA,supportB,supportC,supportD,
                    valuationA,valuationB,valuationC,valuationD
                ]).then(values=>{
                    
                })
            })
        })
    }).catch(err=>{
        console.log(err)
    })

}


module.exports = dbInit