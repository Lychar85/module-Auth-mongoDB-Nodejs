const adminModel = require('../models/admin');
const jwt = require('jsonwebtoken');
//Page de connexion

exports.getAdminPageconnect = async (req, res) => {

    res.json('page connexion !');
    
}

const maxAge = 3 * 24 * 60 * 60 * 1000;


//Vous devez créée une clé secrète dans le fichier env(exp: TOKEN_SECRET=grthc123q469a899z489ert3g131dc1w3fb12h1lo8y6448a6ad1)
const createToken = (id) => {
  return jwt.sign({id}, process.env.TOKEN_SECRET, {
    expiresIn: maxAge
  })
};

module.exports.inscription = async (req, res) => {
  const {email, password} = req.body

  try {
    const user = await adminModel.create({email, password });
    res.status(201).json({ user: user._id});
  }
  catch(err) {
    res.status(200).send({ err })
  }
}

module.exports.connect = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await adminModel.login(email, password);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge});
    res.status(200).json({ user: user._id})
  } catch (err){
    console.log(err);
  }
}

module.exports.deconnect = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.json('deconnecter !');
}