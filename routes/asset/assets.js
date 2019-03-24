const Router = require('express').Router();
const upload = require('../../config/fileStorage');

//Models
const Asset = require("../../models/assets");
const Tps = require('../../models/tps');
const Type = require('../../models/type');

// Middleware
const tokenVerification = require("../middleware/tokenVerification");
const permissions = require("../middleware/permissionVerification");

//@ROUTE: get all assets
Router.get('/',tokenVerification,(req,res)=>{
    let assets = Asset.findAll({include: [Tps,Type]});

    Promise.all([assets]).then(values=>{
        res.send({assets:values[0]})
    }).catch(err => {
        res.status(500).send({err})
    })
});
//@ROUTE: create asset
Router.post('/',tokenVerification,permissions.Create,upload.single('pic'),(req,res)=>{
    let asset = req.body;
    let image;
    if(typeof req.file !== "undefined"){
        image = req.file
    }else{
        image =""
    }

    let newAsset = Asset.create({
        name:asset.name,
        pic:image,
        tag:asset.tag,
        cost:asset.cost,
        valuation:asset.valuation,
        insurance:asset.insurance,
        typeId:asset.type,
        tpsId:asset.tps,
        status:true
    });
    
    Promise.all([newAsset]).then(values => {
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
            res.status(500).send('err');
        }
    })
})
//@ROUTE: get asset by PK
Router.get('/:id',tokenVerification,(req, res) => {
    let asset = Asset.findByPk(req.params.id,{include: [Tps,Type]});
    Promise.all([asset]).then(values=>{
        if(values[0] !== null){
            res.send({asset:values[0]});
        }else{
            res.status(404).send({msg:"Asset Not Found"})
        }
       
    }).catch(err=>{
        res.status(500).send({err})
    });
});
//@ROUTE: update asset by PK
Router.put('/:id',tokenVerification,permissions.Update,upload.single('pic'),(req,res)=>{
    let asset = req.body;
    let image;
    if(typeof req.file !== "undefined"){
        image = req.file
    }else{
        image =""
    }
    
    let updateAsset = Asset.update({
        name:asset.name,
        pic:image,
        cost:asset.cost,
        tag:asset.tag,
        valuation:asset.valuation,
        insurance:asset.insurance,
        typeId:asset.type,
        tpsId:asset.tps,
    },{
      where: {
        id: req.params.id
      }
    });

    Promise.all([updateAsset]).then(values=>{
        if(values[0] >= 1){
            res.send({msg:"OK"});
        }else{
            res.status(404).send({msg:"Asset Not Found"});
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
            res.status(500).send({err})
        }
    });
});
//@ROUTE: delete asset by PK
Router.delete('/:id',tokenVerification,permissions.Delete,(req,res)=>{

    let updateAsset = Asset.destroy({
      where: {
        id: req.params.id
      }
    });

    Promise.all([updateAsset]).then(values=>{
        if(values[0] >= 1){
            res.status(204).send({msg:"OK"});
        }else{
            res.status(404).send({msg:"Asset Not Found"})
        }
    }).catch(err=>{
        res.status(500).send({err})
    });
});
//
module.exports = Router;
