const { createCipheriv, createDecipheriv } = require("crypto");
const algorithm = "aes-256-cbc";


exports.handler = async (event, context, callback) => {
  

  var cipher = await createCipheriv(algorithm,process.env.SECRET_KEY,process.env.IV);
  var encrypted = await cipher.update(process.env.ACCESS_TOKEN, "utf8", "base64"); // 'binary' 'base64' 'hex'
  encrypted += cipher.final("base64");


  console.log(encrypted);

var decipher = await createDecipheriv(algorithm,process.env.SECRET_KEY,process.env.IV);
  var decrpyted =await decipher.update(encrypted, "base64", "utf8");
  // console.log(decrpyted);


 var   response={
    success: "true",
    accessToken: encrypted
  }

return response;

};
