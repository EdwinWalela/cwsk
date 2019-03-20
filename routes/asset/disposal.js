const Router = require('express').Router();
const upload = require('../../config/fileStorage');

const Asset = require("../../models/assets");
const Disposal = require("../../models/disposal");


//@ROUTE: get all disposals
Router.get('/', (req,res)=>{
    let disposal = Disposal.findAll({include: [Asset]});
    
    Promise.all([disposal]).then(values=>{
        res.send({disposals:values[0]})
    }).catch(err => {
        res.status(500).send({disposals:[]})
    });
});
//@ROUTE: create disposal
Router.post('/',/*upload.single('pic'),*/(req,res)=>{
    let disposal = req.body;
    let newDisposal = Disposal.create({
        purpose:disposal.purpose,
        pic:"",
        //pic:asset.pic, ---- TODO(file storage)
        details:disposal.details,
        price:disposal.price,
        assetId:disposal.asset,
    });
    
    Promise.all([newDisposal]).then(values => {
        res.status(201).send({msg:"OK"})
    }).catch(err=>{
        res.status(500).send({})
    });
});
//@ROUTE: get disposal by PK
Router.get('/:id',(req, res) => {
  let disposal = Disposal.findByPk(req.params.id,{include:[Asset]});
 
  Promise.all([disposal]).then(values=>{
      if(values[0] !== null){
        res.send({disposal:values[0]});
      }
      res.status(404).send({msg:"Not Found"});
  }).catch(err=>{
      res.status(500).send({});
  });
});
//@ROUTE: update disposal by PK
Router.put('/:id',(req,res)=>{
    let disposal = req.body;

    let updateDisposal = Disposal.update({
        purpose:disposal.purpose,
        pic:disposal.pic,
        //pic:asset.pic, ---- TODO(file storage)
        details:disposal.details,
        price:disposal.price,
        assetId:disposal.asset,
    },{
      where: {
        id: req.params.id
      }
    });

    Promise.all([updateDisposal]).then(values=>{
        if(values[0] >= 1){
            res.send({msg:"OK"}); 
        }
        res.status(404).send({msg:"Not Found"});
    }).catch(err=>{
        res.status(500).send({})
    });
});
//@ROUTE: delete disposal by PK
Router.delete('/:id',(req,res)=>{
    let deleteDisposal = Disposal.destroy({
      where: {
        id: req.params.id
      }
    });

    Promise.all([deleteDisposal]).then(values=>{
        if(values[0]>=1){
            res.status(204).send({});
        }
        res.status(404).send({msg:"Not Found"});
    }).catch(err=>{
        res.status(500).send({})
    });
});


module.exports = Router;
