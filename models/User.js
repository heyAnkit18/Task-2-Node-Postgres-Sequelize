const {DataTypes}=require('sequelize');
const sequelize=require('../config/db');

const User=sequelize.define('User',{
    username:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    Mobile:{
        type:DataTypes.BIGINT,
        allowNull:false,
    },
    Adress:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    Employee_id:{
        type:DataTypes.BIGINT,
        allowNull:true,
    },
    timestamps: true,
});

module.exports=User;