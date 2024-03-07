const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')
const { hashPass, comparePassword } = require("../helper/bcrypt");
const { userModel1 } = require("../Models/userModel");

//-------Register------------------- 
const registration = async (req, res) => {
  try {
    let { email,password } = req.body

    let user = await userModel1.findOne({ email:email })
    if (user) {
      return res.status(409).send({ success: false, message: " Email is already exists" })}
   let hasspassword = await hashPass(password)
    let newuser = await userModel1.create({...req.body,password: hasspassword})
    res.status(201).send({success: true,message: " registered  is succefully",data: newuser})
  } catch (error) {
    console.log(error.message)
  }
}

//----------Login-------------------
const login = async (req, res) => {
  let { email, password } = req.body
  let user = await userModel1.findOne({ email: email });
  if (!user) {
    return res.status(409).send({ success: false, message: "Email not exit" });
  }
  const matchedPassword = await comparePassword(password, user.password);
  if (!matchedPassword) {
    return res.status(409).send({ success: false, message: "wrong password" });
  }
let token = jwt.sign({user:user},"gourav")
await res.setHeader("token",token)
  res.status(200).send({ success: true, message: "Login Successfully", data: user, token:token })
}

  //----------------forgot password --------------------
  const forgotPassword = async (req,res)=>{
    try{
      const {email} = req.body;
      const user = await userModel1.findOne({email:email});
      if(!user){
        return res.status(404).send({success:false,message:"user is not found"})
  }
  const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'kenyon69@ethereal.email',
        pass: 'rXqRwCu3ee85t8ZQs6'
    }
});
  const mailOptions = {
    from:"admin@gmail.com",
    to: req.body.email,
    subject: "hellow its me",
    text: "abcdefgh",
  };
  transporter.sendMail(mailOptions, async(err)=>{
    if(err){
      res.status(404).send({success:false,message:err.message})
    }
    else{
    res.status(200).send({success:true,message:"Email send"})
  }
})
} catch (error) {
  console.error(error.message);
  res.status(500).send({ success: false, message: "Internal Server Error" });
}
}

//--------------reset password------------------------
const resetPassword = async (req, res) => {

  try{
    let user = await userModel1.findOne({email:req.body.email})
    if(!user){
      return res.status(404).send({success:false,message:"Invalid email"})
    }
    if(req.body.newPassword != req.body.confirmPassword){
      return res.status(404).send({success:false,message:"Password not  matched"})
    }
    let newHashPassword = await hashPass(req.body.newPassword);
    
    let newdataUpdate = new userModel1(user)
     newdataUpdate.password=newHashPassword;
     newdataUpdate.save();
     res.status(201).send({success:true,message:"Reset password succesfully"})
  }
  catch(error){
    res.status(500).send({success:false,message:"server crashed",error:error.message})
  }
}



module.exports = { registration, login, resetPassword, forgotPassword };
 