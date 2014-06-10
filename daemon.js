var fs = require('fs');
var express = require('express');
var cors = require('cors');
var config = require('./config.json');

var daemon = express();

daemon.use(cors({ origin: true, credentials: true }));

// CORS Pre-Flight https://github.com/troygoode/node-cors#enabling-cors-pre-flight
daemon.options('*', cors());

function getJSON(nick){
  return require(config.profilesDir + '/' + nick + '/index.json');
}

daemon.get('*', function(req, res){
  var nick = req.params[0].replace('/', '').toLowerCase();
  res.format({
    'text/html': function(){
      fs.readFile(config.profilesDir + '/' + nick + '/index.html', function(err, content){
        res.send(200, content.toString());
      });
    },
    // make JSON-LD
    'application/json': function(){
      res.json(getJSON(nick));
    },
    'application/ld+json': function(){
      res.json(getJSON(nick));
    }
  });
});

daemon.listen(config.port, function(){
  console.log('listening on ', config.port);
});
