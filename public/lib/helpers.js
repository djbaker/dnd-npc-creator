let Promise = require('bluebird');
let db = require('./db-config');

module.exports = {
  getClassData: (clas, level) => {
    return new Promise((resolve, reject) => {

    });
  },
  getCurrentNpcs: (mongouri, user) => {
    return new Promise((resolve, reject) => {

    });
  },

  createUser: (username, password) => {
    return new Promise((resolve, reject) => {
      let user = new db.dm({
        username: username,
        password: password
      })
      user.save(function (error, usr) {
        if (error) {
          reject(error);
        } else {
          resolve(usr);
        }
      });
     });
  },

  isUser: (username) => {
    return new Promise((resolve, reject) => {
      db.dm.findOne({username: username}).exec((err, found) => {
        resolve(!!found);
      });
    });
  },

  passAuth: (username, password) => {
    return new Promise((resolve, reject) => {
      db.dm.findOne({username: username, password: password}).exec((err, found) => {
        console.log(err, found, 'results from findOne')
        resolve(!!found);
      });
    });
  }
};