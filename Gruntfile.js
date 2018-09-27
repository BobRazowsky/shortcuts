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
					{expand: true, src: ['*.html'], dest: 'cbt_release/'},
					{expand: true, src: ['img/*'], dest: 'cbt_release/'},
					{expand: true, src: ['css/*.css'], dest: 'cbt_release/'}
				]
			}
		},

		less: {
			production: {
				options: {
					path: ['css']
				},
				files: {
					/*'cbt_release/css/popup.css':'less/popup.less',
					'cbt_release/css/donate.css':'less/donate.less',
					'cbt_release/css/options.css':'less/options.less'*/
				}
			}
		},

		uglify: {
			main: {
				files: [{
					expand: true,
					src: 'js/*.js',
					dest: 'cbt_release/'
				},
				{
					expand: true,
					src: 'vendors/*.js',
					dest: 'cbt_release/'
				}]
			}
		},

		compress: {
			main: {
				options: {
					archive: 'oldPackages/<%= pkg.short %><%= pkg.version %>.zip'
				},
				files: [
					{src: ['cbt_release/**'], dest: '/'}
				]
			},
			firefox: {
				options: {
					archive: 'oldPackages/<%= pkg.short %><%= pkg.version %>_firefox.zip'
				},
				files: [{
					src: ['**/*'],
					cwd: 'cbt_release/',
					expand: true
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('browserify');

	grunt.registerTask('default', ['less']);
	grunt.registerTask('build', ['copy','browserify', 'uglify', 'less']);
	grunt.registerTask('pack', ['compress']);
	grunt.registerTask('release', ['copy', 'uglify', 'less', 'compress']);
};