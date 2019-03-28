const Router = require('express').Router();

// Models
const InsuranceFirm = require('../../models/insuranceFirm');

// Middleware
const tokenVerification = require("../middleware/tokenVerification");
const permissions = require("../middleware/permissionVerification");

//@ROUTE: get all insurances
Router.get('/', tokenVerification,(req,res)=>{
    let allInsurance = InsuranceFirm.findAll({});

    Promise.all([allInsurance]).then(values=>{
        res.send({insuranceFirms:values[0]});
    }).catch(err=>{
        res.status(500).send({insuranceFirms:[]});
    });
});
//@ROUTE: create asset insurance
Router.post('/', tokenVerification,permissions.Create,(req,res)=>{
    let newInsurance = InsuranceFirm.create({
        name:req.body.name
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
    let insuranceFirm = InsuranceFirm.findByPk(req.params.id);
    Promise.all([insuranceFirm]).then(values=>{
        if(values[0] !== null){
            res.send({insuranceFirm:values[0]});
        }else{
            res.status(404).send({msg:"Insurance Firm Not Found"});
        }
    }).catch(err=>{
        res.status(500).send({});
    });
});
//@ROUTE: update insurance by PK
Router.put('/:id', tokenVerification,permissions.Update,(req,res)=>{
    let insuranceFirm = req.body;

    let newInsurance = InsuranceFirm.update({
        name:insuranceFirm.name,
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
    let newInsuranceFirm = InsuranceFirm.destroy({
        where: {
          id: req.params.id
        }
    });

    Promise.all([newInsuranceFirm]).then(values=>{
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
