let express = require('express');
let port = process.env.port || 8080;
let bodyParser = require('body-parser')


let app = express();

app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', function (req, res) {
  res.write('hello');
  res.end()
});




app.listen(port, function() {
  console.log(`DND server is listening on ${port}`);
});