let express = require('express');
let port = process.env.PORT || 8080;
let bodyParser = require('body-parser');
let app = express();
let db = require('./public/lib/db-config');
let helpers = require('./public/lib/helpers')
let session = require('express-session');

//middleware
app.use(session({
  secret: 'shhh, it\'s a secret',
  resave: false,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: false }));


//route get requests
app.get('/', function (req, res) {
  // console.log(req.session)
  if (!req.session.user) {
    res.sendFile(__dirname + '/public/login.html');
  } else {
    res.sendFile(__dirname + '/public/index.html');    
  }
});

app.get('/signout', function (req, res) {
  res.sendFile(__dirname + 'public/login.html');
});

app.get('/lib/app.js', function (req, res) {
  res.sendFile(__dirname + '/public/lib/app.js');
});

app.get('/style.css', function (req, res) {
  res.sendFile(__dirname + '/public/style.css');
})


//route post requests
app.post('/login', function (req, res) {
  console.log(req.body)
  let username = req.body['DM name'];  
  helpers.passAuth(username, req.body.Password)
  .then((pass) => {
    // console.log(pass, username, req.body.Password)
    if (!pass) {
      res.sendFile(__dirname + '/public/login.html');
    } else {
      req.session.regenerate(() => {
        req.session.user = username;
        // console.log(req.session);
        res.redirect('/');
      });
    }
  });
});

app.post('/createlogin', function (req, res) {
  let username = req.body['DM name']; 
  helpers.isUser(username)
  .then((found) => {
    if (!found) {
      helpers.createUser(username, req.body.Password)
      .then(() => {
        req.session.regenerate(() => {
          req.session.user = username;
          res.redirect('/');
        });
      });
    } else {
      res.write('user exists');
      res.end();
    }
  });
});

app.post('/signout', function (req, res) {
  console.log('logging out', req.session);
  req.session.destroy(() => {
    res.redirect('/')
  })
});



//start listening
app.listen(port, function() {
  console.log(`DND server is listening on ${port}`);
});
