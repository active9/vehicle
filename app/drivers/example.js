/*
 * Vehicle - Example Driver
 */
module.exports = function (drivers,orm,wc) {

  // User Model (Exposed Driver Mode)
  var User = require('./User.js')(orm,wc);
  var user = {
    model: User.model,
    crud: User.crud,
    controller: User.controller
  };
  drivers.user = user;

  // Pet Model (Unexposed Passenger Mode)
  var Pet = require('./Pet.js')(orm,wc);

  return drivers;
};