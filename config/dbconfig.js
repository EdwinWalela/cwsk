const Sequelize = require("sequelize");
require('dotenv').config();
// DB connection
//
const sequelize = new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASS,{
    host:process.env.DB_HOST,
    dialect:'postgres',
    operatorsAliases:false,
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    }
});

sequelize.authenticate()
    .then(()=>{
        console.log('success : db connection established')
    })
    .catch(err=>{
        console.log(err);
        process.exit(1);
    });

sequelize.sync({
  force:false  //  IF YOU SET THIS TO FALSE, IT WONT RECREATE THE DATABASE
});

module.exports = sequelize;
