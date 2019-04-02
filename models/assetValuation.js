const Sequelize = require("sequelize");

const Asset = require('./assets');
const sequelize = require('../config/dbconfig');
const dateFormat = require("dateformat")
const AssetValuation = sequelize.define('assetValuation',{
    price_now:{
        type:Sequelize.INTEGER
    },
    details:{
        type:Sequelize.INTEGER
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
  }
);

AssetValuation.belongsTo( Asset, {foreignKey: 'assetId'});

module.exports = AssetValuation;
