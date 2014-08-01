module.exports = function(grunt){

  grunt.initConfig({
    develop: {
      daemon: {
        file: 'src/daemon.js'
      }
    },
    watch: {
      daemon: {
        files: ['src/daemon.js', 'src/store.js'],
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
