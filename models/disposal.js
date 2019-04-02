const Sequelize = require("sequelize");
const dateFormat = require('dateformat');
const Asset = require('./assets');
const sequelize = require('../config/dbconfig');

const Disposal = sequelize.define('disposal',{
    purpose:Sequelize.STRING,
    details:{
        type:Sequelize.TEXT
    },
    price:{
        type:Sequelize.INTEGER
    },
    pic:{
        type:Sequelize.STRING
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

Disposal.belongsTo( Asset, {foreignKey: 'assetId'});

module.exports = Disposal;
