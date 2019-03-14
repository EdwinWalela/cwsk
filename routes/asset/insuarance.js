const Router = require('express').Router();
const Insuarance = require('../../models/insurance');

//@ROUTE: create asset insuarance (req.params.id === assetID)
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
});

//@NOTE: req.params.id === insuarance PK
Router.get('/:id',(req,res)=>{
    let insuarance = Insuarance.findByPk(req.params.id);
    Promise.all([insuarance]).then(values=>{
        // res.render('/insuarance',
        //     {insuarance:values[0]}
        // );
    }).catch(err=>{
        console.log(err);
        // res.render('/insuarance',{});
    })
})

Router.get('/all',(req,res)=>{
    let allInsuarance = Insuarance.findAll();

    Promise.all([allInsuarance]).then(values=>{
        // res.render('/insuarances',
        //     {insuarances:values[0]}
        // );
    }).catch(err=>{
        console.log(err)
        // res.render('/insuarances',
        //     {insuarances:null}
        // );
    })
})

module.exports = Router;
