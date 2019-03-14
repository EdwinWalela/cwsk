const Router = require('express').Router();
const upload = require('../../config/fileStorage');
const Tps = require('../../models/tps');


Router.get('/',(req,res)=>{
    let allTps = Tps.findAll();

    Promise.all([allTps]).then(values=>{
        res.render('tps/index',
            {tps:values[0]}
        );
    })
});

Router.get('/create',(req, res) => {
  res.render('tps/create',{});
});

Router.get('/edit/:id',(req, res) => {
  let tps = Tps.findByPk(req.params.id);
  Promise.all([tps]).then(values=>{
        res.render('tps/edit',{data: data[0]});
  });
});


//@ROUTE: create tps
Router.post('/store',(req,res)=>{
    let tps = req.body
    let newTps = Tps.create({
        name:tps.name,
        alias:tps.alias,
        location:tps.location,
        address:tps.address,
        phone:tps.phone,
        type:tps.type,
        status:tps.status,
        description: tps.description
    });

    Promise.all([newTps]).then(values=>{
        res.redirect('/tps');
    }).catch(err=>{
        console.log(err)
        //res.redirect('/');
    })
})

//@ROUTE: update tps
Router.post('/update/:id',(req,res)=>{
    let tps = req.body;

    let updateTps = Tps.update({
        name:tps.name,
        alias:tps.alias,
        location:tps.location,
        address:tps.address,
        phone:tps.phone,
        type:tps.type,
        status:tps.status
    });

    Promise.all([updateTps]).then(values=>{
        // res.render('/dashboard');
    }).catch(err=>{
        console.log(err)
        // res.render('/dashboard');
    });
});

//@ROUTE: view tps
Router.get('/:id',(req,res)=>{
    let tps = Tps.findByPk(req.params.id);
    Promise.all([tps]).then(values=>{
        // res.render('/tps',
        //     {tps:values[0]}
        // )
    });
});

module.exports = Router;
