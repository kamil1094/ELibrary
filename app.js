const express = require('express');
const chalk = require('chalk');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const sql = require('mssql');

const app = express();
const port = process.env.PORT || 3000;

const config = {
  user: 'elibrary',
  password: 'Zxcvbnm123',
  server: 'elibrarydbserver.database.windows.net',
  database: 'ElibraryDB',
  options: {
    encrypt: true
  }
};

sql.connect(config).catch(err => debug(err));

app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, '/public/')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.set('views', './src/views');
app.set('view engine', 'ejs');

const nav = [
  {link: '/books', title: 'Book'},
  {link: '/authors', title: 'Author'}
];

const bookRouter = require('./src/routes/bookRoutes.js')(nav);

app.use('/books', bookRouter);
app.get('/', (req, res) => {
  res.render('index', {
    nav,
    title: 'ELibrary'
  });
});

app.listen(port, () => {
  debug(`listening on port ${chalk.green(port)}`);
});

