const passport = require('passport');
const {Strategy} = require('passport-local');
const sql = require('mssql');
const debug = require('debug')('app:local.strategy');

module.exports = function localStrategy() {
    passport.use(new Strategy({
            usernameField: 'username',
            passwordField: 'password'
        }, async (username, password, done) => {
            try {
                const request = new sql.Request();
                const {recordset} = await request
                .input('username', sql.VarChar(250), username)
                .query('select * from users where username = @username');
                if (recordset[0].password === password) {
                    done(null, recordset[0]);
                } else {
                    done(null, false);
                }
            } catch (error) {
                debug(error);
            }
        }));
};
