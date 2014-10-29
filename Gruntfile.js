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
      },
      styles: {
        files: ['assets/screen.less'],
        tasks: ['less']
      }
    },
    less: {
      dev: {
        files: {
          "assets/screen.css": "assets/screen.less"
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-develop');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-less');

  grunt.registerTask('default', ['less', 'develop', 'watch']);

};
