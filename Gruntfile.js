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
    doxx: {
      all: {
        src: 'src',
        target: 'docs',
        options: {
          // Task-specific options go here.
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-develop');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-doxx');

  grunt.registerTask('default', ['develop', 'watch']);

};
