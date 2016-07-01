module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    jade: {
      compile: {
        options: {
          pretty: true,
        },
        files: {
          'public/build/root.html': 'views/root.jade'
        }
      }
    },
    watch: {
      grunt: { files: ['Gruntfile.js'] },
      jade: {
        files: 'public/views/*.jade',
        tasks: ['jade']
      }
  }
  })


  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['jade','watch']);
}
