const express = require('express');

const bookRouter = express.Router();

function router(nav) {
    const books = [{
            title: 'War and Peace',
            genre: 'Historical Fiction',
            author: 'Lev Nikolayevich Tolstoy',
            read: false
        },
        {
            title: 'Les Miserables',
            genre: 'Historical Fiction',
            author: 'Victor Hugo',
            read: false
        },
        {
            title: 'The Time Machine',
            genre: 'Science Fiction',
            author: 'H. G. Wells',
            read: false
        }
    ];

    bookRouter.route('/')
        .get((req, res) => {
            res.render('bookListView', {
                nav,
                title: 'ELibrary',
                books // shorthand if variable has the same name as property
            });
        });

    bookRouter.route('/:id')
        .get((req, res) => {
            const {
                id
            } = req.params;
            res.render('bookView', {
                nav,
                title: 'ELibrary',
                book: books[id]
            });
        });
    return bookRouter;
}

module.exports = router;
