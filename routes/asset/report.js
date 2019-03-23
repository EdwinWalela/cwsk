const Router = require("express").Router();
const sequelize = require("../../config/dbconfig");

// Models
const Asset = require("../../models/assets");
const TPS = require("../../models/tps");

//Middleware

const tokenVerification = require("../middleware/tokenVerification");

Router.get('/',tokenVerification,(req,res)=>{
    let assetCount = Asset.count({});
    let tpsCount = TPS.count({});
    let assetTotalValue = sequelize.query("SELECT SUM(VALUATION) as assetTotalValue FROM ASSETS", { type: sequelize.QueryTypes.SELECT});

    Promise.all([assetCount,tpsCount,assetTotalValue]).then(values=>{
        res.send({
            assets:values[0],
            tps:values[1],
            assetValuation:values[2]
        });
    }).catch(err=>{
        res.status(500).send({err})
    })
})

module.exports = Router
