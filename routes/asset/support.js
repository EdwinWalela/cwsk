const Router = require('express').Router();
const Support = require('../../models/support');
const Asset = require('../../models/assets');

Router.get('/',(req,res)=>{
    let allSupport = Support.findAll({});

    Promise.all([allSupport]).then(values=>{
        res.render('support/index',
            {support:values[0]}
        );
    }).catch(err=>{
        console.log(err);
        res.redirect('/support/index',{support:[]});
    });
});


Router.get('/create',(req,res)=>{
    let assets = Asset.findAll({});

    Promise.all([assets]).then(values=>{
        res.render('support/create',
            {assets:values[0]}
        )
    }).catch(err=>{
        console.log(err)
        res.redirect('/support')
    });

});

Router.post('/store',(req,res)=>{
    let support = req.body;

    let newSupport = Support.create({
        name:support.name,
        cost:support.cost,
        details:support.details,
        assetId:support.asset
    });

    Promise.all([newSupport]).then(values=>{
        res.redirect('/support')
    }).catch(err=>{
        console.log(err);
        res.redirect('/support')
    });
})

Router.get('/update/:id',(req,res)=>{
   let support = Support.findByPk(req.params.id);
   let assets = Asset.findAll({});

   Promise.all([support,assets]).then(values=>{
    res.render('support/update',
        {
            support:values[0],
            assets:values[1]
        }
    )
   }).catch(err=>{
       console.log(err)
       res.redirect('/support')
    });
})

Router.post('/update/:id',(req,res)=>{
    let support = req.body;

    let newSupport = Support.update({
        name:support.name,
        cost:support.cost,
        details:support.details
    },{
        where: {
          id: req.params.id
        }
    });
    Promise.all([newSupport]).then(values=>{
        res.redirect('/support');
    }).catch(err=>{
        console.log(err)
        res.redirect('/support')
    })
})

Router.get('/:id',(req,res)=>{
    let support = Support.findByPk(req.params.id);

    Promise.all([support]).then(values=>{
        res.render('support',
            {support:values[0]}
        );
    }).catch(err=>{
        console.log(err)
        // res.render('/support',{support:null})
    });
});

module.exports = Router;
