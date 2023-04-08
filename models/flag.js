const dbConn= require('./../utils/dbConnection')
const Sequelize= require('sequelize')

const Flag_Model= dbConn.define('flag', {
    type : Sequelize.ENUM('Red','Orange' , 'Yellow' , 'Green'),
    reason: Sequelize.STRING,
    description : Sequelize.STRING,
});


module.exports= Work_Model;