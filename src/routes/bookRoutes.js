const express = require('express');
const bookController = require('../controllers/bookController');
const bookService = require('../services/goodreadsService');

const bookRouter = express.Router();

/* instead of writing down all the logic righ here I should move functions logic
to separate file called bookController, userController or something like that */

function router(nav) {
    const {getIndex, getById, middleware} = bookController(bookService, nav);
    bookRouter.use(middleware);
    bookRouter.route('/')
        .get(getIndex);

    bookRouter.route('/:id')
        .get(getById);
    return bookRouter;
}

module.exports = router;
