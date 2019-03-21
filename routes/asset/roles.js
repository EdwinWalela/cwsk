const Router = require("express").Router();
const Role = require("../../models/roles");
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
});

Router.get("/",tokenVerification,(req,res)=>{
    let roles = Role.findAll({});

    Promise.all([roles]).then(values=>{
        res.send({roles:values[0]})
    }).catch(err=>{
        res.status(500).send({err})
    })
});

Router.delete("/:id",tokenVerification,(req,res)=>{
    let deleteRole = Role.destroy({
        where:{
            id:req.params.id
        }
    });

    Promise.all([deleteRole]).then(values=>{
        if(values[0] >= 1 ){
            res.status(204).send({});
        }else{
            res.status(404).send({msg:"Role Not Found"});
        }
    }).catch(err=>{
        res.status(500).send({err})
    });
});

module.exports = Router
