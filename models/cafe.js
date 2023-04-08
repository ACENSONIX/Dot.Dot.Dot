const dbConn= require('./../utils/dbConnection')
const Sequelize= require('sequelize')

const Cafe_Model= dbConn.define('cafe', {
    owner: Sequelize.STRING,
    name : Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    location : Sequelize.STRING,
    phone: Sequelize.STRING,
    address: Sequelize.STRING,
    zip: Sequelize.STRING,
    gstNo : Sequelize.STRING,
    pan : Sequelize.STRING,
    fssai : Sequelize.STRING,  
});

module.exports= Cafe_Model;

