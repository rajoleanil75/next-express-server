/*******************************************************************************
 * MIT License
 * 
 * Copyright (c) 2020 Anil D Rajole
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE. 
 ******************************************************************************/
const express = require('express');
const next = require('next')
const cacheableResponse = require('cacheable-response')
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

var blogs = require('./server/routes/blogs');
var public = require('./server/routes/public');

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

const ssrCache = cacheableResponse({
  ttl: 1000 * 60 * 60, // 1hour
  get: async ({ req, res }) => {
    const data = await nextApp.renderToHTML(req, res, req.path, {
      ...req.query,
      ...req.params,
    })
    if (res.statusCode === 404) {
      res.end(data)
      return
    }
    return { data }
  },
  send: ({ data, res }) => res.send(data),
})

nextApp.prepare().then(() => {

  const app = express();

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

  app.get('/', (req, res) => ssrCache({ req, res }))

  // put router calling
  app.use('/blogs', blogs);
  app.use('/public', public);


  app.get('*', (req,res) => {
    return handle(req,res) // for all the react pages
  })

  // catch 404 and forward to error handler
  app.use(function (req, res, next) {
    next(createError(404));
  });

  // error handler
  app.use(function (err, req, res, next) {
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