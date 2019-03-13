const Router = require('express').Router();
const upload = require('../config/fileStorage');
const Tps = require('../models/tps');

//@ROUTE: view tps
Router.get('/:id',(req,res)=>{
    let tps = Tps.findByPk(req.params.id);
    Promise.all([tps]).then(values=>{
        // res.render('/tps',
        //     {tps:values[0]}
        // )
    });
})

Router.get('/all',(req,res)=>{
    let allTps = Tps.findAll();
    
    Promise.all([allTps]).then(values=>{
        // res.render('/search',
        //     {tps:values[0]}
        // );
    })
})


//@ROUTE: create tps
Router.post('/',(req,res)=>{
    let tps = req.body
    let newTps = Tps.create({
        name:tps.name,
        alias:tps.alias,
        location:tps.location,
        address:tps.address,
        phone:tps.phone,
        type:tps.type,
        status:true,
    });

    Promise.all([newTps]).then(values=>{
        //res.redirect('/dashboard');
    }).catch(err=>{
        console.log(err)
        //res.redirect('/');
    })
})

//@ROUTE: update tps
Router.post('/:id',(req,res)=>{
    
})


module.exports = Router;    