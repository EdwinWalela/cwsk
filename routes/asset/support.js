const Router = require('express').Router();

// Models
const Support = require('../../models/support');
const Asset = require('../../models/assets');

// Middleware
const tokenVerification = require("../middleware/tokenVerification");
const permissions = require("../middleware/permissionVerification");

//@ROUTE: create support
Router.post('/', tokenVerification,permissions.Create,(req,res)=>{
    let support = req.body;

    let newSupport = Support.create({
        name:support.name,
        cost:support.cost,
        details:support.details,
        assetId:support.asset
    });

    Promise.all([newSupport]).then(values=>{
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
//@ROUTE: get all support
Router.get('/', tokenVerification,(req,res)=>{
    let allSupport = Support.findAll({include:[Asset]});

    Promise.all([allSupport]).then(values=>{
        res.send({supports:values[0]});
    }).catch(err=>{
        res.status(500).send({support:[]});
    });
});
//@ROUTE: get support by PK
Router.get('/:id', tokenVerification,(req,res)=>{
   let support = Support.findByPk(req.params.id,{include:[Asset]});

   Promise.all([support]).then(values=>{
        if(values !== null){
            res.send({support:values[0]});
        }else{
            res.status(404).send({msg:"Support Not Found"});
        }
   }).catch(err=>{
        res.status(500).send({})
    });
});
//@ROUTE: update support by PK
Router.put('/:id', tokenVerification,permissions.Update,(req,res)=>{
    let support = req.body;

    let newSupport = Support.update({
        name:support.name,
        cost:support.cost,
        details:support.details
    },{
        where: {
          id: req.params.id
        }
    });
    Promise.all([newSupport]).then(values=>{
        if(values[0] >=1){
            res.send({msg:"OK"})
        }else{
            res.status(404).send({msg:"Support Not Found"});
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
//@ROUTE: delete support by PK
Router.delete('/:id', tokenVerification,permissions.Delete,(req,res)=>{
    let newSupport = Support.destroy({
        where: {
          id: req.params.id
        }
    });
    Promise.all([newSupport]).then(values=>{
        if(values[0] >= 1){
            res.status(204).send({msg:"OK"});
        }else{
            res.status(404).send({msg:"Support Not Found"});
        }
    }).catch(err=>{
        res.status(500).send({})
    })
});

module.exports = Router;
