const Router = require('express').Router();
const upload = require('../../config/fileStorage');

// Models
const Asset = require("../../models/assets");
const Disposal = require("../../models/disposal");

// Middleware
const tokenVerification = require("../middleware/tokenVerification");
const permissions = require("../middleware/permissionVerification");

//@ROUTE: get all disposals
Router.get('/', tokenVerification,(req,res)=>{
    let disposal = Disposal.findAll({
        include: [Asset],
        
    });
    
    Promise.all([disposal]).then(values=>{
        res.send({disposals:values[0]})
    }).catch(err => {
        res.status(500).send({disposals:[]})
    });
});
//@ROUTE: create disposal
Router.post('/', tokenVerification,permissions.Create,/*upload.single('pic'),*/(req,res)=>{
    let disposal = req.body;
    let newDisposal = Disposal.create({
        purpose:disposal.purpose,
        pic:"",
        //pic:asset.pic, ---- TODO(file storage)
        details:disposal.details,
        price:disposal.price,
        assetId:disposal.asset,
    });
    let disposedAsset = Asset.update({
        status:false
    },{
        where:{
            id:disposal.asset
        }
    })
    
    Promise.all([newDisposal,disposedAsset]).then(values => {
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
//@ROUTE: get disposal by PK
Router.get('/:id', tokenVerification,(req, res) => {
  let disposal = Disposal.findByPk(req.params.id,{include:[Asset]});
 
  Promise.all([disposal]).then(values=>{
      if(values[0] !== null){
        res.send({disposal:values[0]});
      }else{
        res.status(404).send({msg:"Disposal Not Found"});
      }
  }).catch(err=>{
      res.status(500).send({});
  });
});
//@ROUTE: update disposal by PK
Router.put('/:id', tokenVerification,permissions.Update,(req,res)=>{
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
        }else{
            res.status(404).send({msg:"Disposal Not Found"});
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
//@ROUTE: delete disposal by PK
Router.delete('/:id', tokenVerification,permissions.Delete,(req,res)=>{
    let deleteDisposal = Disposal.destroy({
      where: {
        id: req.params.id
      }
    });
    let currentDisposal = Disposal.find({include:[Asset]},{where:{
        id:req.params.id
    },});

    Promise.all([deleteDisposal,currentDisposal]).then(values=>{
        let assetID = values[0].asset.id
        let updatedAsset = Asset.update({
            status:true
        },{where:{
            id:assetID
        }});
        Promise.all([updatedAsset]).then(value=>{
            console.log("updated asset")
        }).catch(err=>{
            console.log("failed to update asset",err)
        })
        if(values[0]>=1){
            res.status(204).send({});
        }else{
            res.status(404).send({msg:"Disposal Not Found"});
        }
    }).catch(err=>{
        res.status(500).send({err})
    });
});


module.exports = Router;
