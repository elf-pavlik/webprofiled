module.exports = function(grunt){

  grunt.initConfig({
    develop: {
      daemon: {
        file: 'daemon.js'
      }
    },
    watch: {
      daemon: {
        files: ['daemon.js'],
        tasks: ['develop'],
        options: {
          nospawn: true
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-develop');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['develop', 'watch']);

};
