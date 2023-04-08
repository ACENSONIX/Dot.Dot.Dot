
const sequelize = require('./dbConnection');
const Models = require('./allModels');


const All_Table_Relationship = async () => {
             
    //  Defing Relations between Tables   
    Models.User_Model.hasMany(Models.Work_Model);
    Models.Work_Model.belongsTo(Models.User_Model);
    
 /******Syncing models with database ******/
 try {

    await sequelize.sync();
    console.log('Set Relation Sync Database') 
    
} catch(err) { console.log(err); }
                               

}//End of method

module.exports = All_Table_Relationship();