var fs = require('fs');
var Promise = require('es6-promise').Promise;

/**
 * Provides data form various sources
 * @param {Object} config configuration for store
 */
function Store(config){
  this.config = config;
  this.getProfile = getProfile;
}

/**
 * Provides object with profile data
 * @param  {String} slug path partial to profile data
 * @return {Object} JSON representation of a profile document stored in config.profilesDir
 *
 */
function getProfile(slug){
  return new Promise(function(resolve, reject){
    fs.readFile(this.config.profilesDir + '/' + slug + '/index.json', function(err, file){
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
  }.bind(this));
}

/**
 * exports
 * @ignore
 */
module.exports = Store;
