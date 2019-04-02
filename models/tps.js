const Sequelize = require("sequelize");
const sequelize = require('../config/dbconfig');
const dateFormat = require('dateformat');

const Tps = sequelize.define('tps',{
    name:{
        type:Sequelize.STRING,
        unique: true
    },
    alias: Sequelize.STRING,
    location: Sequelize.STRING,
    address: Sequelize.STRING,
    phone: Sequelize.STRING,
    type: Sequelize.STRING,
    status: Sequelize.BOOLEAN,
    description: Sequelize.TEXT
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

//Tps.belongsTo( Tps, {foreignKey: 'tpsId'});

module.exports = Tps;
