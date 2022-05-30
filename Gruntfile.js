module.exports = function (grunt) {
  require('dotenv').config()
  const open = require('open')
  const port = process.env.PORT || 8080
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    cssmin: {
      dist: {
        options: {
          sourceMap: true,
          level: {
            1: {
              specialComments: 0, //remove comment
            },
          },
        },
        files: {
          'public/build/vendor.css': ['./assets/css/bootstrap.min.css'],
        },
      },
    },
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2,
          sourceMap: true,
          sourceMapBasepath: '/', // Sets sourcemap base path, defaults to current working directory.
          sourceMapRootpath: '/',
          sourceMapFilename: 'public/build/bundle.css.map',
          sourceMapURL: 'bundle.css.map', // the complete url and filename put in the compiled css file
        },
        files: {
          'public/build/bundle.css': ['assets/less/custom.less'],
        },
      },
    },
    concat: {
      dist: {
        options: {
          sourceMap: false,
          stripBanners: { block: true },
        },
        files: {
          'public/build/vendor.js': [
            './assets/js/vue.global.prod.js',
            './assets/js/vue3-sfc-loader.js',
            './assets/js/vue-router.global.prod.js',
            './assets/js/vuex.global.prod.js',
            './assets/js/jquery-3.5.1.slim.min.js',
            './assets/js/popper.min.js',
            './assets/js/bootstrap.min.js',
          ],
        },
      },
    },
    copy: {
      main: {
        files: [
          // includes files within path
          { expand: true, cwd: './assets/js/', src: ['bootstrap.min.js.map'], dest: 'public/build/', filter: 'isFile' },
        ],
      },
    },
    babel_multi_files: {
      files_object_format: {
        options: {
          sourceMaps: true,
          comments: false, //false = remove comment
          presets: [
            [
              '@babel/preset-env',
              {
                targets: 'ie 11, > 5%',
              },
            ],
            [
              'minify',
              {
                builtIns: false,
                evaluate: false,
                mangle: true, //true = rename param
              },
            ],
          ],
        },
        files: {
          'public/build/bundle.js': [
            // 'app/Views/vue/helper.js',
            'app/Views/vue/App.js',
            // 'assets/js/function_map.js',
            // 'assets/js/function_map_info.js',
          ],
        },
      },
    },
    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true,
          minifyCSS: true,
          minifyJS: true,
          minifyURLs: true,
        },
        files: [
          {
            expand: true, // Enable dynamic expansion.
            cwd: 'app/Views/', // Src matches are relative to this path.
            src: ['**/*.vue'], // Actual pattern(s) to match.
            dest: 'public/build/', // Destination path prefix.
          },
        ],
      },
    },

    //---------------------------------------------------
    php: {
      server: {
        options: {
          hostname: '0.0.0.0',
          port: port,
          base: './public',
          keepalive: true,
          open: false,
        },
      },
    },
    shell: {
      clear: {
        command: 'rm -rf public/build',
      },
      php_spark_serve: {
        command: 'php spark serve',
      },
    },

    //---
    watch: {
      styles: {
        files: ['assets/less/*.less', 'assets/css/*.css'],
        tasks: ['less'],
        options: {
          livereload: true,
        },
      },
      scripts: {
        // files: ['app/Views/vue/*.js'],
        files: ['app/**/*.js'],
        tasks: ['babel_multi_files'],
        options: {
          livereload: true,
        },
      },
      another: {
        // files: ['app/**/*.vue'],
        files: ['app/**/*.vue'],
        tasks: ['htmlmin:dist'],
        options: {
          livereload: true,
        },
      },
      livereload: {
        files: ['app/**/*.php', 'app/**/*.json', 'app/**/*.vue'],
        options: {
          livereload: true,
        },
      },
    },
  })

  grunt.registerTask('open', async function () {
    if (process.env.LIVE_BROWSER) {
      await open('http://localhost:' + port, {
        app: { name: process.env.LIVE_BROWSER },
      })
    }
  })

  grunt.loadNpmTasks('grunt-contrib-concat')
  grunt.loadNpmTasks('grunt-contrib-cssmin')
  grunt.loadNpmTasks('grunt-contrib-less')
  grunt.loadNpmTasks('grunt-babel-multi-files')
  grunt.loadNpmTasks('grunt-php')
  grunt.loadNpmTasks('grunt-contrib-watch')
  grunt.loadNpmTasks('grunt-shell')
  grunt.loadNpmTasks('grunt-contrib-copy')
  grunt.loadNpmTasks('grunt-contrib-htmlmin')
  grunt.registerTask('default', ['cssmin', 'less', 'concat', 'babel_multi_files'])
  grunt.registerTask('watchs', [
    'shell:clear',
    'cssmin',
    'less',
    'concat',
    'copy:main',
    'babel_multi_files',
    'htmlmin:dist',
    'php',
    'open',
    // 'shell:php_spark_serve',
    'watch',
  ])
}
