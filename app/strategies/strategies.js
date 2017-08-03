var LocalStrategy = require('passport-local');

module.exports = function (app,rc,express,weiv,orm,drivers,passport,__basedir) {
  var users = require('./users.js')(passport,drivers.user);
  passport.use(users);
  app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    }
  );
};