module.exports = function(grunt) {

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		watch: {
			dummy: {
                files: ["__dummy__/*"],
                tasks: ["build"],
                options: {
                    atBegin: true
                }
            },
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
					{expand: true, cwd: 'app/js/', src: ['*.json'], dest: 'build/release/js/'},
					{expand: true, cwd: 'app/images/', src: ['*.png'], dest: 'build/release/images/'},
					{expand: true, cwd: 'app/data/', src: ['*.xml'], dest: 'build/release/data/'}
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

	grunt.registerTask('default', ['less']);
	grunt.registerTask('build', ['copy', 'less']);
	grunt.registerTask('pack', ['compress']);
	grunt.registerTask('release', ['copy', 'less']);
};