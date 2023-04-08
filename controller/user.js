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
    dob,
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

    if (!user) return res.status(400).json({ message: "User not created" });
    if (req.files.image) {
      const image = req.files.image;
      const imageName = user.id + ".jpg";
      const imagePath = "./public/user/face/" + imageName;
      fs.writeFileSync(imagePath, image.data);
      user.image = `user/face/${imageName}`;
    }

    if (req.files.aadhar) {
      const aadhar = req.files.aadhar;
      const aadharName = user.id + ".jpg";
      const aadharPath = "./public/user/aadhar/" + aadharName;
      fs.writeFileSync(aadharPath, aadhar.data);
      user.aadhar = `user/aadhar/${aadharName}`;
    }
    if (req.files.pan) {
      const pan = req.files.pan;
      const panName = user.id + ".jpg";
      const panPath = "./public/user/pan/" + panName;
      fs.writeFileSync(panPath, pan.data);
      user.pan = `user/pan/${panName}`;
    }

    await user.save();

    res.status(200).json({ message: "User created successfully", user });
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res, next) => {
  const { phone, password } = req.body;

  try {
    const user = await models.User_Model.findOne({
      where: { phone, password },
    });
    if (!user) return res.status(400).json({ message: "User not found" });
    res.status(200).json({ message: "User found", user });
  } catch (error) {
    console.log(error);
  }
};

exports.getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const whereClause = {};
    if (id) whereClause.id = id;

    const user = await models.User_Model.findAll({
      where: whereClause,
      include: {
        model: models.Work_Model,
      },
    });
    if (!user) return res.status(400).json({ message: "User not found" });
    res.status(200).json({ message: "User found", user });
  } catch (error) {
    console.log(error);
  }
};

exports.getEmployedUser = async (req, res, next) => {
  try {
    const user = await models.User_Model.findAll({
      include: {
        model: models.Work_Model,
        where: {
          cafeId: id,
        },
        required: true,
      },
    });
    if (!user) return res.status(400).json({ message: "User not found" });
    res.status(200).json({ message: "User found", user });
  } catch (error) {}
};

exports.flagUser = async (req, res, next) => {
  const { id } = req.params;

  const { type, description, reason , cafeId} = req.body;

  try {
    const user = await models.User_Model.findOne({
      where: {
        id,
      },
      include: {
        model: models.Work_Model,
        where: {
          cafeId: cafeId,
        },
        order: [["createdAt", "DESC"]],
        required: true,
      },
    });
    if (!user) return res.status(400).json({ message: "User not found" });

    const flag = await models.Flag_Model.create({
      type,
      description,
      reason,
      userId: user.id,
    });

    const work = await models.Work_Model.update(
        {
            flagId : flag.id
        },
        {
            where : {
                id : user.works[0].id
            }
        }
    );

    if (!flag) return res.status(400).json({ message: "Flag not created" });

    await user.save();
    res.status(200).json({ message: "User flagged", user });
  } catch (error) {
    console.log(error);
  }
};

exports.viewFlaggedUser = async (req, res, next) => {
 
    try{

        const user = await models.User_Model.findAll({
            include : {
                model : models.Flag_Model,
                required : true
            }
        });

        if(!user) return res.status(400).json({message : "User not found"});

        res.status(200).json({message : "User found", user});


    }
    catch (error) {
        console.log(error);
      }

    
}

exports.searchUserImage = async (req, res, next) => {
    const { id } = req.params;
    try {
        
        // Call ML API here
        // get the user Id from ML API
        let id;
        const user = await models.User_Model.findOne({
            where : {
                id : id
            },
            include : {
                model : models.Work_Model,
                order : [["createdAt", "DESC"]],
                required : true,
                include:[{
                    model : models.Cafe_Model,
                    required : true

                },{
                    model : models.Flag_Model,
                }]
            }
        });

        res.status(200).json({ message: "User found", user });
    } catch (error) {
        console.log(error);
    }
    }


exports.verifyDocuments = async (req, res, next) => {

    const { id } = req.params;
    try {

        const user = await models.User_Model.findOne({
            where : {
                id : id,
                pan : { [Op.ne] : null },
                aadhar : { [Op.ne] : null },
                image : { [Op.ne] : null }
            },
        });

        if(!user) return res.status(400).json({message : "User Documents found"});

        // Call ML API here
        // Get if documents are verified or not
        
        
    } catch (error) {
       console.log(error) 
    }
}