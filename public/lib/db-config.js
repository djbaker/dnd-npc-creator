let mongoose = require('mongoose');
let mongouri = process.env.mongouri || 'mongodb://127.0.0.1/dnd';


mongoose.connect(mongouri)

mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + mongouri);
}); 

mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
});


let dmSchema = new mongoose.Schema({
  username: {type: String, index: {unique: true}},
  password: String,
});

let Dm = mongoose.model('Dm', dmSchema);


module.exports.db = mongoose;
module.exports.dm = Dm;