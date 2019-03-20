const Router = require('express').Router();
const Valuation = require('../../models/assetValuation');
const Asset = require('../../models/assets');

//@ROUTE: get all valutation
Router.get('/',(req,res)=>{
    let allValuations = Valuation.findAll({include:[Asset]});

    Promise.all([allValuations]).then(values=>{
        res.send({valuations:values[0]});
    }).catch(err=>{
        res.status(500).send({})
    });
})
//@ROUTE: create valuation
Router.post('/',(req,res)=>{
    let valuation = req.body;

    let newValuation = Valuation.create({
        price_now:valuation.price,
        details:valuation.details,
        assetId:valuation.asset
    });

    Promise.all([newValuation]).then(values=>{
       res.status(201).send({msg:"OK"})
    }).catch(err=>{
       res.status(500).send({})
    });
})
//@ROUTE: get valuation by PK
Router.get('/:id',(req,res)=>{
    let valuation = Valuation.findByPk(req.params.id,{include:[Asset]});
    Promise.all([valuation]).then(values=>{
        if(values[0] !== null){
            res.send({valuation:values[0]});
        }
        res.status(404).send({msg:"Not Found"});
    }).catch(err=>{
        res.status(500).send({err})
    });
});
//@ROUTE: update valuation by PK
Router.put('/:id',(req,res)=>{
    let valuation = req.body;

    let newValuation = Valuation.update({
        price_now:valuation.price,
        details:valuation.details,
        assetId:valuation.asset
    },{where:{
        id:req.params.id
    }});

    Promise.all([newValuation]).then(values=>{
        if (values[0 >= 1]) {
            res.send({msg:"OK"});
        }
       res.status(404).send({msg:"Not Found"})
    }).catch(err=>{
       res.status(500).send({});
    });
})
//@ROUTE: delete valuation by PK
Router.delete('/:id',(req,res)=>{
    let newValuation = Valuation.destroy({
        where:{
            id:req.params.id
        }
    });

    Promise.all([newValuation]).then(values=>{
        if (values[0] >=1) {
            res.status(204).send({});
        }
       res.status(404).send({msg:"Not Found"});
    }).catch(err=>{
       res.status(500).send({});
    });
})

module.exports = Router;
