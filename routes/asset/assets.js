const Router = require('express').Router();
const upload = require('../../config/fileStorage');

const Asset = require("../../models/assets");
const Insurance = require('../../models/insurance');
const Valuation = require('../../models/assetValuation');
const Support = require('../../models/support');
const Tps = require('../../models/tps');
const Type = require('../../models/type');


//@ROUTE: view asset
Router.get('/', (req,res)=>{
    let assets = Asset.findAll({include: [Tps,Type]});

    Promise.all([assets]).then(values=>{
        console.log(values[0]);
        res.render('asset/index',{assets:values[0]})
    }).catch(err => {
        console.log(err);
    })
});

Router.get('/create',(req, res) => {
  let tps = Tps.findAll({});
  let types = Type.findAll({});
  Promise.all([tps,types]).then(values=>{
      res.render('asset/create',{tps:values[0],types: values[1]});
  }).catch(err=>{
      console.log(err);
  })
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
        typeId:asset.type,
        tpsId:asset.tps
    }).then(values => {
        res.redirect('/assets');
    }).catch(err=>{
        console.log(err);
    });
})

Router.get('/edit/:id',(req, res) => {
  let asset = Asset.findByPk(req.params.id,{include: [Tps,Type]});
  let tps = Tps.findAll({});
  let types = Type.findAll({});
  Promise.all([asset,tps,types]).then(values=>{
      res.render('asset/update',{asset:values[0],tps:values[1],types:values[2]});
  }).catch(err=>{
      console.log(err);
      //res.render('/',{asset:null});
  });
});

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
        res.redirect('/assets');
    }).catch(err=>{
        console.log(err);
        // res.render('/dashboard');
    });
});

//@ROUTE: view asset
Router.get('/:id',(req,res)=>{
    let asset = Asset.findByPk(req.params.id, {include: [Tps,Type]});
    let valuations = Valuation.findAll({
      where: {
        assetId: req.params.id
      }
    });

    let insurance = Insurance.findAll({
      where: {
        assetId: req.params.id
      }
    });

    let support = Support.findAll({
      where: {
        assetId: req.params.id
      }
    });

    Promise.all([asset, valuations, insurance,support]).then(values=>{
        res.render('asset/view',{
          asset:values[0],
          valuations: values[1],
          insurance: values[2],
          support: values[3]
        }
      )
    }).catch(err=>{
        console.log(err);
        //res.render('/',{asset:null});
    })
});

module.exports = Router;
