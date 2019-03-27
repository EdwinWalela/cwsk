const Sequelize = require("sequelize");
const sequelize = require('../config/dbconfig');

//MODELS
const Asset = require('./assets');

const Support = sequelize.define('support',{
    name:{
        type:Sequelize.STRING
    },
    cost: Sequelize.STRING,
    details: Sequelize.TEXT,
  },{
    timestamps: true, // timestamps will now be true
    getterMethods:{
      created_at: function(){
        return dateFormat(this.createdAt, "mmm dS, yyyy, h:MM:ss TT");
      },
      updated_at: function(){
        return dateFormat(this.updatedAt, "mmm dS, yyyy, h:MM:ss TT");
      }
    }
  });

Support.belongsTo( Asset, {foreignKey: 'assetId'});

module.exports = Support;
