// constante--------------------------------------------
const
  express = require('express'),
  mongoose = require('mongoose'),
  app = express();

  //public
  const path = require('path'),
  methodOverride = require('method-override'),
  fileupload = require('express-fileupload');
//-----

// METHODE OVERRIDE--------------------------------------------
app.use(methodOverride('_method'))
//-----

// Static folder--------------------------------------------
app.use(express.static(path.join(__dirname, 'public')));


//connexion BDD----------------------
require('dotenv').config()

// Middleware - BodyParser
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))

mongoose.connect('>URL Mongo<', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
});

//-----

// EJS-----------------------------------------------------
app.set('view engine', 'ejs');
//----

app.use(fileupload())

// Middleware - BodyParser--------------------------------------------
app.use(express.json())
app.use(express.urlencoded({
  extended: false
}))

//-----

// Middleware--------------------------------------------------------



// Routes------------------------------------------------------------
const home = require('./routes/home'),
    auth = require('./routes/auth');

app.use('/', home);

app.use('/auth',auth)


app.get('*', function (req, res) {
  res.send('page introuvable');
});



// Listen--------------------------------------------
const port = 2500
app.listen(port, () => {
  console.log(`connect to port: ${port}`);
});
//-----