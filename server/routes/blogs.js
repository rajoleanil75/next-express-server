/*******************************************************************************
 * Copyright (c) 2020.  Anil D. Rajole
 * 
 ******************************************************************************/
var express = require('express');
var router = express.Router();

router.get('/get', function (req, res, next) {
  res.status(200).send('Blog successfully got from server..!!');
});

module.exports = router;
