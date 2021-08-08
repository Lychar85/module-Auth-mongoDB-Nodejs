const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const adminModel = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "L'email est obligatoire"],
        unique: true
    },

    password:{
        type: String,
        required: [true, 'Le mot de passe est obligatoire']
    },
    

})

adminModel.pre("save", async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });

  adminModel.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email')
  };

module.exports = mongoose.model('user', adminModel)