const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const pako = require("pako");
let id;

exports.searchFace = async (img) => {
  return new Promise((resolve, reject) => {
    let data = new FormData();
    // data.append('name', 'Nihal');
    data.append("image", fs.createReadStream(`./public/user/search/${img}`));

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:3000/verify",
      headers: {
        Cookie:
          "connect.sid=s%3AmUo_wrn5FMYvbl4cm-QXM6StKVd1FLs_.%2F2wZdTVmrFCjoxFmSPaNNxG39EI2TbZoK5AzKLUfg2E",
        ...data.getHeaders(),
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        if (response.data.msg) {
          console.log("User not found");
          return resolve(null);

        }
        id = response.data.response;
        // console.log(id)
        id = id.substring(49);
        id = id.slice(0, -4);
        // console.log(id);
        resolve(id);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

exports.verifyaadhar = async (aadhar, face) => {
  // let data = new FormData();
  // data.append('name', 'Nihal');

  // data.append('aadhar', fs.createReadStream(`./public/user/aadhar/${aadhar}`));
  // data.append('pan', fs.createReadStream(`./public/user/face/${face}`));
  return new Promise((resolve, reject) => {
    var options = {
      method: "POST",
      hostname: ["127", "0", "0", "1"],
      port: "3000",
      path: ["face"],
      headers: {
        "content-type":
          "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
        "cache-control": "no-cache",
        "Postman-Token": "c65819a2-2a66-4dfe-9b84-126076c564a9",
      },
      data: {
        image1: fs.createReadStream(`./public/user/aadhar/${aadhar}`),
        image: fs.createReadStream(`./public/user/face/${face}`),
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

exports.verifyaadhar = async (pan, face) => {
  // let data = new FormData();
  // data.append('name', 'Nihal');

  // data.append('aadhar', fs.createReadStream(`./public/user/aadhar/${aadhar}`));
  // data.append('pan', fs.createReadStream(`./public/user/face/${face}`));

  return new Promise((resolve, reject) => {
    var options = {
      method: "POST",
      hostname: ["127", "0", "0", "1"],
      port: "3000",
      path: ["face"],
      headers: {
        "content-type":
          "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
        "cache-control": "no-cache",
        "Postman-Token": "c65819a2-2a66-4dfe-9b84-126076c564a9",
      },
      data: {
        image1: fs.createReadStream(`./public/user/aadhar/${pan}`),
        image: fs.createReadStream(`./public/user/face/${face}`),
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        resolve(response.data);
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      });
  });
};

exports.verifyaadharchecksum = async () => {
  try {
    // convert data into BigInt
    // let dataBigInt = BigInt(data);

    // convert bigint into byte array
    var bytes = [];
    for (var i = 0; i < data.length; i += 2) {
      var byte = parseInt(data.substring(i, i + 2), 16);
      if (byte > 127) {
        byte = -(~byte & 0xff) - 1;
      }
      bytes.push(byte);
    }
    console.log(bytes);

    // decompress the byte array
    let decompressed = pako.inflate(bytes);
    console.log(decompressed);
  } catch (error) {
    console.log(error);
  }
};
