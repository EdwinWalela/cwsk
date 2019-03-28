const Sequelize = require("sequelize");
const bcrypt = require('bcryptjs');
const dateFormat = require('dateformat');

//CONFIGS
const sequelize = require('../config/dbconfig');
//MODELS
const Role = require('./roles');
const Tps = require('./tps');

const User = sequelize.define('users',{
      firstName:{
          type:Sequelize.STRING
      },
      lastName:{
          type:Sequelize.STRING
      },
      alias: Sequelize.STRING,
      phone: Sequelize.STRING,
      email: Sequelize.STRING,
      idno: {
        type: Sequelize.STRING,
        unique: true
      },
      dob: Sequelize.STRING,
      resetCode: Sequelize.STRING,
      permissions:{ 
        type: Sequelize.STRING,
        allowNull:true,
        get(){
          return this.getDataValue('permissions').split(",")
        },
        set(val){
          this.setDataValue('permissions',val.join())
        }
      },
      password: Sequelize.STRING,
      confirmed: Sequelize.BOOLEAN
    },{
      timestamps: true, // timestamps will now be true
      getterMethods:{
        created_at: function(){
          return dateFormat(this.createdAt, "mmm dS, yyyy, h:MM:ss TT");
        },
        updated_at: function(){
          return dateFormat(this.updatedAt, "mmm dS, yyyy, h:MM:ss TT");
        }
      },
      hooks: {
        beforeCreate: (user, options) => {
          user.password = bcrypt.hashSync(user.password, 10);
        }
      }
  });

User.belongsTo( Role, {foreignKey: 'roleId'});
User.belongsTo( Tps, {foreignKey: 'tpsId'});

module.exports = User;
