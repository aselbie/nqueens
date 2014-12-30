var express = require('express');
var app = express();

app.get('/', function(req, res){

  var n = 12;
  var time1 = 0;
  var time2 = 0;

  result1 = 0;
  result2 = 0;

  var q = function(n){
    var start = Date.now();
    s=0;
    function f(l,o,r,c,t,v){
      v=~(l|o|r)&c;
      while(v>0){
        v^=t=-v&v;
        f((l|t)<<1, o|t, (r|t)>>1, c)
      }
      o==c&&s++
    }
    f(0,0,0,(1<<n)-1);
    time1 = Date.now() - start;
    result1 = s;
  }

  var nQueens = function(n) {
    var start = Date.now();
    var solutions = 0;
    var magicScreen = (1 << n) - 1;
    var recurQueens = function(columns, leftDiagonals, rightDiagonals) {
      var threatened = columns | leftDiagonals | rightDiagonals;
      var open = ~(threatened) & magicScreen;
      while(open > 0) {
        var theOne = -open & open;
        open = open ^ theOne;
        var openColumns = columns | theOne;
        var openLeftDiagonals = (leftDiagonals | theOne) << 1;
        var openRightDiagonals = (rightDiagonals | theOne) >> 1;
        recurQueens(openColumns, openLeftDiagonals, openRightDiagonals);
      }
      if(columns === magicScreen) {
        solutions++;
      }
    }
    recurQueens(0,0,0);
    time2 = Date.now() - start;
    result2 = s;
  }
  

  q(n);
  nQueens(n);

  res.send('It took the first method ' + time1 + 'ms to find ' + result1 + ' solutions for ' + n + ' queens.<br>It took the second method ' + time2 + 'ms to find ' + result2 + ' solutions for ' + n + ' queens');

});

app.listen(process.env.PORT || 3000);