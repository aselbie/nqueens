var express = require('express');
var app = express();

app.get('/', function(req, res){

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
    res.send('It took ' + (Date.now() - start) + 'ms to find ' + s + ' solutions for ' + n + ' queens');
    return s
  }

  q(12);
  
});

app.listen(3000);