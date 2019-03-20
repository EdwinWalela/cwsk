const Router = require('express').Router();
const upload = require('../../config/fileStorage');
const Asset = require("../../models/assets");
const Tps = require('../../models/tps');
const Type = require('../../models/type');

//@ROUTE: get all assets
Router.get('/', (req,res)=>{
    let assets = Asset.findAll({include: [Tps,Type]});

    Promise.all([assets]).then(values=>{
        res.send({assets:values[0]})
    }).catch(err => {
        res.status(500).send({err})
    })
});
//@ROUTE: create asset
Router.post('/',/*upload.single('pic'),*/(req,res)=>{
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
Router.get('/:id',(req, res) => {
    let asset = Asset.findByPk(req.params.id,{include: [Tps,Type]});
    let tps = Tps.findAll({});
    let types = Type.findAll({});
    Promise.all([asset,tps,types]).then(values=>{
        res.send({asset:values[0]});
    }).catch(err=>{
        res.status(500).send({err})
    });
});
//@ROUTE: update asset by PK
Router.put('/:id',(req,res)=>{
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
        res.send({msg:"OK"});
    }).catch(err=>{
        res.status(500).send({err})
    });
});
//@ROUTE: delete asset by PK
Router.delete('/:id',(req,res)=>{

    let updateAsset = Asset.destroy({
      where: {
        id: req.params.id
      }
    });

    Promise.all([updateAsset]).then(values=>{
        res.status(204).send({});
    }).catch(err=>{
        res.status(500).send({err})
    });
});

module.exports = Router;
