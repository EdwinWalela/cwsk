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

Router.get('/:id',(req,res)=>{
    let insurance = Insurance.findByPk(req.params.id,{include:[Asset]});
    Promise.all([insurance]).then(values=>{
        res.send({insurance:values[0]});
    }).catch(err=>{
        res.status(500).send({});
    });
});

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
        res.send({msg:"OK"})
    }).catch(err=>{
        res.status(500).send({})
    });
});

Router.delete('/:id',(req,res)=>{
    let insurance = req.body;

    let newInsurance = Insurance.destroy({
        where: {
          id: req.params.id
        }
    });

    Promise.all([newInsurance]).then(values=>{
        res.status(204).send({})
    }).catch(err=>{
        res.status(500).send({})
    });
});


module.exports = Router;
