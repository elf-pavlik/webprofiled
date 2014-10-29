var fs = require('fs');
var Promise = require('es6-promise').Promise;
var express = require('express');
var cors = require('cors');
var serveStatic = require('serve-static');
var hbs = require('hbs');
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


/*
 * Save static content
 */
daemon.use(serveStatic('.'));

// set view engine to handlebars
daemon.set('view engine', 'hbs');

hbs.registerHelper('j', function(val){
  if(val && val.join){
    return val.join(" ");
  } else {
    return val;
  }
});

/*
 * returns JSON representation of a profile document stored in config.profilesDir
 * parameters
 *   slug - path partial to profile data
 *
 */
function getProfile(slug){
  return new Promise(function(resolve, reject){
    fs.readFile(config.profilesDir + '/' + slug + '/index.json', function(err, file){
      if(err){
        reject(err);
      } else {
        try {
          resolve(JSON.parse(file.toString()));
        }
        catch (e) {
          reject(e);
        }
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
daemon.get('/:slug/', function(req, res){
  getProfile(req.params.slug).then(function(data){
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
  }).catch(function(err){
    console.log(err);
    res.send(500);
  });
});

/*
 * 303 redirect for URLs not ending with /
 * experimental trick for HTTPRange-14
 * http://en.wikipedia.org/wiki/HTTPRange-14#Use_of_HTTP_Status_Code_303_See_Other
 */

daemon.get('/:slug', function(req, res){
  res.redirect(303, req.protocol + '://' + req.get('Host') + req.path + '/');
});


daemon.listen(config.port, function(){
  console.log('listening on ', config.port);
});
