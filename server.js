let express = require('express');
let port = process.env.PORT || 8080;
let bodyParser = require('body-parser');
let app = express();
let db = require('./public/lib/db-config');
let helpers = require('./public/lib/helpers')
let session = require('express-session');

//middleware
app.use(session({
  secret: 'what what',
  resave: false,
  saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: false }));


//route get requests
app.get('/', (req,res) => {
  // console.log(req.session)
  if (!req.session.user) {
    res.sendFile(__dirname + '/public/login.html');
  } else {
    res.sendFile(__dirname + '/public/index.html');    
  }
});

app.get('/signout', (req,res) => {
  res.sendFile(__dirname + 'public/login.html');
});

app.get('/lib/app.js', (req,res) => {
  res.sendFile(__dirname + '/public/lib/app.js');
});

app.get('/style.css', (req,res) => {
  res.sendFile(__dirname + '/public/style.css');
});

app.get('/npcs', (req, res) => {
  helpers.getCurrentNpcs(req.session.user)
  .then((data) => {
    res.send(data);
  });
});

app.get('/Almendra-regular.otf', (req, res) => {
  res.sendFile(__dirname + '/public/Almendra-Regular.otf');
});

app.get('/back.jpg', (req, res) => {
  res.sendFile(__dirname + '/public/back.jpg');
});
//route post requests
app.post('/login', (req,res) => {
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

app.post('/createlogin', (req,res) => {
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

app.post('/signout', (req,res) => {
  console.log('logging out', req.session);
  req.session.destroy(() => {
    res.redirect('/')
  })
});

app.post('/addclass', (req, res) => {
  let results = req.body;
  results.skills = JSON.parse(req.body.skills);
  helpers.createNPC(results, req.session.user)
  .then((data) => {
    res.redirect('/');
  });
});

app.post('/deletechar', (req, res) => {
  let id = JSON.parse(req.body.id)['_id'];
  helpers.deleteNpc(id)
  .then((data) => {
    res.redirect('/')
  })
})



//start listening
app.listen(port, () => {
  console.log(`DND server is listening on ${port}`);
});
