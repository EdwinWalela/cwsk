const Sequelize = require("sequelize");
const sequelize = require('../config/dbconfig');

const Asset = require('./assets');
const dateFormat = require('dateformat');

const Insurance = sequelize.define('insurance',{
    name: Sequelize.STRING,
    cost:Sequelize.STRING,
    details:{
        type:Sequelize.TEXT
    }
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

Insurance.belongsTo( Asset, {foreignKey: 'assetId'});

module.exports = Insurance;
