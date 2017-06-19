let express = require('express');
let port = process.env.port || 8080;
let bodyParser = require('body-parser');


let app = express();


// app.set('views', __dirname + '/public');
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/public/login.html');
});

app.post('/login', function (req, res, next) {
  console.log(req.body)
  console.log('attempting to login');
  res.sendFile(__dirname + '/public/index.html'); 
});

app.post('/createlogin', function (req, res, next) {
  console.log('attempting to create login');
  res.sendFile(__dirname + '/public/index.html');
});



app.listen(port, function() {
  console.log(`DND server is listening on ${port}`);
});