const express = require('express');
const sql = require('mssql');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');

const authRouter = express.Router();

function router(nav) {
  authRouter.route('/signUp')
    .post(async (req, res) => {
      const {username, password} = req.body;
      try {
        const request = new sql.Request();
        const recordset = await request
        .input('username', sql.VarChar(250), username)
        .input('password', sql.VarChar(250), password)
        .query('insert into users (username, password) values (@username, @password)');
        debug(recordset);
        req.login(req.body, () => {
          res.redirect('/auth/profile');
        });
      } catch (error) {
        debug(error);
      }
    });

    authRouter.route('/signin')
    .get((req, res) => {
      res.render('signin', {
        nav,
        title: 'Sign In'
      });
    })
    .post(passport.authenticate('local', {
      successRedirect: '/auth/profile',
      failureRedirect: '/'
    }));

  authRouter.route('/profile')
    .all((req, res, next) => {
      if (req.user) {
        next();
      } else {
        res.redirect('/');
      }
    })
    .get((req, res) => {
      res.json(req.user);
    });
  return authRouter;
}

module.exports = router;
