var fs = require('fs');
var Promise = require('es6-promise').Promise;
var express = require('express');
var cors = require('cors');
var config = require('./config.json');

var daemon = express();

/*
 * CORS
 *
 * accepts cookies from foreign origin
 * Pre-Flight https://github.com/troygoode/node-cors#enabling-cors-pre-flight
 */
daemon.use(cors({ origin: true, credentials: true }));
daemon.options('*', cors());


// set view engine to handlebars
daemon.set('view engine', 'hbs');

/*
 * returns JSON representation of a profile document stored in config.profilesDir
 * parameters
 *   nick - path partial to profile data
 *
 */
function getProfile(nick){
  return new Promise(function(resolve, reject){
    fs.readFile(config.profilesDir + '/' + nick + '/index.json', function(err, file){
      if(err){
        reject(err);
      } else {
        resolve(JSON.parse(file.toString()));
      }
    });
  });
}

/*
 * no favicon for now!
 */
daemon.get('/favicon.ico', function(req, res){
  res.send(404);
});

/*
 * sends profile document
 * supports content negotiation: RDFa and JSON-LD
 */
daemon.get('*', function(req, res){
  var nick = req.params[0].replace('/', '').toLowerCase();
  getProfile(nick).then(function(data){
    res.format({
      'text/html': function(){
        res.render('profile', data);
      },
      'application/json': function(){
        res.json(data);
      },
      'application/ld+json': function(){
        res.json(data);
      }
    });
  });
});

daemon.listen(config.port, function(){
  console.log('listening on ', config.port);
});
