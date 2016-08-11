module.exports = function (orm,wc) {

  // User Model
  orm.loadCollection(wc.extend(require('../models/User.js')));

  return {
    model: 'user',
    crud: 'users',
    controller: 'users'
  } // Driver Mode
}