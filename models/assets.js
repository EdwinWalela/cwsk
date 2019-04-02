const Sequelize = require("sequelize");

const Tps = require('./tps');
const Type = require('./type');
const sequelize = require('../config/dbconfig');
const dateFormat = require('dateformat');
const InsuranceFirm = require('./insuranceFirm')

const Asset = sequelize.define('assets',{
    name:Sequelize.STRING,
    pic:Sequelize.STRING,
    tag:Sequelize.STRING,
    cost: Sequelize.INTEGER,
    valuation:Sequelize.INTEGER,
    details: Sequelize.TEXT,
    status:Sequelize.BOOLEAN
},{
    timestamps: false, // timestamps will now be true
    getterMethods:{
      created_at: function(){
        return dateFormat(this.createdAt, "mmm dS, yyyy, h:MM:ss TT");
      },
      updated_at: function(){
        return dateFormat(this.updatedAt, "mmm dS, yyyy, h:MM:ss TT");
      }
    }
  });

Asset.belongsTo( Tps, {foreignKey: 'tpsId'});
Asset.belongsTo( Type, {foreignKey: 'typeId'});
Asset.belongsTo(InsuranceFirm,{foreignKey:'insuranceFirmId'})

module.exports = Asset;
