const debug = require('debug')('app:bookController');
const sql = require('mssql');

function bookController(bookService, nav) {
    async function getIndex(req, res) {
            try {
                const request = new sql.Request();
                const {recordset} = await request.query('select * from books');
                res.render('bookListView', {
                    nav,
                    title: 'ELibrary',
                    books: recordset
                });
            } catch (error) {
                debug(error);
            }
    }

    async function getById(req, res) {
            try {
                const {id} = req.params;
                const request = new sql.Request();
                const {recordset} = await request.input('id', sql.Int, id)
                    .query('select * from books where id = @id');
                const [book] = recordset;
                book.details = await bookService.getBookById(book.id);
                debug(book.details);
                res.render('bookView', {
                    nav,
                    title: 'ELibrary',
                    book
                });
            } catch (error) {
                debug(error);
            }
    }

    async function middleware(req, res, next) {
        if (req.user) {
            next();
        } else {
           res.redirect('/');
        }
    }

    return {
        getById,
        getIndex,
        middleware
    };
}

module.exports = bookController;
