const dbConn= require('./../utils/dbConnection')
const Sequelize= require('sequelize')

const User_Model= dbConn.define('user', {
   firstName : Sequelize.STRING,
   lastName: Sequelize.STRING,
   email: Sequelize.STRING,
   password: Sequelize.STRING,
   location : Sequelize.STRING,
   phone: Sequelize.STRING,
   address: Sequelize.STRING,
   zip: Sequelize.STRING,
   aadhar: Sequelize.STRING,
   pan: Sequelize.STRING,
   dob: Sequelize.STRING,
   image : Sequelize.STRING,
   docVerfied : Sequelize.STRING
})

module.exports= User_Model;