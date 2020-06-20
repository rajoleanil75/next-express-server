'use strict';

require('dotenv').config({ path: __dirname + '/.env' });

module.exports = {
	NODE_ENV: process.env.NODE_ENV,
	PORT: process.env.PORT,
};
