module.exports = function(grunt) {

  grunt.initConfig({
    // import json metadata from package.json file
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      files: ['<%= jshint.files %>', '<%= postcss.dist.files[0].src %>'],
      tasks: ['jshint', 'postcss']
    },

    postcss: {
     options: {
       processors: [
         require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes  
         require('cssnano') // minify  
       ]
     },
     dist: {
       files: [{
         expand: true,
         cwd: 'src/css/',
         src: ['**/*.css', '!*.min.css'],
         dest: 'dist/css/'
       }]
     }
    },
 
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
      // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    }
});

//LOAD PLUGINS
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-postcss');

// Default task(s)
  grunt.registerTask('default', ['jshint', 'postcss', 'watch']);
}; 
