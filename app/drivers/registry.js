/*
 * Vehicle - Example Driver Registry
 */
module.exports = function (reg,orm,wc) {

  var drivers = {};

  // Custom Drivers
  for (ger in reg) {
    drivers = require('./'+reg[ger]+'')(drivers,orm,wc);
  }

  // Return Drivers
  return drivers;

};