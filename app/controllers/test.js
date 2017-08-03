/*
 * Test Controller - A test example controller
 */
module.exports = {
  test: function(req, res) {
    res.json([{TEST: 'Test'}]);
  }
};