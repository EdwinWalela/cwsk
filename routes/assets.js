const Router = require('express').Router();
const upload = require('../config/fileStorage');
const Asset = require("../models/assets");

//@ROUTE: view asset
Router.get('/:id',(req,res)=>{

})

//@ROUTE: create asset
Router.post('/',upload.single('pic'),(req,res)=>{

    let asset = req.body;
    Asset.create({
        id:asset.id,
        name:asset.name,
        //pic:asset.pic, ---- TODO(file storage)
        tag:asset.tag,
        valuation:asset.valuation,
        insuarance:asset.insuarance
    })
})

//@ROUTE: update asset
Router.post('/:id',(req,res)=>{
    
})

//@ROUTE: create asset insuarance 
Router.post('/:id/insurance',(req,res)=>{
    
})

//@ROUTE: create asset valuation
Router.post('/:id/valuation',(req,res)=>{
    
})

//@ROUTE: create asset support
Router.post('/:id/support',(req,res)=>{
    
})

module.exports = Router;    