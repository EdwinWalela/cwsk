const Router = require("express").Router();
const DB_INIT = require('../routes/middleware/initializeDB');

Router.get('/',(req,res)=>{
    res.send('Hello World')
});

Router.get('/init',DB_INIT,(req,res)=>{
    res.send({msg:"OK"})
})

module.exports = Router;
