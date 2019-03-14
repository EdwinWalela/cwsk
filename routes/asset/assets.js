const Router = require('express').Router();
const upload = require('../../config/fileStorage');

const Asset = require("../../models/assets");
const Insurance = require('../../models/insurance');
const Valuation = require('../../models/assetValuation');
const Support = require('../../models/support');

//@NOTE: req.params.id === assetID on all routes

//@ROUTE: view asset
Router.get('/',(req,res)=>{
    let assets = Asset.findAll({});

    Promise.all([assets]).then(values=>{
        res.render('asset/index',{asset:values[0]})
    }).catch(err=>{
        console.log(err);
        //res.render('/',{asset:null});
    })
});



Router.get('/create',(req, res) => {
  res.render('asset/create',{});
});

Router.get('/edit/:id',(req, res) => {
  res.render('asset/create',{});
});

//@ROUTE: create asset
Router.post('/store',/*upload.single('pic'),*/(req,res)=>{
    let asset = req.body;
    let newAsset = Asset.create({
        name:asset.name,
        pic:null,
        //pic:asset.pic, ---- TODO(file storage)
        tag:asset.tag,
        valuation:asset.valuation,
        insurance:asset.insurance,
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
Router.post('/update/:id',(req,res)=>{
    let asset = req.body;

    let updateAsset = Asset.update({
        name:asset.name,
        pic:asset.pic,
        tag:asset.tag,
        valuation:asset.valuation,
        insurance:asset.insurance
    },{
      where: {
        id: req.params.id
      }
    });

    Promise.all([updateAsset]).then(values=>{
        //res.redirect('/dashboard');
    }).catch(err=>{
        console.log(err);
        // res.render('/dashboard');
    });
});

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
});

module.exports = Router;
