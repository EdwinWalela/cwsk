const Router = require('express').Router();
const Insurance = require('../../models/insurance');
const Asset = require('../../models/assets');


Router.get('/',(req,res)=>{
    let allInsurance = Insurance.findAll({});

    Promise.all([allInsurance]).then(values=>{
        res.render('insurance/index',
            {insurances:values[0]}
        );
    }).catch(err=>{
        console.log(err)
        res.render('insurance/index',
            {insurances:null}
        );
    });
});

//@ROUTE: render create forms
Router.get('/create',(req,res)=>{
    let assets = Asset.findAll({});
    Promise.all([assets]).then(values=>{
        res.render('insurance/create',
            {assets:values[0]}
        );
    }).catch(err=>{
        console.log(err)
        res.redirect('insurance/create');
    });
})

//@ROUTE: create asset insuarance
Router.post('/store',(req,res)=>{
    let insurance = req.body;

    let newInsurance = Insurance.create({
        name:insurance.name,
        cost:insurance.cost,
        details:insurance.details,
        assetId:insurance.asset
    });

    Promise.all([newInsurance]).then(values=>{
        res.redirect('/insurance')
    }).catch(err=>{
        console.log(err)
        //res.redirect('')
    });
});

Router.get('/edit/:id',(req,res)=>{
    let insurance = Insurance.findByPk(req.params.id,{include:[Asset]});
    let assets = Asset.findAll({});
    Promise.all([insurance,assets]).then(values=>{
        console.log(values);
        res.render('insurance/update',
            {
                insurance:values[0],
                assets:values[1]
            }
        );
    }).catch(err=>{
        console.log(err)
        res.redirect('/insurance/edit'+req.params.id);
    });
});

Router.post('/update/:id',(req,res)=>{
    let insurance = req.body;

    let newInsurance = Insurance.update({
        name:insurance.name,
        cost:insurance.cost,
        details:insurance.details,
        assetId:insurance.asset
    },{
        where: {
          id: req.params.id
        }
      });

    Promise.all([newInsurance]).then(values=>{
        res.redirect('/insurance')
    }).catch(err=>{
        console.log(err)
        res.redirect('/insurance/'+req.params.id)
    });
});

//@NOTE: req.params.id === insuarance PK
Router.get('/:id',(req,res)=>{
    let insurance = Insurance.findByPk(req.params.id,{include:[Asset]});
    Promise.all([insurance]).then(values=>{
        // res.render('/insuarance',
        //     {insuarance:values[0]}
        // );
    }).catch(err=>{
        console.log(err);
        // res.render('/insuarance',{});
    })
});

module.exports = Router;
