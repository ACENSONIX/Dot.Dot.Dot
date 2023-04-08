const dbConn= require('./../utils/dbConnection')
const Sequelize= require('sequelize')

const Cafe_Model= dbConn.define('cafe', {
    name : Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    location : Sequelize.STRING,
    phone: Sequelize.STRING,
    address: Sequelize.STRING,
    zip: Sequelize.STRING,
    gstNo : Sequelize.STRING,
    pan : Sequelize.STRING,
    
});

module.exports= Cafe_Model;

