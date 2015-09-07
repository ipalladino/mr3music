module.exports = function(grunt) {

  //var project = grunt.option('project');

  grunt.loadNpmTasks('grunt-react');


  grunt.initConfig({
    express: {
      all: {
        options: {
          port: 9000,
          hostname: "0.0.0.0",
          bases: ['./'],
          livereload: true,
          project : "./",
          //server : "server.js"
        }
      }
    },
    // grunt-open will open your browser at the project's URL
    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= express.all.options.port%>'
      }
    },
    watch: {
      styles: {
        files: [
          "source/less/**/*.less",
          "source/js/**/*.js",
          '!**/react/**',
          '!**/data/**'
        ], // which files to watch
        tasks: ['less','copy'],
        options: {
          livereload : true
        }
      },
      react : {
        files : [
          "source/js/**/*.jsx",
          '!**/data/**'
        ],
        tasks: ['react','express'],
        options : {
            livereload: true
        }
      }
    },
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "source/css/main.css": [
            "source/less/**/*.less"
          ]
        }
      },
    },
    clean: {
      dist : ["dist/*"]
      //dist : ["dist/*","!<%= express.all.options.project %>/dist/*.xml","!<%= express.all.options.project %>/dist/*.txt"]
    },
    copy: {
      main: {
        files : [
          {
            expand: true,
            cwd: 'source/images',
            src: ['**'],
            dest: 'dist/images'
          },
          {
            expand: true,
            cwd: 'source/js',
            src: ['**/*', '!**/react/**'],
            dest: 'dist/js'
          },
          {
            expand: true,
            cwd: 'source/css',
            src: ['**'],
            dest: 'dist/css'
          },
          {
            expand: true,
            cwd: 'source/vendor',
            src: ['**'],
            dest: 'dist/vendor'
          },
          {
            expand: true,
            cwd: 'source/fonts',
            src: ['**'],
            dest: 'dist/fonts'
          },
          {
            expand: true,
            cwd: 'source/data',
            src: ['**'],
            dest: 'dist/data'
          }
        ]
      },
    },//end of copy task
    react: {
      dynamic_mappings: {
        files: [
          {
            expand:     true,
            cwd:        'source/js/react',
            src:        ['**/*.jsx'],
            dest:       'dist/js/react',
            ext:        '.js'
          }
        ]
      }
    },
    concat: {
      options: {
        separator: grunt.util.linefeed + ';' + grunt.util.linefeed,
		stripBanners: true
      },
      dist: {
        src: ["dist/js/vendor/**/*.js", "dist/js/*.js", "dist/js/react/*.js"],
        dest: "dist/js/build.js",
      },
    },
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-express');


  grunt.registerTask('publish', ['less','react', 'copy']);
  //grunt.registerTask('publish', ['less','clean','copy','react', 'concat']);
  grunt.registerTask('default', ['less', 'watch']);
  grunt.registerTask('develop', [
    'less',
    'express',
    'open',
    'watch'
  ]);
};
