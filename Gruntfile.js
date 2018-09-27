module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		browserify: {
            main: {
                files: {
                    "./release/js/<%= pkg.name %>.js": ["./js/index.js"]
                }
            }
        },

		watch: {
			scripts: {
				files: ['js/*.js', 'less/*.less', '*.html'],
				tasks: ['build'],
				options: {
					spawn: false
				}
			}
		},

		copy: {
			main: {
				files: [
					{expand: true, src: ['*.html'], dest: 'release/'},
					{expand: true, src: ['*.plist'], dest: 'release/'},
					{expand: true, src: ['img/*'], dest: 'release/'},
					{expand: true, src: ['css/*.css'], dest: 'release/'}
				]
			}
		},

		less: {
			production: {
				options: {
					path: ['css']
				},
				files: {
					'release/css/main.css':'less/main.less'
				}
			}
		},

		uglify: {
			main: {
				files: [{
					expand: true,
					src: 'js/*.js',
					dest: 'release/'
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-browserify');

	grunt.registerTask('default', ['less']);
	grunt.registerTask('build', ['copy','browserify', 'less']);
	grunt.registerTask('pack', ['compress']);
	grunt.registerTask('release', ['copy','browserify', 'less']);
};