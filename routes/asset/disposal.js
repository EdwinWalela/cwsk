const Router = require('express').Router();
const upload = require('../../config/fileStorage');

const Asset = require("../../models/assets");
const Disposal = require("../../models/disposal");
const Tps = require('../../models/tps');
const Type = require('../../models/type');


//@ROUTE: view disposals
Router.get('/', (req,res)=>{
    let disposal = Disposal.findAll({include: [Asset]});
    
    Promise.all([disposal]).then(values=>{
        res.render('disposal/index',{disposals:values[0]})
    }).catch(err => {
        console.log(err);
        res.render('disposal/index',{disposals:[]})
    })
});

Router.get('/create',(req, res) => {
  let assets = Asset.findAll({});

  Promise.all([assets]).then(values=>{
      res.render('disposal/create',{
          assets:values[0]
        }
    );
  }).catch(err=>{
      console.log(err);
      res.redirect('/');
  })
});

//@ROUTE: create disposal
Router.post('/store',/*upload.single('pic'),*/(req,res)=>{
    let disposal = req.body;
    let newDisposal = Disposal.create({
        purpose:disposal.name,
        pic:null,
        //pic:asset.pic, ---- TODO(file storage)
        details:disposal.details,
        price:disposal.price,
        assetId:disposal.asset,
    });
    
    Promise.all([newDisposal]).then(values => {
        res.redirect('/disposal');
    }).catch(err=>{
        console.log(err);
    });
})

Router.get('/edit/:id',(req, res) => {
  let disposal = Disposal.findByPk(req.params.id);
  Promise.all([disposal]).then(values=>{
      res.render('disposal/update',{disposals:values[0]});
  }).catch(err=>{
      console.log(err);
      res.redirect('/disposal')
  });
});

//@ROUTE: update disposal
Router.post('/update/:id',(req,res)=>{
    let disposal = req.body;

    let updateAsset = Asset.update({
        purpose:disposal.name,
        pic:null,
        //pic:asset.pic, ---- TODO(file storage)
        details:disposal.details,
        price:disposal.price,
        insurance:asset.insurance,
        assetId:disposal.asset,
    },{
      where: {
        id: req.params.id
      }
    });

    Promise.all([updateAsset]).then(values=>{
        res.redirect('/disposal');
    }).catch(err=>{
        console.log(err);
        res.redirect('/disposal')
    });
});


module.exports = Router;
