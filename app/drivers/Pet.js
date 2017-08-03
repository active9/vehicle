module.exports = function (orm,wc) {

  // Pet Model
  orm.loadCollection(wc.extend(require('../models/Pet.js')));

  return ; // Passenger Mode
};