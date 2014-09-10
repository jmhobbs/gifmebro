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
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');

  grunt.registerTask('default', ['uglify', 'copy']);
};
