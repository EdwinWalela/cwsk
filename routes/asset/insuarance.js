const Router = require('express').Router();

// Models
const Insurance = require('../../models/insurance');
const InsuranceFirm = require("../../models/insuranceFirm")
const Asset = require('../../models/assets');

// Middleware
const tokenVerification = require("../middleware/tokenVerification");
const permissions = require("../middleware/permissionVerification");

//@ROUTE: get all insurances
Router.get('/', tokenVerification,(req,res)=>{
    let allInsurance = Insurance.findAll({
        include:[Asset,InsuranceFirm],
        attributes:{
            // exclude:["created_at","updated_at"]
        }
    });

    Promise.all([allInsurance]).then(values=>{
        res.send({insurances:values[0]});
    }).catch(err=>{
        console.log(err)
        res.status(500).send({insurances:[]});
    });
});
//@ROUTE: create asset insurance
Router.post('/', tokenVerification,permissions.Create,(req,res)=>{
    let insurance = req.body;

    let newInsurance = Insurance.create({
        name:insurance.name,
        cost:insurance.cost,
        details:insurance.details,
        assetId:insurance.asset,
        insuranceFirmId:insurance.insuranceFirm
    });

    Promise.all([newInsurance]).then(values=>{
        res.status(201).send({msg:"OK"})
    }).catch(err=>{
        if(err.name){
            res.status(400).send({
                err:{
                    msg:err.name,
                    fields:err.fields
                }
            });
        }else{
            res.status(500).send({err});
        }
    });
});
//@ROUTE: get insurance by PK
Router.get('/:id', tokenVerification,(req,res)=>{
    let insurance = Insurance.findByPk(req.params.id,{include:[Asset,insuranceFirm]});
    Promise.all([insurance]).then(values=>{
        if(values[0] !== null){
            res.send({insurance:values[0]});
        }else{
            res.status(404).send({msg:"Insurance Not Found"});
        }
    }).catch(err=>{
        res.status(500).send({});
    });
});
//@ROUTE: update insurance by PK
Router.put('/:id', tokenVerification,permissions.Update,(req,res)=>{
    let insurance = req.body;

    let newInsurance = Insurance.update({
        name:insurance.name,
        cost:insurance.cost,
        details:insurance.details,
        assetId:insurance.asset,
        insuranceFirmId:insurance.insuranceFirm
    },{
        where: {
          id: req.params.id
        }
    });

    Promise.all([newInsurance]).then(values=>{
        if(values[0] >= 1){
            res.send({msg:"OK"})
        }else{
            res.status(404).send({msg:"Insurance Not Found"});
        }
    }).catch(err=>{
        if(err.name){
            res.status(400).send({
                err:{
                    msg:err.name,
                    fields:err.fields
                }
            });
        }else{
            res.status(500).send({err});
        }
    });
});
//@ROUTE: delete insurance by PK
Router.delete('/:id', tokenVerification,permissions.Delete,(req,res)=>{
    let newInsurance = Insurance.destroy({
        where: {
          id: req.params.id
        }
    });

    Promise.all([newInsurance]).then(values=>{
        if(values[0] >= 1){
            res.status(204).send({})
        }else{
            res.status(404).send({msg:"Insurance Not Found"});
        }
    }).catch(err=>{
        res.status(500).send({})
    });
});

module.exports = Router;
