const express = require('express');
const sql = require('mssql');
const debug = require('debug')('app:bookRoutes');

const bookRouter = express.Router();

/* instead of writing down all logic righ here I should move functions logic
to separate file called bookController, userController or something like that */

function router(nav) {
    bookRouter.route('/')
        .get(async (req, res) => {
            try {
                const request = new sql.Request();
                const {recordset} = await request.query('select * from books');
                res.render('bookListView', {
                    nav,
                    title: 'ELibrary',
                    books: recordset // you can use shorthand if var has the same name as property
                });
            } catch (error) {
                debug(error);
            }
        });

    bookRouter.route('/:id')
        .all(async (req, res, next) => {
            try {
                const {id} = req.params;
                const request = new sql.Request();
                const {recordset} = await request.input('id', sql.Int, id)
                    .query('select * from books where id = @id');
                [req.book] = recordset;
                next();
            } catch (error) {
                debug(error);
            }
        })
        .get(async (req, res) => {
            res.render('bookView', {
                nav,
                title: 'ELibrary',
                book: req.book
            });
        });
    return bookRouter;
}

module.exports = router;
