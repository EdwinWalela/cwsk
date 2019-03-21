const Router = require('express').Router();

// Models
const Tps = require('../../models/tps');

// Middleware
const tokenVerification = require("../middleware/tokenVerification");

//@ROUTE: get all tps
Router.get('/', tokenVerification,(req,res)=>{
    let allTps = Tps.findAll();

    Promise.all([allTps]).then(values=>{
        res.send({tps:values[0]});
    }).catch(err=>{
        res.status(500).send({err})
    })
});
//@ROUTE: create tps
Router.post('/', tokenVerification,(req,res)=>{
    let tps = req.body
    let newTps = Tps.create({
        name:tps.name,
        alias:tps.alias,
        location:tps.location,
        address:tps.address,
        phone:tps.phone,
        type:tps.type,
        status:tps.status,
        description: tps.description
    });

    Promise.all([newTps]).then(values=>{
        res.status(201).send({msg:"OK"})
    }).catch(err=>{
        res.status(500).send({err})
    })
});
//@ROUTE: get tps by PK
Router.get('/:id', tokenVerification,(req,res)=>{
    let tps = Tps.findByPk(req.params.id);
    Promise.all([tps]).then(values=>{
        if(values[0] !==null){
            res.send({tps:values[0]})
        } else{
            res.status(404).send({msg:"Not Found"});
        }
    }).catch(err=>{
        res.status(500).send({err})
    })
});
//@ROUTE: update tps by PK
Router.put('/:id', tokenVerification,(req,res)=>{
    let tps = req.body;

    let updateTps = Tps.update({
        name:tps.name,
        alias:tps.alias,
        location:tps.location,
        address:tps.address,
        phone:tps.phone,
        type:tps.type,
        status:tps.status,
        description: tps.description
    },{
      where: {
        id: req.params.id
      }
    });

    Promise.all([updateTps]).then(values=>{
        if(values[0] >= 1){
            res.send({msg:"OK"})
        }else{
            res.status(404).send({msg:"Not Found"});
        }
    }).catch(err=>{
        res.status(500).send({err})
    });
});
//@ROUTE: delete tps by PK
Router.delete('/:id', tokenVerification,(req,res)=>{
    let deleteTps = Tps.destroy({
      where: {
        id: req.params.id
      }
    });

    Promise.all([deleteTps]).then(values=>{
        if(values[0] >= 1){
            res.status(204).send({})
        }else{
            res.status(404).send({msg:"Not Found"});
        }
    }).catch(err=>{
        res.status(500).send({err})
    });
});

module.exports = Router;
