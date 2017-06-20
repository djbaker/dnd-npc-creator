let Promise = require('bluebird');
let db = require('./db-config');
let http = require('http')


module.exports = {
  getClassData: (clas, level) => {
    return new Promise((resolve, reject) => {
      http.get({
        hostname: 'http://www.dnd5eapi.co',
        port: 80,
        path: `/api/classes/${clas}levels`
      }, (response) => {
        // console.log(response);
      });
    });
  },
  getCurrentNpcs: (user) => {
    return new Promise((resolve, reject) => {
      db.npc.find({username: user})
      .then((data) => {
        resolve(data);
      })
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

  createNPC: (results, usr) => {
    return new Promise((resolve, reject) => {
      let npc = new db.npc({
        name: results.name,
        class: results.class,
        race: results.race,
        level: results.level,
        hp: results.hp,
        description: results.description,
        skills: results.skills,
        username: usr
      })
      npc.save(function (err, npc) {
        if (err) {
          reject(err);
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
        // console.log(err, found, 'results from findOne')
        resolve(!!found);
      });
    });
  }
};
