/*
 * Hello World Controller - A test hello world controller with post
 *
 */
module.exports = {
  myaction: function(req, res) {
		res.send("Hello World From hello world controller");
  },
  myotheraction: function(req, res) {
    console.log(req.body);
    console.log(req.files);
		res.send("This is a post action on hello world controller");
  }
};