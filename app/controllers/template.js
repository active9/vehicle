/*
 * Template Controller - An api template example via weiv
 *
 */
module.exports = {
  template: function(req, res) {
    var template = './views/index.html';
    res.weiv.view(template, res, [{VEHICLE: 'Vehicle'}]);
  }
};