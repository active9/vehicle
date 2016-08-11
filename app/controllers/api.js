/*
 * API Controller - An api test example controller that accesses the waterline orm
 * and sends all available orm identities.
 *
 */
module.exports = {
  api: function(req, res) {
    res.json(Object.keys(res.app.models));
  }
};