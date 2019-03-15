const Router = require('express').Router();
const Insuarance = require('../../models/insurance');
const Asset = require('../../models/assets');


Router.get('/',(req,res)=>{
    let allInsuarance = Insuarance.findAll({});

    Promise.all([allInsuarance]).then(values=>{
        res.render('insurance/index',
            {insurances:values[0]}
        );
    }).catch(err=>{
        console.log(err)
        res.render('insurance/index',
            {insuarances:null}
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
    let insuarance = req.body;

    let newInsuarance = Insuarance.create({
        name:insuarance.name,
        cost:insuarance.cost,
        details:insuarance.details,
        assetId:insuarance.asset
    });

    Promise.all([newInsuarance]).then(values=>{
        res.redirect('/insurance')
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

Router.get('/edit/:id',(req,res)=>{
    let insuarance = Insuarance.findByPk(req.params.id);
    let assets = Asset.findAll({});
    Promise.all([insuarance,assets]).then(values=>{
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
    let insuarance = req.body;

    let newInsuarance = Insuarance.update({
        name:insuarance.name,
        cost:insuarance.cost,
        details:insuarance.details,
        assetId:insuarance.asset
    },{
        where: {
          id: req.params.id
        }
      });

    Promise.all([newInsuarance]).then(values=>{
        res.redirect('/insurance/'+req.params.id)
    }).catch(err=>{
        console.log(err)
        res.redirect('/insurance/'+req.params.id)
    });
});

module.exports = Router;
