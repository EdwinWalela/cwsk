const Router = require('express').Router();
const Support = require('../../models/support');
const Asset = require('../../models/assets');

//@ROUTE: create support
Router.post('/',(req,res)=>{
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
        res.status(500).send({})
    });
});
//@ROUTE: get all support
Router.get('/',(req,res)=>{
    let allSupport = Support.findAll({});

    Promise.all([allSupport]).then(values=>{
        res.send({support:values[0]});
    }).catch(err=>{
        res.status(500).send({support:[]});
    });
});
//@ROUTE: get support by PK
Router.get('/:id',(req,res)=>{
   let support = Support.findByPk(req.params.id);

   Promise.all([support]).then(values=>{
        res.send({support:values[0]});
   }).catch(err=>{
        res.status(500).send({})
    });
});
//@ROUTE: update support by PK
Router.put('/:id',(req,res)=>{
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
        res.status(200).send({msg:"OK"})
    }).catch(err=>{
        res.status(500).send({})
    })
});
//@ROUTE: delete support by PK
Router.delete('/:id',(req,res)=>{
    let newSupport = Support.destroy({
        where: {
          id: req.params.id
        }
    });
    Promise.all([newSupport]).then(values=>{
        res.status(204).send({})
    }).catch(err=>{
        res.status(500).send({})
    })
});

module.exports = Router;
