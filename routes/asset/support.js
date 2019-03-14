const Router = require('express').Router();
const Support = require('../../models/support');

//@ROUTE: create asset support (req.params.id === assetID)
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

Router.get('/:id',(req,res)=>{
    let support = Support.findByPk(req.params.id);

    Promise.all([support]).then(values=>{
        // res.render('/support',
        //     {support:values[0]}
        // );
    }).catch(err=>{
        console.log(err)
        // res.render('/support',{support:null})
    });
});

Router.get('/all',(req,res)=>{
    let allSupport = Support.findAll();

    Promise.all([allSupport]).then(values=>{
        // res.render('/support',
        //     {support:values[0]}
        // );
    }).catch(err=>{
        console.log(err);
        // res.render('/support',{support:null})
    });
});

module.exports = Router;
