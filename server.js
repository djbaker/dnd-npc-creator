let express = require('express');
let port = process.env.port || 8080;
let bodyParser = require('body-parser');


let app = express();


// app.set('views', __dirname + '/public');
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});




app.listen(port, function() {
  console.log(`DND server is listening on ${port}`);
});