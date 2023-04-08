const fs = require("fs");
const models = require("../utils/allModels");


exports.signup = async (req, res, next) => {
    
    const { name,email,owner, password, location, phone, address, zip, gstNo  } = req.body;

    try{

        const cafe = await models.Cafe.create({
        name,
        email,
        owner,
        password,
        location,
        phone,
        address,
        zip,
        gstNo,
        });

        if(!cafe)
            return res.status(400).json({message: "Cafe not created"});
        if(req.files.pan){
            const pan= req.files.pan;
            const panName= cafe.id + '.jpg';
            const panPath= './public/cafe/pan/' + panName;
            fs.writeFileSync(panPath, pan.data);
            cafe.pan= `cafe/pan/${panName}`;
        }

        await cafe.save();

        res.status(200).json({message: "Cafe created successfully", cafe});

    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}


exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try{
        const cafe = await models.Cafe.findOne({where: {email, password}});
        if(!cafe)
            return res.status(400).json({message: "Invalid Email or Password"});
        
        res.status(200).json({message: "Login Successful", cafe});
    }
    catch(err){
        console.log(err);
        res.status(500).json({message: "Internal Server Error"});
    }
}


