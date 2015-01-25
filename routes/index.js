var express = require('express');
var router = express.Router();
var cores = require('os').cpus().length;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
    title: 'N-Queens Test',
    n: 16,
    cores: cores
  });
});

module.exports = router;
