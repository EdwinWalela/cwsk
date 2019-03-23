const Router = require("express").Router();

Router.get('/',(req,res)=>{
    res.send('Hello World')
});

Router.get('/init',(req,res)=>{
    res.send({msg:"OK"})
})

module.exports = Router;
