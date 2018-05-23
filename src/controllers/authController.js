const sql = require('mssql');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');

function authController(nav) {
    async function signUpAndLoginUser(req, res) {
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
    }

    function displaySignin(req, res) {
        res.render('signin', {
            nav,
            title: 'Sign In'
        });
    }

    function signinUser() {
        passport.authenticate('local', {
            successRedirect: '/auth/profile',
            failureRedirect: '/'
        });
    }

    function displayUserProfile(req, res) {
        res.json(req.user);
    }

    function middleware(req, res, next) {
        if (req.user) {
            next();
        } else {
            res.redirect('/');
        }
    }

    return {
        signUpAndLoginUser,
        displaySignin,
        signinUser,
        displayUserProfile,
        middleware
    };
}

module.exports = authController;
