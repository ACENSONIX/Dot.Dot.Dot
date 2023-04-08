const fs = require("fs");
const models = require("../utils/allModels");




exports.addWork = async (req, res) => {

    const {comapny ,  position , startDate ,endDate ,description ,companyContact , userId  } = req.body;

    try{
        const addWork = await models.Work_Model.create({
            comapny,
            position,
            startDate,
            endDate,
            description,
            companyContact,
            userId
        });

        if(!addWork)
            return res.status(400).json({message: "Work not added"});

        res.status(200).json({message: "Work added successfully", addWork});

    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}

exports.updateWork = async (req, res) => {
    
        const {comapny ,  position , startDate ,endDate ,description ,companyContact , userId  } = req.body;
    
        try{
            const updateWork = await models.Work_Model.update({
                comapny,
                position,
                startDate,
                endDate,
                description,
                companyContact,
                userId
            });
    
            if(!updateWork)
                return res.status(400).json({message: "Work not updated"});
    
            res.status(200).json({message: "Work updated successfully", updateWork});
    
        }
        catch(err){
            console.log(err);
            res.status(500).json({message: "Internal Server Error"});
        }
    }

