var express = require('express');
var cors = require('cors');
var hbs = require('hbs');
var Store = require('./store');
var config = require('../config.json');

var daemon = express();

/**
 * ## CORS
 */

/**
 * accepts cookies from foreign origin
 */
daemon.use(cors({ origin: true, credentials: true }));

/**
 * handle [Pre-Flight](https://github.com/troygoode/node-cors#enabling-cors-pre-flight)
 */
daemon.options('*', cors());


/**
 * ## Views
 */

/**
 * set view engine to handlebars
 */
daemon.set('view engine', 'hbs');

/**
 * handlebars helper to join arrays into space separated strings
 * used for example when resource has multiple classes in `typeof`
 */
hbs.registerHelper('j', function(val){
  if(val.join){
    return val.join(" ");
  } else {
    return val;
  }
});

/*
 * data provider
 */
var store = new Store(config);

/*
 * no favicon for now!
 */
daemon.get('/favicon.ico', function(req, res){
  res.send(404);
});

/*
 * ## GET /:slug/
 *
 * sends profile document
 * supports content negotiation: RDFa and JSON-LD
 * currently simply sends HTTP 500 whenever error happens
 */
daemon.get('/:slug/', function(req, res){
  store.getProfile(req.params.slug).then(function(data){
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
    // FIXME: add support for error reporting service
    console.log(err);
    res.send(500);
  });
});

/*
 * ### 303 redirect for URLs not ending with /
 * experimental trick for [httpRange-14](http://www.w3.org/2001/tag/issues.html#httpRange-14)
 * http://en.wikipedia.org/wiki/HTTPRange-14#Use_of_HTTP_Status_Code_303_See_Other
 */

daemon.get('/:slug', function(req, res){
  res.redirect(303, req.protocol + '://' + req.get('Host') + req.path + '/');
});


/*
 * ## web server
 * we bind web server to the port specified in config file
 */

daemon.listen(config.port, function(){
  console.log('listening on ', config.port);
});
