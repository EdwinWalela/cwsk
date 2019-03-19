const Router = require('express').Router();
const Tps = require('../../models/tps');


Router.get('/',(req,res)=>{
    let allTps = Tps.findAll();

    Promise.all([allTps]).then(values=>{
        res.send({tps:values[0]});
    }).catch(err=>{
        res.status(500).send({err})
    })
});

Router.post('/',(req,res)=>{
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

Router.get('/:id',(req,res)=>{
    let tps = Tps.findByPk(req.params.id);
    Promise.all([tps]).then(values=>{
         res.send({tps:values[0]})
    }).catch(err=>{
        res.status(500).send({err})
    })
});

Router.put('/:id',(req,res)=>{
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
        res.send({msg:"OK"})
    }).catch(err=>{
        res.status(500).send({err})
    });
});

Router.delete('/:id',(req,res)=>{
    let tps = req.body;

    let updateTps = Tps.destroy({
      where: {
        id: req.params.id
      }
    });

    Promise.all([updateTps]).then(values=>{
        res.send({msg:"OK"})
    }).catch(err=>{
        res.status(500).send({err})
    });
});

module.exports = Router;
