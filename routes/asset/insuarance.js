const Router = require('express').Router();
const Insurance = require('../../models/insurance');
const Asset = require('../../models/assets');

//@ROUTE: get all insurances
Router.get('/',(req,res)=>{
    let allInsurance = Insurance.findAll({include:[Asset]});

    Promise.all([allInsurance]).then(values=>{
        res.send({insurances:values[0]});
    }).catch(err=>{
        res.status(500).send({insurances:[]});
    });
});
//@ROUTE: create asset insurance
Router.post('/',(req,res)=>{
    let insurance = req.body;

    let newInsurance = Insurance.create({
        name:insurance.name,
        cost:insurance.cost,
        details:insurance.details,
        assetId:insurance.asset
    });

    Promise.all([newInsurance]).then(values=>{
        res.status(201).send({msg:"OK"})
    }).catch(err=>{
       res.status(500).send({msg:"err"})
    });
});
//@ROUTE: get insurance by PK
Router.get('/:id',(req,res)=>{
    let insurance = Insurance.findByPk(req.params.id,{include:[Asset]});
    Promise.all([insurance]).then(values=>{
        if(values[0] !== null){
            res.send({insurance:values[0]});
        }else{
            res.status(404).send({msg:"Not Found"});
        }
    }).catch(err=>{
        res.status(500).send({});
    });
});
//@ROUTE: update insurance by PK
Router.put('/:id',(req,res)=>{
    let insurance = req.body;

    let newInsurance = Insurance.update({
        name:insurance.name,
        cost:insurance.cost,
        details:insurance.details,
        assetId:insurance.asset
    },{
        where: {
          id: req.params.id
        }
    });

    Promise.all([newInsurance]).then(values=>{
        if(values[0] >= 1){
            res.send({msg:"OK"})
        }else{
            res.status(404).send({msg:"Not Found"});
        }
    }).catch(err=>{
        res.status(500).send({})
    });
});
//@ROUTE: delete insurance by PK
Router.delete('/:id',(req,res)=>{
    let newInsurance = Insurance.destroy({
        where: {
          id: req.params.id
        }
    });

    Promise.all([newInsurance]).then(values=>{
        if(values[0] >= 1){
            res.status(204).send({}) 
        }else{
            res.status(404).send({msg:"Not Found"});
        }
    }).catch(err=>{
        res.status(500).send({})
    });
});

module.exports = Router;
