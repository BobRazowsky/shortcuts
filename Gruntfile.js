module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		/*browserify: {
            main: {
                files: {
                    "app/release/js/<%= pkg.name %>.js": ["app/dev/js/index.js"]
                }
            }
        },*/

		watch: {
			scripts: {
				files: ['app/js/*.js', 'app/js/*.json', 'app/less/*.less', 'app/*.html'],
				tasks: ['build'],
				options: {
					spawn: false
				}
			}
		},

		copy: {
			main: {
				files: [
					{expand: true, cwd: 'app/', src: ['*.html'], dest: 'build/release/'},
					{expand: true, cwd: 'app/js/', src: ['*.js'], dest: 'build/release/js/'},
					{expand: true, cwd: 'app/js/', src: ['*.json'], dest: 'build/release/js/'}
				]
			}
		},

		less: {
			production: {
				options: {
					path: ['css']
				},
				files: {
					'build/release/css/main.css':'app/less/main.less'
				}
			}
		},

		uglify: {
			main: {
				files: [{
					expand: true,
					src: 'js/*.js',
					dest: 'app/release/'
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
	grunt.registerTask('build', ['copy',/*'browserify',*/ 'less']);
	grunt.registerTask('pack', ['compress']);
	grunt.registerTask('release', ['copy',/*'browserify',*/ 'less']);
};