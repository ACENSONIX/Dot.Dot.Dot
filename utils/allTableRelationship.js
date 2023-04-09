
const sequelize = require('./dbConnection');
const Models = require('./allModels');


const All_Table_Relationship = async () => {
             
    //  Defing Relations between Tables   
    Models.User_Model.hasMany(Models.Work_Model);
    Models.Work_Model.belongsTo(Models.User_Model);

    Models.User_Model.hasMany(Models.Flag_Model);
    Models.Flag_Model.belongsTo(Models.User_Model);

    Models.Cafe_Model.hasMany(Models.Work_Model);
    Models.Work_Model.belongsTo(Models.Cafe_Model);

    Models.Cafe_Model.hasMany(Models.Flag_Model);
    Models.Flag_Model.belongsTo(Models.Cafe_Model);

    Models.Work_Model.hasOne(Models.Flag_Model);
    Models.Flag_Model.belongsTo(Models.Work_Model);

    Models.Cafe_Model.hasMany(Models.User_Import_Model);
    Models.User_Import_Model.belongsTo(Models.Cafe_Model);

    Models.Cafe_Model.hasMany(Models.User_Import_Model);
    Models.User_Import_Model.belongsTo(Models.Cafe_Model);

    
 /******Syncing models with database ******/
 try {

    await sequelize.sync();
    console.log('Set Relation Sync Database') 
    
} catch(err) { console.log(err); }
                               

}//End of method

module.exports = All_Table_Relationship();