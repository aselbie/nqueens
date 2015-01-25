var express = require('express');
var Parallel = require('paralleljs');
var cores = require('os').cpus().length;
var app = express();
var router = express.Router();

module.exports = router;

router.get('/:n', function(req, res){
  var start = Date.now();

  var n = req.params.n;
  var magicScreen = (1 << n) - 1;

  var columns = 0;
  var leftDiagonals = 0;
  var rightDiagonals = 0;
  var starts = [];
  var solutions = 0;
  var threatened = columns | leftDiagonals | rightDiagonals;
  var open = ~(threatened) & magicScreen;

  while(open > 0) {
    var theOne = -open & open;
    open = open ^ theOne;
    var openColumns = columns | theOne;
    var openLeftDiagonals = (leftDiagonals | theOne) << 1;
    var openRightDiagonals = (rightDiagonals | theOne) >> 1;
    starts.push([openColumns, openLeftDiagonals, openRightDiagonals, n]);
  }

  new Parallel(starts).map(function(s){
    var n = s[3];
    var magicScreen = (1 << n) - 1;

    var recurQueens = function(columns, leftDiagonals, rightDiagonals) {
      if(columns === magicScreen) {
        return 1;
      }
      var solutions = 0;
      var threatened = columns | leftDiagonals | rightDiagonals;
      var open = ~(threatened) & magicScreen;
      while(open > 0) {
        var theOne = -open & open;
        open = open ^ theOne;
        var openColumns = columns | theOne;
        var openLeftDiagonals = (leftDiagonals | theOne) << 1;
        var openRightDiagonals = (rightDiagonals | theOne) >> 1;
        solutions += recurQueens(openColumns, openLeftDiagonals, openRightDiagonals);
      }
      return solutions;
    }

    return recurQueens(s[0], s[1], s[2]);
  }).reduce(function(d){
    return d[0] + d[1];
  }).then(function(solutions){
    var time = ((Date.now() - start) / 1000).toFixed(2);
    res.json({
      time: time,
      solutions: solutions,
      n: n,
      cores: cores
    });
  });

});