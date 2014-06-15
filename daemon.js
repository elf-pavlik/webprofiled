var fs = require('fs');
var express = require('express');
var cors = require('cors');
var config = require('./config.json');

var daemon = express();

daemon.use(cors({ origin: true, credentials: true }));

// CORS Pre-Flight https://github.com/troygoode/node-cors#enabling-cors-pre-flight
daemon.options('*', cors());

daemon.set('view engine', 'hbs');

function getJSON(nick){
  //#FIXME make async!
  return JSON.parse(fs.readFileSync(config.profilesDir + '/' + nick + '/index.json').toString());
}

daemon.get('/favicon.ico', function(req, res){
  res.send(404);
});

daemon.get('*', function(req, res){
  var nick = req.params[0].replace('/', '').toLowerCase();
  var profile = getJSON(nick);
  res.format({
    'text/html': function(){
      console.log(profile);
      res.render('profile', profile);
    },
    // make JSON-LD
    'application/json': function(){
      res.json(profile);
    },
    'application/ld+json': function(){
      res.json(profile);
    }
  });
});

daemon.listen(config.port, function(){
  console.log('listening on ', config.port);
});
