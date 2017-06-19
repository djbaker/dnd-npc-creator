let express = require('express');
let port = process.env.PORT || 8080;
let bodyParser = require('body-parser');
let app = express();
let db = require('./lib/db-config')

//middleware
app.use(bodyParser.urlencoded({ extended: false }));


//route get requests
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/login.html');
});


//route post requests
app.post('/login', function (req, res) {
  console.log(req.body);
  res.sendFile(__dirname + '/public/index.html'); 
});

app.post('/createlogin', function (req, res) {
  console.log('attempting to create login');
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/signout', function (req, res) {
  console.log('attempting to signout');
  res.sendFile(__dirname + '/public/login.html');
});



//start listening
app.listen(port, function() {
  console.log(`DND server is listening on ${port}`);
});
