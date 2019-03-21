const Router = require('express').Router();
const upload = require('../../config/fileStorage');

//Models
const Asset = require("../../models/assets");
const Tps = require('../../models/tps');
const Type = require('../../models/type');

// Middleware
const tokenVerification = require("../middleware/tokenVerification");

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
Router.post('/',tokenVerification,/*upload.single('pic'),*/(req,res)=>{
    let asset = req.body;
    
    let newAsset = Asset.create({
        name:asset.name,
        pic:null,
        //pic:asset.pic, ---- TODO(file storage)
        tag:asset.tag,
        cost:asset.cost,
        valuation:asset.valuation,
        insurance:asset.insurance,
        typeId:asset.type,
        tpsId:asset.tps
    }).then(values => {
       res.status(201).send({msg:"OK"})
    }).catch(err=>{
        res.status(500).send({err})
    });
})
//@ROUTE: get asset by PK
Router.get('/:id',tokenVerification,(req, res) => {
    let asset = Asset.findByPk(req.params.id,{include: [Tps,Type]});
    Promise.all([asset]).then(values=>{
        if(values[0] !== null){
            res.send({asset:values[0]});
        }else{
            res.status(404).send({msg:"Not Found"})
        }
       
    }).catch(err=>{
        res.status(500).send({err})
    });
});
//@ROUTE: update asset by PK
Router.put('/:id',tokenVerification,(req,res)=>{
    let asset = req.body;

    let updateAsset = Asset.update({
        name:asset.name,
        pic:asset.pic,
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
            res.status(404).send({msg:"Not Found"});
        }
    }).catch(err=>{
        res.status(500).send({err})
    });
});
//@ROUTE: delete asset by PK
Router.delete('/:id',tokenVerification,(req,res)=>{

    let updateAsset = Asset.destroy({
      where: {
        id: req.params.id
      }
    });

    Promise.all([updateAsset]).then(values=>{
        if(values[0] >= 1){
            res.status(204).send({msg:"OK"});
        }else{
            res.status(404).send({msg:"Not Found"})
        }
    }).catch(err=>{
        res.status(500).send({err})
    });
});

module.exports = Router;
