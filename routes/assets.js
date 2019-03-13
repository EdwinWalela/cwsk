const Router = require('express').Router();
const upload = require('../config/fileStorage');

const Asset = require("../models/assets");
const Insuarance = require('../models/insurance');
const Valuation = require('../models/assetValuation');
const Support = require('../models/support');

//@NOTE: req.params.id === assetID on all routes

//@ROUTE: view asset
Router.get('/:id',(req,res)=>{
    let asset = Asset.findByPk(req.params.id);

    Promise.all([asset]).then(values=>{
        //res.render('/asset',
        //     {asset:values[0]}
        // )
    }).catch(err=>{
        console.log(err);
        //res.render('/',{asset:null});
    })
})

//@ROUTE: create asset
Router.post('/',upload.single('pic'),(req,res)=>{
    let asset = req.body;
    let newAsset = Asset.create({
        name:asset.name,
        pic:null,
        //pic:asset.pic, ---- TODO(file storage)
        tag:asset.tag,
        valuation:asset.valuation,
        insuarance:asset.insuarance,
        typeId:asset.typeId,
        tpsId:asset.tpsId
    });
    Promise.all([newAsset]).then(values=>{
        //res.render('/dashboard')
    }).catch(err=>{
        console.log(err)
        //res.render('/dashboard')
    });
})

//@ROUTE: update asset
Router.post('/:id',(req,res)=>{
    
})

module.exports = Router;    