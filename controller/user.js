const fs = require("fs");
const models = require("../utils/allModels");
const ML = require("../utils/ML");
const message = require("../utils/message");
const XLSX = require("xlsx");

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

    return res.status(200).json({ message: "User created successfully", user });
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
        include: [{
          model: models.Cafe_Model,

      },{
        model : models.Flag_Model
        
      }],
    }
    });
    if (!user) return res.status(400).json({ message: "User not found" });
    res.status(200).json({ message: "User found", user });
  } catch (error) {
    console.log(error);
  }
};

exports.getEmployedUser = async (req, res, next) => {
  try {
    const {id} = req.params;
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
    console.log(user);
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
        include : {
            model : models.Cafe_Model
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
      workId : user.works[0].id,
      cafeId : user.works[0].cafe.id
    });

    if(flag.type == 1)
    {
    console.log(`${user.firstName} ${user.lastName} has been flagged for ${reason} by ${user.works[0].cafe.name}`);

    const messageBody = `${user.firstName} ${user.lastName} has been flagged for ${reason} by ${user.works[0].cafe.name}`;
    
    // const messageResponse = await message.sendSMS(messageBody, "+919137503223");

    }
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

    return res.status(200).json({ message: "User flagged", user });
  } catch (error) {
    console.log(error);
  }
};

exports.viewFlaggedUser = async (req, res, next) => {
 
    try{

        const user = await models.User_Model.findAll({
            include : {
                model : models.Flag_Model,
                where:{
                    type : 1
                },
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
    
    try {
        
        // Call ML API here
        // get the user Id from ML API

        let randomNum = Math.floor(Math.random() * 900) + 100;
        console.log(req.files)
        let imageName;
        if (req.files.image) {
          const image = req.files.image;
          imageName = randomNum.toString() + ".jpg";
          const imagePath = "./public/user/search/" + imageName;
          fs.writeFileSync(imagePath, image.data);
        }



        let response = await ML.searchFace(imageName);
        
        console.log(response);
        
        if(!response){
          console.log("User not found");
          return res.json({message : "User not found" , user:null});
        }

        response = parseInt(response);
       
        const user = await models.User_Model.findOne({
            where : {
                id : response
            },
            include : {
                model : models.Work_Model,
                order : [["createdAt", "DESC"]],
                // required : true,
                include:[{
                    model : models.Cafe_Model,
                    // required : true

                },{
                    model : models.Flag_Model,
                }]
            }
        });

        return res.status(200).json({ message: "User found", user });
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

        if(!user) return res.status(400).json({message : "User Documents not found"});

        // Call ML API here
        // Get if documents are verified or not

        const aadharVerify = await ML.verifyaadhar(user.aadhar.substring(8), user.image.substring(9));

        const panVerify = await ML.verifypan(user.pan.substring(8), user.image.substring(9));

        
        if(aadharVerify)
        {
          aadharVerify = 1;
        }
        else{
          aadharVerify = 0;
        }
        if(panVerify)
        {
          panVerify = 1;
        }
        else{
          panVerify = 0;
        }
        user.docVerified =  `${aadharVerify}${panVerify}`;

        await user.save();

        res.status(200).json({message : "User Documents verified", user});

        
    } catch (error) {
       console.log(error) 
    }
}

exports.work = async (req, res, next) => {
  const { id } = req.params;
  // console.log(req);

  const { cafeId, role , description , companyContact } = req.body;

  try {
    const user = await models.User_Model.findOne({
      where: {
        id,
      },
    });
    if (!user) return res.status(400).json({ message: "User not found" });

    const work = await models.Work_Model.create({
      cafeId,
      userId: user.id,
      role,
      startDate: new Date(),
      description ,
      companyContact
    });

    if (!work) return res.status(400).json({ message: "Work not created" });

    await user.save();
    res.status(200).json({ message: "User worked", work });
  } catch (error) {
    console.log(error);
  }
}

exports.importUser = async (req, res, next) => {
  // Import user from excel sheet
  try {
    const {cafeId} = req.body;
if(req.files)
{;
  console.log(req.files.xl);
  let response = req.files.xl;
  const workbook = XLSX.read(response.data, { type: 'buffer' });
  const sheet = workbook.Sheets['Sheet1'];
  const rows = XLSX.utils.sheet_to_json(sheet);
  rows.forEach(async (row) => {
    console.log(row);
    const user = await models.User_Import_Model.create({
      firstName : row.firstName,
      lastName : row.lastName,
      address : row.address,
      zip : row.zip,
      dob : row.dob,
      name: row.name,
      email: row.email,
      phone: row.phone,
      startDate : row.startDate,
      endDate : row.endDate,
      position : row.position,
      // password: row.password,
      // pan: row.pan,
      // aadhar: row.aadhar,
      // image: row.image,
      // docVerified: row.docVerified,
      // cafeId: cafeId,
  });
  });

}

const user = await models.User_Import_Model.findAll({
  where : {
    cafeId : cafeId
  }
});

    res.status(200).json({ message: "User imported" });
  } catch (error) {
    console.log(error);
  }
};


exports.addUserFromImport = async (req, res, next) => {
  // Import user from excel sheet
  try {
    const {cafeId,id} = req.body;
    const user = await models.User_Import_Model.findAll({
      where : {
        id,
      }
    });

    const cafe = await models.Cafe_Model.findOne({
      where : {
        id : cafeId
      }
    });

    user.forEach(async (row) => {
      console.log(row);
      const user = await models.User_Model.create({
        firstName : row.firstName,
        lastName : row.lastName,
        address : row.address,
        zip : row.zip,
        dob : row.dob,
        name: row.name,
        email: row.email,
        phone: row.phone,
        // password: row.password,
        // pan: row.pan,
        // aadhar: row.aadhar,
        // image: row.image,
        // docVerified: row.docVerified,
        // cafeId: cafeId,
    });

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

    console.log(row.position,cafe.name)
    const work = await models.Work_Model.create({
      company : cafe.name,
      position : row.position,
      startDate: row.startDate,
      endDate : row.endDate,
      description : row.description,
      companyContact : cafe.email,
      cafeId,
      userId: user.id,
    });

    });

    res.status(200).json({ message: "User imported" });
  } catch (error) {
    console.log(error);
  }
}

