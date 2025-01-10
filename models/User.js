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
},{
    timestamps: true,
});

module.exports=User;