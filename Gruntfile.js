module.exports = function (grunt) {
  grunt.initConfig({
    uglify: {
      gifmebro: {
        files: {
          'dist/gifmebro.min.js': [
            'vendor/gif.js/gif.js',
            'src/gifmebro.js'
          ]
        }
      }
    },
    copy: {
      template: {
        expand: true,
        cwd: 'src/',
        src: 'index.html',
        dest: 'dist/'
      },
      gifworker: {
        expand: true,
        cwd: 'vendor/gif.js/',
        src: 'gif.worker.js',
        dest: 'dist/'
      }
    },
    watch: {
      scripts: {
        files: ['src/gifmebro.js'],
        tasks: ['uglify'],
      },
      html: {
        files: ['src/index.html'],
        tasks: ['copy']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['uglify', 'copy']);
};
