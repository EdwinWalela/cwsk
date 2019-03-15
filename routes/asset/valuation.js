const Router = require('express').Router();
const Valuation = require('../../models/assetValuation');

Router.get('/',(req,res)=>{
    let allValuations = Valuation.findAll();

    Promise.all([allValuations]).then(values=>{
        res.render('/valuation/index',
            {valuations:values[0]}
        );
    }).catch(err=>{
        console.log(err);
        // res.render('/valutations',{valuation:null});
    });
})

//@ROUTE: create asset valuation (req.params.id === assetId)
Router.post('/valuation',(req,res)=>{
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

//@NOTE: req.params.id === valuation PK
Router.get('/:id',(req,res)=>{
    let valuation = Valuation.findByPk(req.params.id);

    Promise.all([valuation]).then(values=>{
        res.render('/valuation',{valuation:values[0]});
    }).catch(err=>{
        console.log(err)
        // res.render('/valuaton',{valuation:null})
    });
});

module.exports = Router;
