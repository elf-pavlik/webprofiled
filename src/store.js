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
    var filePath;
    if(slug) {
     filePath = this.config.profilesDir + '/' + slug + '/index.json';
    } else {
     filePath = this.config.profilesDir + '/index.json';
    }
    fs.readFile(filePath, function(err, file){
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
