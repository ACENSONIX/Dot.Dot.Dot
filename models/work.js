const dbConn= require('./../utils/dbConnection')
const Sequelize= require('sequelize')


const Work_Model= dbConn.define('work', {
    company : Sequelize.STRING,
    position: Sequelize.STRING,
    startDate : Sequelize.DATE,
    endDate: Sequelize.DATE,
    description: Sequelize.STRING,
    companyContact  : Sequelize.STRING
});


module.exports= Work_Model;
