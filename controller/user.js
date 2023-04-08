const fs = require("fs");
const models = require("../utils/allModels");


exports.signup = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    location,
    phone,
    address,
    zip,
    dob
  } = req.body;
  console.log("yes");
  try {

    const user = await models.User_Model.create({
        firstName,
        lastName,
        email,
        password,
        location,
        phone,
        address,
        zip,
        dob,
    });

    if(!user)
        return res.status(400).json({message: "User not created"});
    if(req.files.image){
        const image= req.files.image;
        const imageName= user.id + '.jpg';
        const imagePath= './public/user/face/' + imageName;
        fs.writeFileSync(imagePath, image.data);
        user.image= `user/face/${imageName}`;
    }

    if(req.files.aadhar){
        const aadhar= req.files.aadhar;
        const aadharName= user.id + '.jpg';
        const aadharPath= './public/user/aadhar/' + aadharName;
        fs.writeFileSync(aadharPath, aadhar.data);
        user.aadhar= `user/aadhar/${aadharName}`;
    }
    if(req.files.pan){
        const pan= req.files.pan;
        const panName= user.id + '.jpg';
        const panPath= './public/user/pan/' + panName;
        fs.writeFileSync(panPath, pan.data);
        user.pan= `user/pan/${panName}`;
    }

    await user.save();

    res.status(200).json({message: "User created successfully", user});

  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req , res ,next) =>{

    const {phone, password} = req.body;

    try {
        const user = await models.User_Model.findOne({where: {phone, password}});
        if(!user)
            return res.status(400).json({message: "User not found"});
        res.status(200).json({message: "User found", user});
    } catch (error) {
        console.log(error);
    }
}

exports.getUser = async (req, res, next) => {
    const { id } = req.params;
    try {
        const whereClause = {};
        if(id)
            whereClause.id = id;

        const user = await models.User_Model.findAll({
             where: whereClause ,
             include:{
                model:models.Work_Model,
             }
            });
        if (!user) return res.status(400).json({ message: "User not found" });
        res.status(200).json({ message: "User found", user });
    } catch (error) {
        console.log(error);
    }
    }



