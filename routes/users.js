const Router = require('express').Router();

// Models
const User = require("../models/users");
const Role = require("../models/roles");
const TPS = require("../models/tps");

// MiddleWare
const userVerification = require("../routes/middleware/userVerification");

Router.get('/:id',(req,res)=>{
	let user = User.findOne({
        attributes:{exclude:["password","confirmed","resetCode","updated_at"]},
        where:{
            id:req.params.id
        },
        include:[Role,TPS]
    })
	Promise.all([user]).then(values=>{
		res.status(201).send({user:values[0]});
	}).catch(err=>{
			res.status(500).send({err})
	});
});

Router.put('/:id',userVerification,(req,res)=>{
    let user =  req.body;
    let userUpdate = User.update({
        firstName:user.firstName,
        lastName:user.lastName,
        alias:user.alias,
        phone:user.phone,
        idno:user.idno,
        dob:user.dob,
    });
    
    Promise.all([userUpdate]).then(values=>{
        if( values[0] >=0 ){
            res.send({msg:"OK"})
        }else{
            res.status(404).send({msg:"User not found"})
        }
    }).catch(err=>{
        res.status(500).send({err})
    })
})


module.exports = Router;
