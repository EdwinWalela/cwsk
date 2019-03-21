const Router = require("express").Router();
const Role =require("../../models/roles");
const tokenVerification = require("../middleware/tokenVerification");

Router.post("/",tokenVerification,(req,res)=>{
    let newRole = Role.create({
        name:req.body.name
    });

    Promise.all([newRole]).then(values=>{
        res.status(201).send({msg:"OK"});
    }).catch(err=>{
        res.status(500).send({err});
    })
})

Router.get("/",tokenVerification,(req,res)=>{
    let roles = Role.findAll({});

    Promise.all([roles]).then(values=>{
        res.send({roles:values[0]})
    }).catch(err=>{
        res.status(500).send({err})
    })
})

module.exports = Router
