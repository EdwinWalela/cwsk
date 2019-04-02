const Sequelize = require("sequelize");
const sequelize = require('../config/dbconfig');
const InsuranceFirm = require('./insuranceFirm')

const Asset = require('./assets');
const dateFormat = require('dateformat');

const Insurance = sequelize.define('insurance',{
    cost:Sequelize.INTEGER,
    details:{
        type:Sequelize.TEXT
    }
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

Insurance.belongsTo( Asset, {foreignKey: 'assetId'});
Insurance.belongsTo(InsuranceFirm,{foreignKey:'insuranceFirmId'})

module.exports = Insurance;
