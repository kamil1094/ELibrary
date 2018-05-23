const passport = require('passport');
const express = require('express');
const authController = require('../controllers/authController');

const authRouter = express.Router();

function router(nav) {
  const {
    signUpAndLoginUser, displaySignin, displayUserProfile, middleware
  } = authController(nav);
  authRouter.route('/signUp')
    .post(signUpAndLoginUser);

  authRouter.route('/signin')
    .get(displaySignin)
    .post(passport.authenticate('local', {
        successRedirect: '/auth/profile',
        failureRedirect: '/'
      }));

  authRouter.route('/profile')
    .all(middleware)
    .get(displayUserProfile);
  return authRouter;
}

module.exports = router;
