const Sequelize = require("sequelize");
const sequelize = require('../config/dbconfig');

const dateFormat = require('dateformat');

const InsuranceFirm = sequelize.define('insurance_firm',{
    name: Sequelize.STRING,
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

module.exports = InsuranceFirm;
