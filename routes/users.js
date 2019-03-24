const Router = require('express').Router();
const Sequelize = require("../config/dbconfig");
const Op = Sequelize.Op

// Models
const User = require("../models/users");
const Role = require("../models/roles");
const TPS = require("../models/tps");

// MiddleWare
const userVerification = require("../routes/middleware/userVerification");
const adminPermission = require("../routes/middleware/permissionVerification").Delete
const tokenVerification = require("../routes/middleware/tokenVerification");

Router.get('/',tokenVerification,adminPermission,(req,res)=>{
    let query = req.query.permission;
    let filter;
    if(query === "create"){
        filter = "%c%"
    }else if(query === "delete"){
        filter = "%d%"
    }else if(query === "update"){
        filter = "%u%"
    }else{
        filter =""
    }
    let users = User.findAll({
        include:[Role,TPS],
        attributes:{exclude:["password","confirmed","resetCode","updated_at"]},
        where:{
            permissions:{
                [Op.like]:filter
            }

        }
    });

    Promise.all([users]).then(values=>{
        res.send({users:values[0]})
    }).catch(err=>{
        res.status(500).send({err})
    })
});

Router.get('/:id',tokenVerification,(req,res)=>{
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

Router.put('/:id',tokenVerification,userVerification,(req,res)=>{
    let user =  req.body;
    console.log(req.body)
    console.log(req.params.id)
    let userUpdate = User.update({
        firstName:user.firstName,
        lastName:user.lastName,
        alias:user.alias,
        phone:user.phone,
        idno:user.idno,
        dob:user.dob,
    },{
        where:{
            id:req.params.id
        }
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
});

Router.put('/:id/role',tokenVerification,adminPermission,(req,res)=>{
    let perms = [];
    if(req.body.create === "1"){
        perms.push("c")
    }
    if(req.body.update === "1"){
        perms.push("u")
    }
    if(req.body.delete === "1"){
        perms.push("d")
    }

    let userUpdate = User.update({
         permissions:perms
        },{where:{
            id:req.params.id
        }
    });

    Promise.all([userUpdate]).then(values=>{
        if ( values[0] >= 1 ){
            res.send({msg:"OK"})
        }else{
            res.status(404).send({msg:"User Not Found"})
        }
    }).catch(err=>{
        res.status(500).send({err})
    })
});



module.exports = Router;
