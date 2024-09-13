// define how user doc should look
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator'); 

const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})

// static signup method: model_name.static.隨便取個名字:signup
userSchema.statics.signup = async function(email, password) {
  // validation
  // if we don't have a value either of email password, we get an error.
  if(!email || !password){
    throw Error('email或密碼請勿空白')
}
  // if the email is a valid email, use validator package, validator.isEmail() function return True or False
  // True: it is a valid email, False: it's not valid email.
  if(!validator.isEmail(email)){
    // if (!False)
    throw Error('這個email不是有效信箱')
  }
  if(!validator.isStrongPassword(password)){
    throw Error("這個密碼強度不夠")
  }
  // async handle singup logic
  // check email already exists in the DB
  const exists = await this.findOne({ email });// 原為User 但User 是 output 的model 沒辦法直接用User 故用'this' refers to the model
  // exists is a value(代表這個email已經註冊) or null(null表示不存在exist)
  
  if (exists) {
    throw Error('Email already in use')
  }
  // hashing password by bcrypt package
    // 避免有兩個以上的user都使用相同的密碼(都會存在DB內)防止造成查找錯誤: +salt 加鹽
    // mypassfisdjfd  mypassvncklxnvi 'fisdjfd' 'vncklxnvi'就是 salt
  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  //take password store in DB
  const user = await this.create({ email, password: hash }) // this refer the model: User; hash的password賦予到password

  return user
}

module.exports = mongoose.model('User', userSchema)