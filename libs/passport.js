const passport = require('koa-passport');
let LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const { logInfo } = require('./winston')(module);

// работа с сессией
passport.serializeUser(function (user, done) {
  logInfo('serializeUser', user.id);
  done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
  const user = await User.findOne({_id: id}).populate('permission');
  logInfo('deserializeUser', user.id);
  done(null, user);
});

// аутентификация
passport.use(new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },

  async function (req, username, password, done) {
    try {
      const user = await User.findOne({username}).populate('permission');
      if (!user || !user.checkPassword(password)) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

module.exports = passport;
