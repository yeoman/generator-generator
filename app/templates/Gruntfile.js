// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>

'use strict';

module.exports = function (grunt) {
  // load all grunt tasks
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // configurable paths
  var yeomanConfig = {
    app: 'app',
    dist: 'dist'
  };

  grunt.initConfig({
    yeoman: yeomanConfig,

    concat: {
      options: {
        banner: '// Copy this to your URL bar:\njavascript:'
      },
      dist: {
        src: '.tmp/bookmarklet.js',
        dest: '<%%= yeoman.dist %>/bookmarklet.js'
      }
    },

    clean: {
      dist: ['<%%= yeoman.dist %>/*', '.tmp/']
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%%= yeoman.app %>/{,*/}*.js'
      ]
    },

    uglify: {
      dist: {
        files: {
          '.tmp/bookmarklet.js': [
            '<%%= yeoman.app %>/{,*/}*.js'
          ]
        }
      }
    },

    watch: {
      dist: {
        files: '<%%= yeoman.app %>/{,*/}*.js',
        tasks: ['uglify', 'concat']
      }
    }
  });

  grunt.registerTask('build', [
    'clean',
    'uglify',
    'concat'
  ]);

  // Create an alias familiar to those using webapp/angular.
  grunt.registerTask('server', [
    'watch'
  ]);

  grunt.registerTask('default', [
    'jshint',
    'build'
  ]);
};
