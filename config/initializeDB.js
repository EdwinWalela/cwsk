const Type = require("../models/type");
const TPS = require("../models/tps");
const Asset = require("../models/assets");
const Role = require("../models/roles");
const User = require("../models/users");
const Insurance = require("../models/insurance");
const InsuranceFirm = require("../models/insuranceFirm");
const Support = require("../models/support");
const Valuation = require("../models/assetValuation");


const dbInit = () =>{
    let newTypeA = Type.create({
        name:"loose"
    })
    let newTypeB = Type.create({
        name:"fixed"
    })
    let insuranceFirmA = InsuranceFirm.create({
        name:"Jubilee"
    });
    let insuranceFirmB = InsuranceFirm.create({
        name:"NHIF"
    });
    let insuranceFirmC = InsuranceFirm.create({
        name:"Britam"
    });
    let newTps = TPS.create({
        name:"Nairobi Children's Home",
        alias:"NHC",
        location:"Nairobi",
        address:"Nairobi,Kenya",
        phone:"0700000001",
        typeId:1,
        type:"home",
        status:true,
        description:"caters for children"
    })
    let newAsset = Asset.create({
        name:"Ambulance",
        pic:"",
        tag:"tag",
        cost:2000000,
        valuation:2000000,
        insuranceFirmId:1,
        tpsId:1,
        typeId:2,
        status:true
    });
    let vanAsset = Asset.create({
        name:"Van",
        pic:"",
        tag:"tag",
        cost:1500000,
        valuation:1800000,
        insuranceFirmId:2,
        tpsId:1,
        typeId:2,
        status:true
    });
    let busAsset = Asset.create({
        name:"Bus",
        pic:"",
        tag:"tag",
        cost:12000000,
        valuation:1500000,
        insuranceFirmId:3,
        tpsId:1,
        typeId:2,
        status:true
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
        phone:"0700000001",
        email:"createonly@mail.com",
        idno:"10000001",
        dob:"1/1/19",
        resetCode:"",
        permissions:["c"],
        password:"pass",
        confirmed:true,
        roleId:2,
        tpsId:1
    });
    let updateOnlyUser = User.create({
        firstName:"update",
        lastName:"only",
        alias:"updater",
        phone:"0712345678",
        email:"updateonly@mail.com",
        idno:"10000002",
        dob:"1/1/19",
        resetCode:"",
        permissions:["u"],
        password:"pass",
        confirmed:true,
        roleId:3,
        tpsId:1
    });
    let insuranceA = Insurance.create({
        cost:30000,
        details:"insuarance details",
        assetId:1,
        insuranceFirmId:1
    })
    let insuranceB = Insurance.create({
        cost:30000,
        details:"insuarance details",
        assetId:1,
        insuranceFirmId:2
    })
    let insuranceC = Insurance.create({
        cost:30000,
        details:"insuarance details",
        assetId:1,
        insuranceFirmId:3
    })
    let insuranceD = Insurance.create({
        cost:30000,
        details:"insuarance details",
        assetId:1,
        insuranceFirmId:1
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
        Promise.all([
            newTps,insuranceFirmA,insuranceFirmB,insuranceFirmC,
           adminRole,createOnlyRole,updateOnlyRole
        ]).then(values=>{
            Promise.all([
                newAdmin,createOnlyUser,updateOnlyUser,newAsset,vanAsset,busAsset,   
            ]).then(values=>{
                Promise.all([
                    supportA,supportB,supportC,
                   supportD,insuranceA,insuranceB,insuranceC,insuranceD,     
                ]).then(values=>{
                    Promise.all([valuationA,valuationB,valuationC,valuationD]).then(values=>{

                    })
                })
            })
        })
    }).catch(err=>{
        console.log(err)
    })

}


module.exports = dbInit