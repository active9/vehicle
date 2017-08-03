var LocalStrategy = require('passport-local');

module.exports = function(passport,user) {
  return new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (!user.verifyPassword(password)) {
          return done(null, false);
        }

        return done(null, user);
      });
    }
  );
};