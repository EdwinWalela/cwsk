const Sequelize = require("sequelize");

const Tps = require('./tps');
const Type = require('./type');
const sequelize = require('../config/dbconfig');

const Asset = sequelize.define('assets',{
    name:Sequelize.STRING,
    pic:Sequelize.STRING,
    tag:Sequelize.STRING,
    cost: Sequelize.STRING,
    valuation:Sequelize.STRING,
    insurance:Sequelize.STRING
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

Asset.belongsTo( Tps, {foreignKey: 'tpsId'});
Asset.belongsTo( Type, {foreignKey: 'typeId'});

module.exports = Asset;
