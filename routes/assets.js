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
        insuarance:asset.insuarance
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

//@ROUTE: create asset insuarance 
Router.post('/:id/insurance',(req,res)=>{
    let insuarance = req.body;

    let newInsuarance = Insuarance.create({
        name:insuarance.name,
        cost:insuarance.cost,
        details:insuarance.details,
        assetId:req.params.id
    });

    Promise.all([newInsuarance]).then(values=>{
        //res.redirect('')
    }).catch(err=>{
        console.log(err)
        //res.redirect('')
    });
})

//@ROUTE: create asset valuation
Router.post('/:id/valuation',(req,res)=>{
    let valuation = req.body;

    let newValuation = Valuation.create({
        price_now:valuation.price_now,
        details:valuation.details,
        assetId:req.params.id
    });

    Promise.all([newValuation]).then(values=>{
        //res.redirect('/dashboard');
    }).catch(err=>{
        console.log(err)
        //res.redirect('/dashboard');
    });
})


//@ROUTE: create asset support
Router.post('/:id/support',(req,res)=>{
    let support = req.body;

    let newSupport = Support({
        name:support.name,
        cost:support.cost,
        details:support.details,
        assetId:req.params.id
    });

    Promise.all([newSupport]).then(values=>{
        //res.render('/dashboard',{})
    }).catch(err=>{
        console.log(err);
        //res.render('/dashboard')'
    });
})

module.exports = Router;    