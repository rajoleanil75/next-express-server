const express = require('express');
const next = require('next')
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const logger = require('morgan');
var createError = require('http-errors');
var cookieParser = require('cookie-parser');
const { NODE_ENV, PORT } = require('./config');

const dev = NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

// Import Router
var blogs = require('./server/routes/blogs');

// Validate and Normalize port
function normalizePort(val) {
	const port = parseInt(val, 10);
	if (Number.isNaN(port)) {
		return val;
	}
	if (port >= 0) {
		return port;
	}
	return false;
}
nextApp.prepare().then(() => {

  const app = express();
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
  
  app.use(
    cors({
      credentials: true
    })
  );

  app.use(
    bodyParser.urlencoded({
      extended: false
    })
  );
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(express.json());
  app.use(helmet());
  app.use(logger('dev'));

  // put router calling
  app.use('/blogs', blogs);

  app.get('*', (req,res) => {
    return handle(req,res) // for all the react pages
  })

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
  });

  const port = normalizePort(process.env.PORT || PORT);
  app.listen(port, () => {
    console.log(`Server started at port: ${port}`);
  });
})